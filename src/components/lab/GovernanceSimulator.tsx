import { AlertTriangle, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";

import { baseGovernance, governanceScenarios, simulateGovernance, type GovernanceInput, type Outcome, type ScenarioId } from "@/lib/sim/governance";
import { l, useLang, useT, type L } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Assumptions, ControlGroup, Metric, pct, RangeControl, ToggleControl } from "./controls";

const scenarios: { id: ScenarioId; label: L; text: L }[] = [
  { id: "baseline", label: l("Baseline", "Ausgangslage"), text: l("A healthy vote: moderate turnout, some delegation, no attack.", "Eine gesunde Abstimmung: mittlere Beteiligung, etwas Delegation, kein Angriff.") },
  { id: "low-participation", label: l("Low participation", "Geringe Beteiligung"), text: l("Only 18% take part. The proposal fails quorum — or a small group decides for everyone if the quorum is lowered.", "Nur 18 % beteiligen sich. Der Vorschlag verfehlt das Quorum – oder eine kleine Gruppe entscheidet für alle, wenn das Quorum gesenkt wird.") },
  { id: "concentration", label: l("Delegation concentration", "Delegationskonzentration"), text: l("70% delegate, and one popular delegate receives 85% of that weight. A single person now outweighs a majority that opposes. Try the delegate cap.", "70 % delegieren, eine populäre Person erhält 85 % dieses Gewichts. Eine Einzelperson überstimmt nun eine ablehnende Mehrheit. Testen Sie die Delegationsgrenze.") },
  { id: "sybil", label: l("Sybil attack", "Sybil-Angriff"), text: l("An attacker registers 120 fake identities; weak verification lets 90% through. The real majority opposes, but the proposal passes. Raise verification.", "Ein Angreifer registriert 120 falsche Identitäten; schwache Prüfung lässt 90 % durch. Die echte Mehrheit lehnt ab, doch der Vorschlag geht durch. Erhöhen Sie die Prüfung.") },
  { id: "minority", label: l("Minority protection", "Minderheitenschutz"), text: l("A 25% minority strongly opposes a proposal the majority wants. Turn on the double-majority safeguard to see the difference.", "Eine Minderheit von 25 % lehnt einen Vorschlag stark ab, den die Mehrheit will. Aktivieren Sie die doppelte Mehrheit, um den Unterschied zu sehen.") },
];

const outcomeMeta: Record<Outcome, { label: L; accent: string }> = {
  passed: { label: l("Proposal passes", "Vorschlag angenommen"), accent: "mint" },
  rejected: { label: l("Proposal rejected", "Vorschlag abgelehnt"), accent: "rose" },
  "no-quorum": { label: l("No quorum — invalid", "Kein Quorum – ungültig"), accent: "amber" },
  blocked: { label: l("Blocked by minority safeguard", "Durch Minderheitenschutz blockiert"), accent: "violet" },
};

const c = {
  scenarios: l("Scenarios", "Szenarien"),
  reset: l("Reset", "Zurücksetzen"),
  population: l("Population", "Bevölkerung"),
  participants: l("Eligible participants", "Stimmberechtigte"),
  turnout: l("Turnout", "Beteiligung"),
  minorityShare: l("Minority group size", "Größe der Minderheit"),
  preferences: l("Preferences", "Präferenzen"),
  support: l("Majority group support", "Zustimmung der Mehrheitsgruppe"),
  minoritySupport: l("Minority group support", "Zustimmung der Minderheit"),
  delegationG: l("Delegation", "Delegation"),
  delegation: l("Share who delegate", "Anteil Delegierender"),
  concentration: l("Weight to largest delegate", "Gewicht beim größten Delegierten"),
  largestYes: l("Largest delegate votes YES", "Größter Delegierter stimmt JA"),
  cap: l("Max weight per voter", "Max. Gewicht pro Person"),
  noCap: l("no cap", "keine Grenze"),
  attack: l("Sybil attack", "Sybil-Angriff"),
  sybils: l("Fake identities", "Falsche Identitäten"),
  verification: l("Identity verification catches", "Identitätsprüfung erkennt"),
  rules: l("Decision rules", "Entscheidungsregeln"),
  quorum: l("Quorum", "Quorum"),
  threshold: l("Approval threshold", "Zustimmungsschwelle"),
  doubleMajority: l("Double-majority safeguard", "Doppelte-Mehrheit-Schutz"),
  doubleMajorityHint: l("Minority must also approve (≥ 50%)", "Minderheit muss ebenfalls zustimmen (≥ 50 %)"),
  yes: l("Yes", "Ja"),
  no: l("No", "Nein"),
  quorumBar: l("Participation vs quorum", "Beteiligung vs. Quorum"),
  cast: l("Cast weight", "Abgegebenes Gewicht"),
  largest: l("Largest voter", "Größte Stimme"),
  nakamoto: l("Nakamoto coefficient", "Nakamoto-Koeffizient"),
  nakamotoHint: l("voters controlling > 50%", "Personen mit > 50 %"),
  sybilShare: l("Fake share of votes", "Anteil falscher Stimmen"),
  minorityApproval: l("Minority approval", "Zustimmung der Minderheit"),
  distribution: l("Voting weight — top 24 voters", "Stimmgewicht – Top 24"),
  warnings: l("Signals", "Signale"),
  assumptions: l("Model assumptions", "Modellannahmen"),
  withoutSybils: l("Without fake identities the outcome would be", "Ohne falsche Identitäten wäre das Ergebnis"),
};

