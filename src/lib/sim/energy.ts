/**
 * Deterministic 24-hour energy balance for a small community microgrid. Educational only.
 * Assumptions: fixed clear-sky solar curve (06:00–18:00), smooth wind profile,
 * fixed residential demand shape, 95% charge and 95% discharge efficiency,
 * battery power limited to half its capacity per hour, deficits are unserved (or imported).
 */
export type EnergyInput = {
  solarKw: number; // peak solar output, kW
  windKw: number; // rated wind capacity, kW
  demandKwh: number; // total daily demand, kWh
  batteryKwh: number; // usable battery capacity, kWh
  initialSoc: number; // 0..1 starting state of charge
};

export type EnergyHour = {
  hour: number;
  solar: number;
  wind: number;
  generation: number;
  demand: number;
  charge: number; // energy drawn from surplus into battery (before losses)
  discharge: number; // energy delivered to load from battery
  surplus: number; // surplus that could not be stored (curtailed / exported)
  deficit: number; // demand not met
  soc: number; // kWh stored at end of hour
};

export type EnergyResult = {
  hours: EnergyHour[];
  totalGeneration: number;
  totalDemand: number;
  totalSurplus: number;
  totalDeficit: number;
  totalCharged: number;
  totalDischarged: number;
  selfSufficiency: number; // share of demand met locally
  endSoc: number;
};

export const CHARGE_EFF = 0.95;
export const DISCHARGE_EFF = 0.95;

// Relative demand per hour (sums to 1): night low, morning peak, evening peak.
const DEMAND_SHAPE_RAW = [
  2.2, 2.0, 1.9, 1.9, 2.0, 2.6, 3.8, 4.8, 4.6, 4.0, 3.8, 3.9,
  4.1, 4.0, 3.9, 4.0, 4.4, 5.4, 6.6, 7.0, 6.4, 5.2, 3.8, 2.8,
];
const SHAPE_SUM = DEMAND_SHAPE_RAW.reduce((a, b) => a + b, 0);
export const DEMAND_SHAPE = DEMAND_SHAPE_RAW.map((v) => v / SHAPE_SUM);

export const solarFactor = (h: number) => (h >= 6 && h <= 18 ? Math.max(0, Math.sin((Math.PI * (h - 6)) / 12)) : 0);
export const windFactor = (h: number) => 0.32 + 0.14 * Math.cos((2 * Math.PI * (h - 2)) / 24);

const r = (v: number) => Math.round(v * 1000) / 1000;

export function simulateEnergy(input: EnergyInput): EnergyResult {
  const cap = Math.max(0, input.batteryKwh);
  const maxRate = cap / 2;
  let soc = cap * Math.min(1, Math.max(0, input.initialSoc));
  const hours: EnergyHour[] = [];

  for (let h = 0; h < 24; h++) {
    const solar = Math.max(0, input.solarKw) * solarFactor(h);
    const wind = Math.max(0, input.windKw) * windFactor(h);
    const generation = solar + wind;
    const demand = Math.max(0, input.demandKwh) * (DEMAND_SHAPE[h] ?? 0);
    let charge = 0;
    let discharge = 0;
    let surplus = 0;
    let deficit = 0;

    if (generation >= demand) {
      const extra = generation - demand;
      const room = (cap - soc) / CHARGE_EFF; // input energy needed to fill
      charge = Math.min(extra, room, maxRate);
      soc += charge * CHARGE_EFF;
      surplus = extra - charge;
    } else {
      const need = demand - generation;
      const available = soc * DISCHARGE_EFF;
      discharge = Math.min(need, available, maxRate);
      soc -= discharge / DISCHARGE_EFF;
      deficit = need - discharge;
    }

    hours.push({
      hour: h,
      solar: r(solar),
      wind: r(wind),
      generation: r(generation),
      demand: r(demand),
      charge: r(charge),
      discharge: r(discharge),
      surplus: r(surplus),
      deficit: r(deficit),
      soc: r(soc),
    });
  }

  const sum = (k: keyof EnergyHour) => r(hours.reduce((s, x) => s + x[k], 0));
  const totalDemand = sum("demand");
  const totalDeficit = sum("deficit");
  return {
    hours,
    totalGeneration: sum("generation"),
    totalDemand,
    totalSurplus: sum("surplus"),
    totalDeficit,
    totalCharged: sum("charge"),
    totalDischarged: sum("discharge"),
    selfSufficiency: totalDemand > 0 ? 1 - totalDeficit / totalDemand : 1,
    endSoc: r(soc),
  };
}

export const baseEnergy: EnergyInput = { solarKw: 60, windKw: 15, demandKwh: 520, batteryKwh: 200, initialSoc: 0.5 };
