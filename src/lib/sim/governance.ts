/**
 * Deterministic, educational voting model. Not a real voting system.
 * Same inputs always produce the same outputs; every assumption is listed in the UI.
 */
export type GovernanceInput = {
  participants: number; // registered, eligible humans
  turnout: number; // 0..1 share of eligible humans who take part
  delegation: number; // 0..1 share of participants who delegate instead of voting directly
  concentration: number; // 0..1 share of all delegated weight held by the largest delegate
  largestDelegateSupports: boolean;
  support: number; // 0..1 support among majority-group direct voters
  minorityShare: number; // 0..1 share of the population in a defined minority group
  minoritySupport: number; // 0..1 support among minority-group direct voters
  sybils: number; // fake identities created by an attacker, all voting YES
  verification: number; // 0..1 share of fake identities detected and removed
  quorum: number; // 0..1 required participating weight / eligible weight
  threshold: number; // 0..1 required YES share of cast weight
  doubleMajority: boolean; // minority safeguard
  delegateCap: number; // 0..1 max share of cast weight a single voter may hold (1 = no cap)
};

export type Outcome = "passed" | "rejected" | "no-quorum" | "blocked";

export type GovernanceResult = {
  eligible: number;
  activeHumans: number;
  directVoters: number;
  delegators: number;
  acceptedSybils: number;
  castWeight: number;
  yes: number;
  no: number;
  yesShare: number;
  participationRate: number;
  quorumMet: boolean;
  thresholdMet: boolean;
  minorityApproval: number | null;
  outcome: Outcome;
  largestShare: number;
  nakamoto: number; // fewest voters whose combined weight exceeds 50%
  sybilShare: number;
  outcomeWithoutSybils: Outcome;
  weights: { weight: number; yes: boolean; kind: "delegate" | "direct" | "sybil" }[];
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function decide(
  castWeight: number,
  eligible: number,
  yes: number,
  input: GovernanceInput,
  minorityApproval: number | null,
): { outcome: Outcome; quorumMet: boolean; thresholdMet: boolean } {
  const quorumMet = eligible > 0 && castWeight / eligible >= input.quorum - 1e-9;
  const thresholdMet = castWeight > 0 && yes / castWeight >= input.threshold - 1e-9;
  if (!quorumMet) return { outcome: "no-quorum", quorumMet, thresholdMet };
  if (!thresholdMet) return { outcome: "rejected", quorumMet, thresholdMet };
  if (input.doubleMajority && minorityApproval !== null && minorityApproval < 0.5) {
    return { outcome: "blocked", quorumMet, thresholdMet };
  }
  return { outcome: "passed", quorumMet, thresholdMet };
}

function tally(input: GovernanceInput, includeSybils: boolean) {
  const participants = Math.max(0, Math.round(input.participants));
  const minorityCount = Math.round(participants * clamp01(input.minorityShare));
  const majorityCount = participants - minorityCount;

  const group = (count: number, support: number) => {
    const active = Math.round(count * clamp01(input.turnout));
    const delegators = Math.round(active * clamp01(input.delegation));
    const direct = active - delegators;
    const yes = Math.round(direct * clamp01(support));
    return { count, active, delegators, direct, yes };
  };
  const maj = group(majorityCount, input.support);
  const min = group(minorityCount, input.minoritySupport);
  const directVoters = maj.direct + min.direct;
  const delegators = maj.delegators + min.delegators;
  const activeHumans = maj.active + min.active;

  // Direct voters, each with base weight 1, in a fixed order: majority YES, majority NO, minority YES, minority NO.
  const voters: { weight: number; yes: boolean; kind: "delegate" | "direct" | "sybil" }[] = [];
  const push = (n: number, yes: boolean) => {
    for (let i = 0; i < n; i++) voters.push({ weight: 1, yes, kind: "direct" });
  };
  push(maj.yes, true);
  push(maj.direct - maj.yes, false);
  push(min.yes, true);
  push(min.direct - min.yes, false);

  // Delegated weight flows to delegates chosen among direct voters.
  if (delegators > 0 && voters.length > 0) {
    const largestWeight = Math.round(delegators * clamp01(input.concentration));
    const rest = delegators - largestWeight;

    // Largest delegate: first direct voter whose stance matches the configured stance, else the first voter.
    const largestIdx = Math.max(0, voters.findIndex((v) => v.yes === input.largestDelegateSupports));
    const largest = voters[largestIdx]!;
    largest.weight += largestWeight;
    largest.kind = "delegate";

    // Remaining delegated weight is spread evenly over up to 20 other delegates, mirroring overall direct support.
    const others = voters.map((_, i) => i).filter((i) => i !== largestIdx);
    const k = Math.min(20, others.length);
    if (k > 0 && rest > 0) {
      const directSupport = directVoters > 0 ? (maj.yes + min.yes) / directVoters : 0.5;
      const yesPool = others.filter((i) => voters[i]!.yes);
      const noPool = others.filter((i) => !voters[i]!.yes);
      const kYes = Math.min(yesPool.length, Math.round(k * directSupport));
      const kNo = Math.min(noPool.length, k - kYes);
      const chosen = [...yesPool.slice(0, kYes), ...noPool.slice(0, kNo)];
      chosen.forEach((idx, j) => {
        const share = Math.floor(rest / chosen.length) + (j < rest % chosen.length ? 1 : 0);
        voters[idx]!.weight += share;
        voters[idx]!.kind = "delegate";
      });
      if (chosen.length === 0) largest.weight += rest;
    } else if (rest > 0) {
      largest.weight += rest;
    }
  }

  const acceptedSybils = includeSybils ? Math.round(Math.max(0, input.sybils) * (1 - clamp01(input.verification))) : 0;
  for (let i = 0; i < acceptedSybils; i++) voters.push({ weight: 1, yes: true, kind: "sybil" });

  // Optional cap on any single voter's share of cast weight; weight above the cap is returned to its delegators, who are treated as abstaining.
  const rawCast = voters.reduce((s, v) => s + v.weight, 0);
  if (input.delegateCap < 1 && rawCast > 0) {
    const cap = Math.max(1, Math.floor(rawCast * clamp01(input.delegateCap)));
    for (const v of voters) if (v.weight > cap) v.weight = cap;
  }

  const castWeight = voters.reduce((s, v) => s + v.weight, 0);
  const yes = voters.filter((v) => v.yes).reduce((s, v) => s + v.weight, 0);
  const eligible = participants + acceptedSybils;
  const minorityApproval = min.direct > 0 ? min.yes / min.direct : null;

  return { participants, eligible, activeHumans, directVoters, delegators, acceptedSybils, castWeight, yes, voters, minorityApproval };
}

export function simulateGovernance(input: GovernanceInput): GovernanceResult {
  const t = tally(input, true);
  const d = decide(t.castWeight, t.eligible, t.yes, input, t.minorityApproval);
  const clean = tally(input, false);
  const dClean = decide(clean.castWeight, clean.eligible, clean.yes, input, clean.minorityApproval);

  const sorted = [...t.voters].sort((a, b) => b.weight - a.weight);
  let acc = 0;
  let nakamoto = 0;
  for (const v of sorted) {
    acc += v.weight;
    nakamoto++;
    if (acc > t.castWeight / 2) break;
  }

  return {
    eligible: t.eligible,
    activeHumans: t.activeHumans,
    directVoters: t.directVoters,
    delegators: t.delegators,
    acceptedSybils: t.acceptedSybils,
    castWeight: t.castWeight,
    yes: t.yes,
    no: t.castWeight - t.yes,
    yesShare: t.castWeight > 0 ? t.yes / t.castWeight : 0,
    participationRate: t.eligible > 0 ? t.castWeight / t.eligible : 0,
    quorumMet: d.quorumMet,
    thresholdMet: d.thresholdMet,
    minorityApproval: t.minorityApproval,
    outcome: d.outcome,
    largestShare: t.castWeight > 0 ? (sorted[0]?.weight ?? 0) / t.castWeight : 0,
    nakamoto: t.castWeight > 0 ? nakamoto : 0,
    sybilShare: t.castWeight > 0 ? t.acceptedSybils / t.castWeight : 0,
    outcomeWithoutSybils: dClean.outcome,
    weights: sorted,
  };
}

export const baseGovernance: GovernanceInput = {
  participants: 200,
  turnout: 0.6,
  delegation: 0.3,
  concentration: 0.3,
  largestDelegateSupports: true,
  support: 0.55,
  minorityShare: 0.2,
  minoritySupport: 0.52,
  sybils: 0,
  verification: 0.9,
  quorum: 0.3,
  threshold: 0.5,
  doubleMajority: false,
  delegateCap: 1,
};

export type ScenarioId = "baseline" | "low-participation" | "concentration" | "sybil" | "minority";

export const governanceScenarios: Record<ScenarioId, GovernanceInput> = {
  baseline: baseGovernance,
  "low-participation": { ...baseGovernance, turnout: 0.18, support: 0.45, minoritySupport: 0.4 },
  concentration: { ...baseGovernance, delegation: 0.7, concentration: 0.85, largestDelegateSupports: true, support: 0.4, minoritySupport: 0.4 },
  sybil: { ...baseGovernance, support: 0.42, minoritySupport: 0.4, largestDelegateSupports: false, sybils: 120, verification: 0.1 },
  minority: { ...baseGovernance, minorityShare: 0.25, minoritySupport: 0.1, support: 0.7, doubleMajority: false },
};