const assumptions = {
  en: [
    "Deterministic: identical inputs always give identical results. No randomness.",
    "Each human has one base vote. Delegators pass their whole vote to a delegate and do not vote themselves.",
    "The largest delegate receives the chosen share of all delegated weight; the rest is spread evenly over up to 20 other direct voters who mirror overall direct support.",
    "Minority members may delegate to majority delegates — this is how minority voice can be diluted.",
    "Fake identities all vote YES. Verification removes the stated share of them.",
    "Quorum = cast weight ÷ registered identities (including accepted fakes). Threshold = YES ÷ cast weight.",
    "The cap removes weight above the limit; that excess is treated as abstaining.",
    "Minority approval is measured among the minority's direct voters only.",
  ],
  de: [
    "Deterministisch: Gleiche Eingaben liefern immer gleiche Ergebnisse. Kein Zufall.",
    "Jeder Mensch hat eine Grundstimme. Delegierende geben ihre ganze Stimme ab und stimmen selbst nicht.",
    "Der größte Delegierte erhält den gewählten Anteil des delegierten Gewichts; der Rest verteilt sich gleichmäßig auf bis zu 20 weitere direkt Abstimmende, die die allgemeine Zustimmung spiegeln.",
    "Mitglieder der Minderheit können an Delegierte der Mehrheit delegieren – so kann ihre Stimme verwässert werden.",
    "Falsche Identitäten stimmen alle mit JA. Die Prüfung entfernt den angegebenen Anteil.",
    "Quorum = abgegebenes Gewicht ÷ registrierte Identitäten (inkl. akzeptierter Fälschungen). Schwelle = JA ÷ abgegebenes Gewicht.",
    "Die Grenze entfernt Gewicht oberhalb des Limits; dieser Überschuss gilt als Enthaltung.",
    "Die Zustimmung der Minderheit wird nur unter ihren direkt Abstimmenden gemessen.",
  ],
};

