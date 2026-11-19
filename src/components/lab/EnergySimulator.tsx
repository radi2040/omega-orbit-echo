import { RotateCcw } from "lucide-react";
import { useMemo, useState, type CSSProperties } from "react";

import { baseEnergy, CHARGE_EFF, DISCHARGE_EFF, simulateEnergy, type EnergyInput } from "@/lib/sim/energy";
import { l, useLang, useT } from "@/lib/i18n";
import { Assumptions, ControlGroup, Metric, pct, RangeControl } from "./controls";

const W = 480;
const H = 180;
const COL = W / 24;

const c = {
  inputs: l("System parameters", "Systemparameter"),
  solar: l("Solar peak output", "Solar-Spitzenleistung"),
  wind: l("Wind capacity", "Windkapazität"),
  demand: l("Daily demand", "Täglicher Bedarf"),
  battery: l("Battery capacity", "Batteriekapazität"),
  soc: l("Starting storage level", "Anfangs-Ladestand"),
  reset: l("Reset", "Zurücksetzen"),
  supply: l("Supply and demand over 24 hours", "Angebot und Nachfrage über 24 Stunden"),
  balance: l("Balance: surplus & charging (up) · discharging & deficit (down)", "Bilanz: Überschuss & Laden (oben) · Entladen & Defizit (unten)"),
  storage: l("Battery storage level", "Batterie-Ladestand"),
  inspect: l("Inspect hour", "Stunde ansehen"),
  gen: l("Generation", "Erzeugung"),
  dem: l("Demand", "Bedarf"),
  surplus: l("Surplus (curtailed / exported)", "Überschuss (abgeregelt / exportiert)"),
  deficit: l("Deficit (unmet / imported)", "Defizit (ungedeckt / importiert)"),
  charge: l("Charging", "Laden"),
  discharge: l("Discharging", "Entladen"),
  selfSuff: l("Demand met locally", "Lokal gedeckter Bedarf"),
  endSoc: l("Storage at midnight", "Speicher um Mitternacht"),
  assumptions: l("Model assumptions", "Modellannahmen"),
};

const assumptions = {
  en: [
    "A single idealised day; same inputs always give the same curves.",
    "Solar follows a clear-sky sine curve from 06:00 to 18:00 — no clouds or seasons.",
    "Wind follows a smooth profile peaking at night, around 18–46% of capacity.",
    `Demand follows a fixed residential shape with morning and evening peaks.`,
    `Battery charge efficiency ${CHARGE_EFF * 100}%, discharge efficiency ${DISCHARGE_EFF * 100}%; power limited to half the capacity per hour.`,
    "Surplus that cannot be stored is curtailed or exported; deficits are unmet or imported from a wider grid.",
    "Not an engineering tool: real microgrids need grid codes, inverter limits, weather data and safety margins.",
  ],
  de: [
    "Ein einzelner idealisierter Tag; gleiche Eingaben ergeben immer gleiche Kurven.",
    "Solar folgt einer Sinuskurve bei klarem Himmel von 06:00 bis 18:00 – ohne Wolken oder Jahreszeiten.",
    "Wind folgt einem glatten Profil mit Maximum in der Nacht, etwa 18–46 % der Kapazität.",
    "Der Bedarf folgt einem festen Haushaltsprofil mit Morgen- und Abendspitze.",
    `Lade-Wirkungsgrad ${CHARGE_EFF * 100} %, Entlade-Wirkungsgrad ${DISCHARGE_EFF * 100} %; Leistung begrenzt auf die halbe Kapazität pro Stunde.`,
    "Nicht speicherbarer Überschuss wird abgeregelt oder exportiert; Defizite bleiben ungedeckt oder werden aus einem größeren Netz bezogen.",
    "Kein Planungswerkzeug: Echte Microgrids brauchen Netzregeln, Wechselrichtergrenzen, Wetterdaten und Sicherheitsreserven.",
  ],
};

const kwh = (v: number) => `${v.toFixed(0)} kWh`;
const hh = (h: number) => `${String(h).padStart(2, "0")}:00`;

