import { describe, expect, it } from "vitest";

import { baseContract, runLifecycle } from "./contract";
import { DEMAND_SHAPE, simulateEnergy } from "./energy";
import { baseGovernance, governanceScenarios, simulateGovernance } from "./governance";

describe("governance model", () => {
  it("is deterministic", () => {
    expect(simulateGovernance(baseGovernance)).toEqual(simulateGovernance(baseGovernance));
  });

  it("fails quorum when turnout is below the quorum", () => {
    const r = simulateGovernance({ ...baseGovernance, turnout: 0.2, quorum: 0.3 });
    expect(r.outcome).toBe("no-quorum");
  });

  it("conserves weight: cast weight equals active humans when there are no sybils or caps", () => {
    const r = simulateGovernance(baseGovernance);
    expect(r.castWeight).toBe(r.activeHumans);
    expect(r.activeHumans).toBe(120); // 200 participants x 60% turnout
  });

  it("sybil scenario: fake identities flip a rejected proposal to passed", () => {
    const r = simulateGovernance(governanceScenarios.sybil);
    expect(r.outcomeWithoutSybils).toBe("rejected");
    expect(r.outcome).toBe("passed");
    expect(r.acceptedSybils).toBe(108); // 120 x (1 - 0.1)
  });

  it("verification at 100% removes all sybils", () => {
    const r = simulateGovernance({ ...governanceScenarios.sybil, verification: 1 });
    expect(r.acceptedSybils).toBe(0);
  });

  it("concentration scenario: one delegate outweighs the majority", () => {
    const r = simulateGovernance(governanceScenarios.concentration);
    expect(r.largestShare).toBeGreaterThan(0.5);
    expect(r.nakamoto).toBe(1);
    expect(r.outcome).toBe("passed");
  });

  it("delegate cap limits the largest share", () => {
    const uncapped = simulateGovernance(governanceScenarios.concentration);
    const r = simulateGovernance({ ...governanceScenarios.concentration, delegateCap: 0.2 });
    expect(r.largestShare).toBeLessThan(uncapped.largestShare);
    expect(r.largestShare).toBeLessThan(0.5);
  });

  it("double majority blocks a proposal the minority rejects", () => {
    const open = simulateGovernance(governanceScenarios.minority);
    expect(open.outcome).toBe("passed");
    const guarded = simulateGovernance({ ...governanceScenarios.minority, doubleMajority: true });
    expect(guarded.outcome).toBe("blocked");
  });
});

describe("energy model", () => {
  it("demand shape sums to 1 and totals match daily demand", () => {
    expect(DEMAND_SHAPE.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 9);
    expect(simulateEnergy({ solarKw: 0, windKw: 0, demandKwh: 240, batteryKwh: 0, initialSoc: 0 }).totalDemand).toBeCloseTo(240, 1);
  });

  it("with no generation and no storage everything is deficit", () => {
    const r = simulateEnergy({ solarKw: 0, windKw: 0, demandKwh: 240, batteryKwh: 0, initialSoc: 0 });
    expect(r.totalDeficit).toBeCloseTo(240, 1);
    expect(r.selfSufficiency).toBeCloseTo(0, 5);
  });

  it("battery state of charge never exceeds capacity or goes negative", () => {
    const r = simulateEnergy({ solarKw: 300, windKw: 50, demandKwh: 300, batteryKwh: 100, initialSoc: 0.9 });
    for (const h of r.hours) {
      expect(h.soc).toBeLessThanOrEqual(100 + 1e-6);
      expect(h.soc).toBeGreaterThanOrEqual(-1e-6);
    }
  });

  it("energy balance holds every hour", () => {
    const r = simulateEnergy({ solarKw: 80, windKw: 20, demandKwh: 400, batteryKwh: 150, initialSoc: 0.3 });
    for (const h of r.hours) {
      expect(h.generation + h.discharge + h.deficit).toBeCloseTo(h.demand + h.charge + h.surplus, 2);
    }
  });

  it("adding a battery reduces deficit", () => {
    const without = simulateEnergy({ solarKw: 80, windKw: 10, demandKwh: 400, batteryKwh: 0, initialSoc: 0 });
    const withBattery = simulateEnergy({ solarKw: 80, windKw: 10, demandKwh: 400, batteryKwh: 200, initialSoc: 0 });
    expect(withBattery.totalDeficit).toBeLessThan(without.totalDeficit);
  });
});

describe("smart contract lifecycle", () => {
  it("passes all six stages with valid inputs", () => {
    expect(runLifecycle(baseContract).every((s) => s.status === "pass")).toBe(true);
  });

  it("halts at validation when the treasury is too small", () => {
    const r = runLifecycle({ ...baseContract, amount: 60000 });
    expect(r[1]).toMatchObject({ id: "validation", status: "fail", reason: "insufficient-funds" });
    expect(r.slice(2).every((s) => s.status === "skipped")).toBe(true);
  });

  it("requires k-of-n signatures (3 of 5)", () => {
    expect(runLifecycle({ ...baseContract, signatures: 2 })[2]).toMatchObject({ status: "fail", reason: "missing-signatures" });
  });

  it("verification fails without oracle confirmation, after execution already happened", () => {
    const r = runLifecycle({ ...baseContract, oracleConfirmed: false });
    expect(r[3]?.status).toBe("pass");
    expect(r[4]).toMatchObject({ status: "fail", reason: "unconfirmed" });
  });
});