export function GovernanceSimulator() {
  const t = useT();
  const [input, setInput] = useState<GovernanceInput>(baseGovernance);
  const [scenario, setScenario] = useState<ScenarioId>("baseline");
  const r = useMemo(() => simulateGovernance(input), [input]);
  const set = <K extends keyof GovernanceInput>(k: K, v: GovernanceInput[K]) => setInput((p) => ({ ...p, [k]: v }));
  const { lang } = useLang();

  const warnings: L[] = [];
  if (r.participationRate < 0.3)
    warnings.push(l(`Only ${pct(r.participationRate)} of registered identities took part — a small group decides for everyone.`, `Nur ${pct(r.participationRate)} der registrierten Identitäten nahmen teil – eine kleine Gruppe entscheidet für alle.`));
  if (r.largestShare > 0.33)
    warnings.push(l(`One voter controls ${pct(r.largestShare)} of the cast weight.`, `Eine Person kontrolliert ${pct(r.largestShare)} des abgegebenen Gewichts.`));
  if (r.acceptedSybils > 0 && r.outcome !== r.outcomeWithoutSybils)
    warnings.push(l("Fake identities changed the outcome.", "Falsche Identitäten haben das Ergebnis verändert."));
  if (r.outcome === "passed" && r.minorityApproval !== null && r.minorityApproval < 0.5)
    warnings.push(l(`Passed although only ${pct(r.minorityApproval)} of the minority approve.`, `Angenommen, obwohl nur ${pct(r.minorityApproval)} der Minderheit zustimmen.`));

  const om = outcomeMeta[r.outcome];
  const maxW = r.weights[0]?.weight ?? 1;
  const shown = r.weights.slice(0, 24);
  const scen = scenarios.find((s) => s.id === scenario)!;

  return (
    <div className="space-y-5">
      <div>
        <div className="mono-label mb-3">{t(c.scenarios)}</div>
        <div className="flex flex-wrap gap-2">
          {scenarios.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={scenario === s.id}
              onClick={() => {
                setScenario(s.id);
                setInput(governanceScenarios[s.id]);
              }}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[12px] transition-colors",
                scenario === s.id ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {t(s.label)}
            </button>
          ))}
          <button type="button" onClick={() => { setScenario("baseline"); setInput(baseGovernance); }} className="ml-auto inline-flex items-center gap-1.5 text-[12px] text-dim hover:text-foreground">
            <RotateCcw size={13} /> {t(c.reset)}
          </button>
        </div>
        <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">{t(scen.text)}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <ControlGroup title={t(c.population)}>
            <RangeControl label={t(c.participants)} value={input.participants} min={20} max={1000} step={10} onChange={(v) => set("participants", v)} />
            <RangeControl label={t(c.turnout)} value={input.turnout} min={0} max={1} step={0.01} onChange={(v) => set("turnout", v)} format={pct} />
            <RangeControl label={t(c.minorityShare)} value={input.minorityShare} min={0} max={0.5} step={0.01} onChange={(v) => set("minorityShare", v)} format={pct} />
          </ControlGroup>
          <ControlGroup title={t(c.preferences)}>
            <RangeControl label={t(c.support)} value={input.support} min={0} max={1} step={0.01} onChange={(v) => set("support", v)} format={pct} />
            <RangeControl label={t(c.minoritySupport)} value={input.minoritySupport} min={0} max={1} step={0.01} onChange={(v) => set("minoritySupport", v)} format={pct} />
          </ControlGroup>
          <ControlGroup title={t(c.delegationG)}>
            <RangeControl label={t(c.delegation)} value={input.delegation} min={0} max={1} step={0.01} onChange={(v) => set("delegation", v)} format={pct} />
            <RangeControl label={t(c.concentration)} value={input.concentration} min={0} max={1} step={0.01} onChange={(v) => set("concentration", v)} format={pct} />
            <RangeControl label={t(c.cap)} value={input.delegateCap} min={0.05} max={1} step={0.01} onChange={(v) => set("delegateCap", v)} format={(v) => (v >= 1 ? t(c.noCap) : pct(v))} />
            <ToggleControl label={t(c.largestYes)} checked={input.largestDelegateSupports} onChange={(v) => set("largestDelegateSupports", v)} />
          </ControlGroup>
          <ControlGroup title={t(c.attack)}>
            <RangeControl label={t(c.sybils)} value={input.sybils} min={0} max={400} step={5} onChange={(v) => set("sybils", v)} accent="rose" />
            <RangeControl label={t(c.verification)} value={input.verification} min={0} max={1} step={0.01} onChange={(v) => set("verification", v)} format={pct} />
          </ControlGroup>
          <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
            <ControlGroup title={t(c.rules)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <RangeControl label={t(c.quorum)} value={input.quorum} min={0} max={1} step={0.01} onChange={(v) => set("quorum", v)} format={pct} accent="amber" />
                <RangeControl label={t(c.threshold)} value={input.threshold} min={0.5} max={1} step={0.01} onChange={(v) => set("threshold", v)} format={pct} accent="amber" />
              </div>
              <ToggleControl label={t(c.doubleMajority)} description={t(c.doubleMajorityHint)} checked={input.doubleMajority} onChange={(v) => set("doubleMajority", v)} />
            </ControlGroup>
          </div>
        </div>

        <div className="space-y-4">
          <div data-accent={om.accent} className="accent-border accent-soft rounded-2xl border p-5" aria-live="polite">
            <div className="mono-label">{t(l("Outcome", "Ergebnis"))}</div>
            <div className="accent-text mt-1.5 text-[26px] font-semibold tracking-tight">{t(om.label)}</div>
            {r.acceptedSybils > 0 && (
              <p className="mt-1.5 text-[12.5px] text-muted-foreground">
                {t(c.withoutSybils)}: <span className="text-foreground">{t(outcomeMeta[r.outcomeWithoutSybils].label)}</span>
              </p>
            )}
            <div className="mt-5">
              <div className="mb-1.5 flex justify-between font-mono text-[11px]">
                <span className="text-mint">{t(c.yes)} {pct(r.yesShare, 1)}</span>
                <span className="text-dim">{t(c.threshold)} {pct(input.threshold)}</span>
                <span className="text-rose">{t(c.no)} {pct(1 - r.yesShare, 1)}</span>
              </div>
              <div className="relative h-3 overflow-hidden rounded-full bg-rose/30">
                <div className="h-full bg-mint transition-all" style={{ width: pct(r.yesShare, 2) }} />
                <div className="absolute inset-y-0 w-px bg-foreground" style={{ left: pct(input.threshold, 2) }} />
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between font-mono text-[11px] text-dim">
                <span>{t(c.quorumBar)}</span>
                <span>{pct(r.participationRate, 1)} / {pct(input.quorum)}</span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                <div className={cn("h-full transition-all", r.quorumMet ? "bg-primary" : "bg-amber")} style={{ width: pct(Math.min(1, r.participationRate), 2) }} />
                <div className="absolute inset-y-0 w-px bg-foreground" style={{ left: pct(input.quorum, 2) }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            <Metric label={t(c.cast)} value={String(r.castWeight)} />
            <Metric label={t(c.largest)} value={pct(r.largestShare, 1)} accent={r.largestShare > 0.33 ? "rose" : undefined} />
            <Metric label={t(c.nakamoto)} value={String(r.nakamoto)} hint={t(c.nakamotoHint)} accent={r.nakamoto <= 2 ? "rose" : undefined} />
            <Metric label={t(c.sybilShare)} value={pct(r.sybilShare, 1)} accent={r.sybilShare > 0 ? "rose" : undefined} />
            <Metric label={t(c.minorityApproval)} value={r.minorityApproval === null ? "—" : pct(r.minorityApproval)} />
            <Metric label={t(c.delegation)} value={`${r.delegators} → ${r.weights.filter((w) => w.kind === "delegate").length}`} />
          </div>

          <div className="rounded-xl border border-border p-4">
            <div className="mono-label mb-3">{t(c.distribution)}</div>
            <div className="flex h-28 items-end gap-[3px]" role="img" aria-label={t(c.distribution)}>
              {shown.map((w, i) => (
                <div
                  key={i}
                  className={cn("flex-1 rounded-t-sm transition-all", w.kind === "sybil" ? "bg-rose/70" : w.yes ? "bg-mint/80" : "bg-violet/70")}
                  style={{ height: `${Math.max(3, (w.weight / maxW) * 100)}%` }}
                  title={`${w.weight} · ${w.kind} · ${w.yes ? "YES" : "NO"}`}
                />
              ))}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-3 font-mono text-[10px] text-dim">
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-mint/80" /> {t(c.yes)}</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-violet/70" /> {t(c.no)}</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-rose/70" /> Sybil</span>
            </div>
          </div>

          {warnings.length > 0 && (
            <div className="rounded-xl border border-amber/30 bg-amber/5 p-4">
              <div className="mono-label mb-2.5 text-amber">{t(c.warnings)}</div>
              <ul className="space-y-2">
                {warnings.map((w) => (
                  <li key={w.en} className="flex gap-2.5 text-[13px] leading-relaxed text-foreground/85">
                    <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber" /> {t(w)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Assumptions title={t(c.assumptions)} items={assumptions[lang]} />
        </div>
      </div>
    </div>
  );
}