export function EnergySimulator() {
  const t = useT();
  const { lang } = useLang();
  const [input, setInput] = useState<EnergyInput>(baseEnergy);
  const [hour, setHour] = useState(19);
  const r = useMemo(() => simulateEnergy(input), [input]);
  const set = <K extends keyof EnergyInput>(k: K, v: EnergyInput[K]) => setInput((p) => ({ ...p, [k]: v }));

  const maxSupply = Math.max(1, ...r.hours.map((h) => Math.max(h.generation, h.demand))) * 1.1;
  const y = (v: number) => H - (v / maxSupply) * H;
  const demandPath = r.hours.map((h, i) => `${i === 0 ? "M" : "L"} ${i * COL + COL / 2} ${y(h.demand)}`).join(" ");

  const maxFlow = Math.max(1, ...r.hours.map((h) => Math.max(h.surplus + h.charge, h.discharge + h.deficit))) * 1.1;
  const mid = H / 2;
  const fy = (v: number) => (v / maxFlow) * (H / 2);

  const cap = Math.max(1, input.batteryKwh);
  const SH = H / 2;
  const socPts = r.hours.map((h, i) => `${i * COL + COL / 2} ${SH - (input.batteryKwh > 0 ? h.soc / cap : 0) * (SH - 4)}`);
  const socLine = `M ${socPts.join(" L ")}`;
  const socArea = `M ${COL / 2} ${SH} L ${socPts.join(" L ")} L ${W - COL / 2} ${SH} Z`;

  const cur = r.hours[hour] ?? r.hours[0]!;

  const hoverCols = (height: number) => (
    <g>
      {r.hours.map((_, i) => (
        <rect key={i} x={i * COL} y={0} width={COL} height={height} fill="transparent" onMouseEnter={() => setHour(i)} />
      ))}
      <rect x={hour * COL} y={0} width={COL} height={height} fill="var(--foreground)" opacity=".06" pointerEvents="none" />
    </g>
  );

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
      <div className="space-y-3">
        <ControlGroup title={t(c.inputs)}>
          <RangeControl label={t(c.solar)} value={input.solarKw} min={0} max={200} step={5} onChange={(v) => set("solarKw", v)} format={(v) => `${v} kW`} accent="amber" />
          <RangeControl label={t(c.wind)} value={input.windKw} min={0} max={100} step={5} onChange={(v) => set("windKw", v)} format={(v) => `${v} kW`} accent="ice" />
          <RangeControl label={t(c.demand)} value={input.demandKwh} min={50} max={1200} step={10} onChange={(v) => set("demandKwh", v)} format={kwh} />
          <RangeControl label={t(c.battery)} value={input.batteryKwh} min={0} max={800} step={10} onChange={(v) => set("batteryKwh", v)} format={kwh} accent="mint" />
          <RangeControl label={t(c.soc)} value={input.initialSoc} min={0} max={1} step={0.01} onChange={(v) => set("initialSoc", v)} format={pct} accent="mint" />
        </ControlGroup>
        <button type="button" onClick={() => setInput(baseEnergy)} className="inline-flex items-center gap-1.5 text-[12px] text-dim hover:text-foreground">
          <RotateCcw size={13} /> {t(c.reset)}
        </button>
        <div className="grid grid-cols-2 gap-2.5">
          <Metric label={t(c.selfSuff)} value={pct(r.selfSufficiency)} accent={r.selfSufficiency >= 0.95 ? "mint" : r.selfSufficiency < 0.7 ? "rose" : "amber"} />
          <Metric label={t(c.gen)} value={kwh(r.totalGeneration)} accent="amber" />
          <Metric label={t(c.dem)} value={kwh(r.totalDemand)} />
          <Metric label={t(c.surplus)} value={kwh(r.totalSurplus)} accent="cyan" />
          <Metric label={t(c.deficit)} value={kwh(r.totalDeficit)} accent="rose" />
          <Metric label={t(c.endSoc)} value={kwh(r.endSoc)} accent="mint" />
        </div>
        <Assumptions title={t(c.assumptions)} items={assumptions[lang]} />
      </div>

      <div className="space-y-3">
        <figure className="rounded-xl border border-border p-4">
          <figcaption className="mono-label mb-3 flex flex-wrap justify-between gap-2">
            <span>{t(c.supply)}</span>
            <span className="flex gap-3 normal-case tracking-normal">
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-amber" /> Solar</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-ice" /> Wind</span>
              <span className="flex items-center gap-1.5"><i className="h-px w-3 bg-foreground" /> {t(c.dem)}</span>
            </span>
          </figcaption>
          <svg viewBox={`0 0 ${W} ${H + 16}`} className="w-full" role="img" aria-label={t(c.supply)}>
            {[0.25, 0.5, 0.75].map((g) => (
              <line key={g} x1={0} x2={W} y1={H * g} y2={H * g} stroke="var(--border)" strokeWidth=".6" />
            ))}
            {r.hours.map((h, i) => (
              <g key={i}>
                <rect x={i * COL + 3} width={COL - 6} y={y(h.wind)} height={H - y(h.wind)} fill="var(--ice)" opacity=".75" rx="1.5" />
                <rect x={i * COL + 3} width={COL - 6} y={y(h.wind + h.solar)} height={H - y(h.solar)} fill="var(--amber)" opacity=".85" rx="1.5" />
              </g>
            ))}
            <path d={demandPath} fill="none" stroke="var(--foreground)" strokeWidth="1.6" strokeLinejoin="round" />
            {hoverCols(H)}
            {[0, 6, 12, 18, 23].map((h) => (
              <text key={h} x={h === 0 ? 2 : h === 23 ? W - 2 : h * COL + COL / 2} y={H + 13} textAnchor={h === 0 ? "start" : h === 23 ? "end" : "middle"} fontSize="9" fill="var(--dim)" fontFamily="var(--font-mono)">{hh(h)}</text>
            ))}
          </svg>
        </figure>

        <figure className="rounded-xl border border-border p-4">
          <figcaption className="mono-label mb-3 flex flex-wrap justify-between gap-2">
            <span>{t(c.balance)}</span>
            <span className="flex flex-wrap gap-3 normal-case tracking-normal">
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-cyan" /> {t(c.surplus).split(" (")[0]}</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-mint" /> {t(c.charge)}</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-violet" /> {t(c.discharge)}</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-rose" /> {t(c.deficit).split(" (")[0]}</span>
            </span>
          </figcaption>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t(c.balance)}>
            <line x1={0} x2={W} y1={mid} y2={mid} stroke="var(--line-strong)" strokeWidth=".8" />
            {r.hours.map((h, i) => {
              const x = i * COL + 3;
              const w = COL - 6;
              return (
                <g key={i}>
                  <rect x={x} width={w} y={mid - fy(h.charge)} height={fy(h.charge)} fill="var(--mint)" rx="1" />
                  <rect x={x} width={w} y={mid - fy(h.charge) - fy(h.surplus)} height={fy(h.surplus)} fill="var(--cyan)" opacity=".85" rx="1" />
                  <rect x={x} width={w} y={mid} height={fy(h.discharge)} fill="var(--violet)" rx="1" />
                  <rect x={x} width={w} y={mid + fy(h.discharge)} height={fy(h.deficit)} fill="var(--rose)" opacity=".9" rx="1" />
                </g>
              );
            })}
            {hoverCols(H)}
          </svg>
        </figure>

        <figure className="rounded-xl border border-border p-4">
          <figcaption className="mono-label mb-3">{t(c.storage)} · {kwh(input.batteryKwh)}</figcaption>
          <svg viewBox={`0 0 ${W} ${SH}`} className="w-full" role="img" aria-label={t(c.storage)}>
            <line x1={0} x2={W} y1={4} y2={4} stroke="var(--border)" strokeDasharray="3 3" />
            <path d={socArea} fill="var(--mint)" opacity=".16" />
            <path d={socLine} fill="none" stroke="var(--mint)" strokeWidth="1.8" strokeLinejoin="round" />
            {hoverCols(SH)}
          </svg>
        </figure>

        <div className="panel p-4" aria-live="polite">
          <div className="mb-3 flex items-center gap-4">
            <label htmlFor="hour-inspect" className="mono-label whitespace-nowrap">{t(c.inspect)}</label>
            <input id="hour-inspect" type="range" min={0} max={23} value={hour} onChange={(e) => setHour(Number(e.target.value))} className="range-omega" style={{ "--fill": `${(hour / 23) * 100}%` } as CSSProperties} />
            <span className="font-mono text-[14px] text-primary">{hh(hour)}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 font-mono text-[11.5px] sm:grid-cols-6">
            {[
              { k: c.gen, v: cur.generation, cl: "text-amber" },
              { k: c.dem, v: cur.demand, cl: "text-foreground" },
              { k: c.charge, v: cur.charge, cl: "text-mint" },
              { k: c.discharge, v: cur.discharge, cl: "text-violet" },
              { k: c.surplus, v: cur.surplus, cl: "text-cyan" },
              { k: c.deficit, v: cur.deficit, cl: "text-rose" },
            ].map((x) => (
              <div key={x.k.en}>
                <div className="truncate text-[9.5px] uppercase tracking-wider text-dim">{t(x.k).split(" (")[0]}</div>
                <div className={`mt-1 tabular-nums ${x.cl}`}>{x.v.toFixed(1)} kWh</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
