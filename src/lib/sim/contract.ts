/**
 * Educational smart-contract lifecycle for a community fund disbursement.
 * A deterministic state machine: each stage passes or fails based on explicit inputs.
 */
export type StageId = "proposal" | "validation" | "authorization" | "execution" | "verification" | "audit";

export const STAGES: StageId[] = ["proposal", "validation", "authorization", "execution", "verification", "audit"];

export type ContractInput = {
  amount: number; // requested amount
  treasury: number; // available balance
  recipientValid: boolean; // recipient address/identity is well-formed and registered
  signatures: number; // approvals collected
  required: number; // approvals required (k of n)
  signers: number; // n
  timelockElapsed: boolean; // mandatory waiting period has passed
  oracleConfirmed: boolean; // independent confirmation that the work/delivery happened
  logPublished: boolean; // event log published for public audit
};

export type StageResult = { id: StageId; status: "pass" | "fail" | "skipped"; reason: string };

export function runLifecycle(input: ContractInput): StageResult[] {
  const checks: Record<StageId, () => string | null> = {
    proposal: () => (input.amount > 0 && input.recipientValid ? null : input.amount <= 0 ? "invalid-amount" : "invalid-recipient"),
    validation: () => (input.amount <= input.treasury ? null : "insufficient-funds"),
    authorization: () => {
      if (input.required > input.signers) return "impossible-quorum";
      if (input.signatures < input.required) return "missing-signatures";
      return input.timelockElapsed ? null : "timelock";
    },
    execution: () => null,
    verification: () => (input.oracleConfirmed ? null : "unconfirmed"),
    audit: () => (input.logPublished ? null : "no-log"),
  };

  const results: StageResult[] = [];
  let halted = false;
  for (const id of STAGES) {
    if (halted) {
      results.push({ id, status: "skipped", reason: "halted" });
      continue;
    }
    const failure = checks[id]();
    if (failure) {
      results.push({ id, status: "fail", reason: failure });
      halted = true;
    } else {
      results.push({ id, status: "pass", reason: "ok" });
    }
  }
  return results;
}

export const baseContract: ContractInput = {
  amount: 12000,
  treasury: 50000,
  recipientValid: true,
  signatures: 3,
  required: 3,
  signers: 5,
  timelockElapsed: true,
  oracleConfirmed: true,
  logPublished: true,
};
