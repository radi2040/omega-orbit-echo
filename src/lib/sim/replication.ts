import { mulberry32, shuffle } from "./random";

/**
 * Replication and fault tolerance in a toy storage network. Educational only:
 * failures are independent; latency, partitions, repair and incentives are not modelled.
 */
export const ITEMS = 24;

export type ReplicationInput = {
  nodes: number;
  /** Copies of each item, stored on distinct nodes. Clamped to [1, nodes]. */
  replication: number;
  /** Independent probability that a node is down, 0..1. */
  failureP: number;
  /** Nodes that are up but behave arbitrarily (Byzantine). */
  byzantine: number;
  seed: number;
};

export type NodeState = "up" | "down" | "byzantine";
export type ItemState = "ok" | "untrusted" | "lost";

export type ReplicationResult = {
  replication: number;
  nodes: NodeState[];
  items: { replicas: number[]; state: ItemState }[];
  /** Analytical probability one item survives independent failures: 1 − p^r. */
  availability: number;
  expectedLost: number;
  lost: number;
  untrusted: number;
  /** BFT agreement among all nodes requires n ≥ 3f + 1. */
  bftPossible: boolean;
  maxByzantine: number;
};

export const itemAvailability = (p: number, r: number) => 1 - Math.pow(Math.min(1, Math.max(0, p)), Math.max(1, r));
export const bftPossible = (n: number, f: number) => n >= 3 * f + 1;
export const maxByzantine = (n: number) => Math.max(0, Math.floor((n - 1) / 3));

export function simulateReplication(input: ReplicationInput): ReplicationResult {
  const rand = mulberry32(input.seed);
  const n = Math.max(1, Math.round(input.nodes));
  const r = Math.min(n, Math.max(1, Math.round(input.replication)));
  const f = Math.min(n, Math.max(0, Math.round(input.byzantine)));
  const ids = Array.from({ length: n }, (_, i) => i);
  const byz = new Set(shuffle(ids, rand).slice(0, f));
  const nodes: NodeState[] = ids.map((i) => (byz.has(i) ? "byzantine" : rand() < input.failureP ? "down" : "up"));
  const items = Array.from({ length: ITEMS }, () => {
    const replicas = shuffle(ids, rand).slice(0, r);
    const live = replicas.filter((i) => nodes[i] !== "down");
    const honest = live.filter((i) => nodes[i] === "up");
    const state: ItemState = live.length === 0 ? "lost" : honest.length === 0 ? "untrusted" : "ok";
    return { replicas, state };
  });
  const availability = itemAvailability(input.failureP, r);
  return {
    replication: r,
    nodes,
    items,
    availability,
    expectedLost: ITEMS * (1 - availability),
    lost: items.filter((x) => x.state === "lost").length,
    untrusted: items.filter((x) => x.state === "untrusted").length,
    bftPossible: bftPossible(n, f),
    maxByzantine: maxByzantine(n),
  };
}

export const baseReplication: ReplicationInput = { nodes: 24, replication: 3, failureP: 0.2, byzantine: 2, seed: 11 };
