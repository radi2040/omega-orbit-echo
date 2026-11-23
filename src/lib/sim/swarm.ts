import { mulberry32, shuffle } from "./random";

/**
 * Fixed response-threshold model of task allocation (Bonabeau, Theraulaz & Deneubourg 1996),
 * extended with agents that file false stimulus reports. Educational only: it models
 * no real people, AI systems, communication networks or learning.
 *
 * Each step: a shared board publishes one stimulus value per task, aggregated from agents'
 * reports (mean, or median of random samples when cross-checking). Idle honest agents engage
 * task j with probability b² / (b² + θ²); working agents quit with probability QUIT_P.
 * True stimulus rises with unmet need and falls as work is done.
 */
export const TASKS = 3;
export const QUIT_P = 0.2;
export const S_MAX = 20;
export const SAMPLE_SIZE = 15;
/** The task manipulative agents falsely report as urgent. */
export const TARGET_TASK = 0;

export type SwarmInput = {
  agents: number;
  /** Share of the honest workforce each task needs, 0..1. */
  demand: [number, number, number];
  /** Share of agents that file false reports and do no work, 0..0.5. */
  manipulators: number;
  crossCheck: boolean;
  steps: number;
  seed: number;
};

export type SwarmStep = {
  t: number;
  workers: number[];
  needed: number[];
  board: number[];
  /** Total unmet need across tasks as a share of total need. */
  unmetShare: number;
  /** Workers on the target task beyond its need, as a share of honest agents. */
  misallocated: number;
};

export type SwarmResult = {
  honest: number;
  manipulators: number;
  steps: SwarmStep[];
  /** Task per agent at the final step (-1 idle, -2 manipulator). */
  finalAssignment: number[];
  /** Averages over the second half of the run, after the warm-up. */
  avgUnmetShare: number;
  avgMisallocated: number;
};

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? (s[m] as number) : ((s[m - 1] as number) + (s[m] as number)) / 2;
};

export function simulateSwarm(input: SwarmInput): SwarmResult {
  const rand = mulberry32(input.seed);
  const n = Math.max(1, Math.round(input.agents));
  const m = Math.min(Math.floor(n / 2), Math.round(n * Math.min(0.5, Math.max(0, input.manipulators))));
  const honest = n - m;
  const isManip = shuffle(
    Array.from({ length: n }, (_, i) => i < m),
    rand,
  );
  const theta = Array.from({ length: n }, () => Array.from({ length: TASKS }, () => 1 + rand() * 9));
  const needed = input.demand.map((d) => Math.round(Math.min(1, Math.max(0, d)) * honest));
  const totalNeed = needed.reduce((a, b) => a + b, 0);
  const task: number[] = isManip.map((x) => (x ? -2 : -1));
  let stim = Array.from({ length: TASKS }, () => 5);
  const steps: SwarmStep[] = [];

  for (let t = 0; t < input.steps; t++) {
    // 1. Reports: honest agents report true stimulus, manipulators inflate the target task.
    const board = stim.map((s, j) => {
      const reports = isManip.map((x) => (x && j === TARGET_TASK ? S_MAX : s));
      if (!input.crossCheck) return reports.reduce((a, b) => a + b, 0) / reports.length;
      const sample = Array.from({ length: Math.min(SAMPLE_SIZE, n) }, () => reports[Math.floor(rand() * n)] as number);
      return median(sample);
    });
    // 2. Honest agents quit or engage.
    for (let i = 0; i < n; i++) {
      if (isManip[i]) continue;
      const cur = task[i] as number;
      if (cur >= 0) {
        if (rand() < QUIT_P) task[i] = -1;
        continue;
      }
      for (const j of shuffle([0, 1, 2], rand)) {
        const b = board[j] as number;
        const th = (theta[i] as number[])[j] as number;
        if (rand() < (b * b) / (b * b + th * th)) {
          task[i] = j;
          break;
        }
      }
    }
    // 3. Update true stimulus.
    const workers = Array.from({ length: TASKS }, (_, j) => task.filter((x) => x === j).length);
    stim = stim.map((s, j) => {
      const gap = (needed[j] as number) - (workers[j] as number);
      return Math.min(S_MAX, Math.max(0, s + (gap / Math.max(1, honest)) * 10));
    });
    const unmet = needed.reduce((acc, need, j) => acc + Math.max(0, need - (workers[j] as number)), 0);
    steps.push({
      t,
      workers,
      needed: [...needed],
      board: board.map((b) => Math.round(b * 100) / 100),
      unmetShare: totalNeed > 0 ? unmet / totalNeed : 0,
      misallocated: Math.max(0, (workers[TARGET_TASK] as number) - (needed[TARGET_TASK] as number)) / Math.max(1, honest),
    });
  }

  const tail = steps.slice(Math.floor(steps.length / 2));
  const avg = (f: (s: SwarmStep) => number) => (tail.length ? tail.reduce((a, s) => a + f(s), 0) / tail.length : 0);
  return {
    honest,
    manipulators: m,
    steps,
    finalAssignment: task,
    avgUnmetShare: avg((s) => s.unmetShare),
    avgMisallocated: avg((s) => s.misallocated),
  };
}

export const baseSwarm: SwarmInput = { agents: 120, demand: [0.12, 0.2, 0.15], manipulators: 0, crossCheck: false, steps: 80, seed: 7 };
