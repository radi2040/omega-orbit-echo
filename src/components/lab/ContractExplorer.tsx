import { Check, Minus, Play, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { baseContract, runLifecycle, STAGES, type ContractInput, type StageId } from "@/lib/sim/contract";
import { l, useLang, useT, type L } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Assumptions, ControlGroup, RangeControl, ToggleControl } from "./controls";

const stages: Record<StageId, { title: L; text: L; requirements: L[]; failures: L[] }> = {
  proposal: {
    title: l("Proposal", "Vorschlag"),
    text: l("A member submits a structured request: who receives funds, how much, and why. Here: €12,000 for a community solar installation.", "Ein Mitglied reicht einen strukturierten Antrag ein: wer Mittel erhält, wie viel und warum. Hier: 12.000 € für eine Gemeinschafts-Solaranlage."),
    requirements: [l("Positive amount", "Positiver Betrag"), l("Registered, well-formed recipient", "Registrierter, gültiger Empfänger"), l("Public description of purpose", "Öffentliche Zweckbeschreibung")],
    failures: [l("Malformed or spam proposals", "Fehlerhafte oder Spam-Anträge"), l("Misleading descriptions — code cannot detect intent", "Irreführende Beschreibungen – Code erkennt keine Absicht")],
  },
  validation: {
    title: l("Validation", "Validierung"),
    text: l("The contract automatically checks the request against its encoded rules, such as budget and spending limits.", "Der Vertrag prüft den Antrag automatisch gegen die kodierten Regeln, etwa Budget und Ausgabengrenzen."),
    requirements: [l("Amount ≤ treasury balance", "Betrag ≤ Kassenstand"), l("Within per-proposal limits", "Innerhalb der Grenzen je Antrag")],
    failures: [l("Insufficient funds", "Unzureichende Mittel"), l("Rules encoded incorrectly by their authors", "Von den Autoren falsch kodierte Regeln"), l("Edge cases nobody anticipated", "Sonderfälle, die niemand bedacht hat")],
  },
  authorization: {
    title: l("Authorization", "Autorisierung"),
    text: l("A k-of-n group of signers must approve, and a time lock gives the community time to object before anything moves.", "Eine k-aus-n-Gruppe von Unterzeichnenden muss zustimmen; eine Zeitsperre gibt der Gemeinschaft Zeit für Einspruch, bevor etwas passiert."),
    requirements: [l("Enough independent signatures", "Genügend unabhängige Signaturen"), l("Time lock elapsed", "Zeitsperre abgelaufen")],
    failures: [l("Missing signatures", "Fehlende Signaturen"), l("Colluding signers", "Absprachen zwischen Unterzeichnenden"), l("Lost private keys", "Verlorene private Schlüssel")],
  },
  execution: {
    title: l("Execution", "Ausführung"),
    text: l("The contract transfers the funds. On a public blockchain this is effectively irreversible.", "Der Vertrag überweist die Mittel. Auf einer öffentlichen Blockchain ist das praktisch unumkehrbar."),
    requirements: [l("All prior stages passed", "Alle vorherigen Stufen bestanden"), l("Transaction fees available", "Transaktionsgebühren verfügbar")],
    failures: [l("Code bugs such as re-entrancy (The DAO, 2016)", "Code-Fehler wie Re-Entrancy (The DAO, 2016)"), l("Front-running by other actors", "Front-Running durch andere Akteure"), l("No undo button", "Kein Rückgängig-Knopf")],
  },
  verification: {
    title: l("Verification", "Verifikation"),
    text: l("An oracle or independent reviewers confirm the real-world work happened. Notice: this comes after the money moved.", "Ein Orakel oder unabhängige Prüfer bestätigen, dass die reale Arbeit erfolgt ist. Beachten Sie: Das geschieht, nachdem das Geld geflossen ist."),
    requirements: [l("Trusted, independent confirmation", "Vertrauenswürdige, unabhängige Bestätigung")],
    failures: [l("The oracle problem — the chain cannot see the physical world", "Das Orakel-Problem – die Kette sieht die physische Welt nicht"), l("False confirmations", "Falsche Bestätigungen"), l("Little recourse once funds are gone", "Kaum Abhilfe, wenn die Mittel weg sind")],
  },
  audit: {
    title: l("Audit", "Prüfung"),
    text: l("Every event is logged publicly so that anyone can review the decision and, if needed, open a dispute.", "Jedes Ereignis wird öffentlich protokolliert, sodass jede Person die Entscheidung prüfen und bei Bedarf Einspruch erheben kann."),
    requirements: [l("Published, readable event log", "Veröffentlichtes, lesbares Ereignisprotokoll")],
    failures: [l("Logs nobody reads", "Protokolle, die niemand liest"), l("Privacy leaks from public data", "Datenschutzlecks durch öffentliche Daten"), l("Audit without power to enforce", "Prüfung ohne Durchsetzungsmacht")],
  },
};

const reasons: Record<string, L> = {
  ok: l("Passed", "Bestanden"),
  halted: l("Not reached", "Nicht erreicht"),
  "invalid-amount": l("Amount must be greater than zero", "Betrag muss größer als null sein"),
  "invalid-recipient": l("Recipient is not registered", "Empfänger ist nicht registriert"),
  "insufficient-funds": l("Treasury cannot cover the amount", "Die Kasse deckt den Betrag nicht"),
  "impossible-quorum": l("More signatures required than signers exist", "Mehr Signaturen nötig als Unterzeichnende existieren"),
  "missing-signatures": l("Not enough signatures", "Nicht genug Signaturen"),
  timelock: l("Time lock has not elapsed", "Zeitsperre noch nicht abgelaufen"),
  unconfirmed: l("Delivery not confirmed — funds already sent", "Lieferung nicht bestätigt – Mittel bereits überwiesen"),
  "no-log": l("No public log — decision cannot be audited", "Kein öffentliches Protokoll – Entscheidung nicht prüfbar"),
};

const c = {
  inputs: l("Contract inputs", "Vertragseingaben"),
  amount: l("Requested amount", "Beantragter Betrag"),
  treasury: l("Treasury balance", "Kassenstand"),
  recipient: l("Recipient registered", "Empfänger registriert"),
  signatures: l("Signatures collected", "Gesammelte Signaturen"),
  required: l("Signatures required (of 5)", "Benötigte Signaturen (von 5)"),
  timelock: l("72-hour time lock elapsed", "72-Stunden-Zeitsperre abgelaufen"),
  oracle: l("Oracle confirms installation", "Orakel bestätigt Installation"),
  log: l("Event log published", "Ereignisprotokoll veröffentlicht"),
  run: l("Run lifecycle", "Lebenszyklus ausführen"),
  requirements: l("Requirements", "Voraussetzungen"),
  failures: l("Failure modes", "Fehlerbilder"),
  insight: l("Design insight", "Erkenntnis"),
  insightText: l(
    "Verification happens after irreversible execution. Safer designs release funds in milestones held in escrow — one reason OMEGA treats smart contracts as tools inside institutions, not replacements for them.",
    "Die Verifikation erfolgt nach der unumkehrbaren Ausführung. Sicherere Entwürfe geben Mittel in Etappen aus einem Treuhandkonto frei – ein Grund, warum OMEGA Smart Contracts als Werkzeuge innerhalb von Institutionen versteht, nicht als deren Ersatz.",
  ),
  assumptions: l("Model assumptions", "Modellannahmen"),
};

const assumptions = {
  en: ["A simplified, deterministic state machine; no blockchain is used.", "Stages run strictly in order; the first failure halts all later stages.", "Signers are assumed independent and honest; collusion is not modelled.", "Amounts are illustrative; there is no real currency."],
  de: ["Eine vereinfachte, deterministische Zustandsmaschine; es wird keine Blockchain verwendet.", "Stufen laufen streng nacheinander; der erste Fehler stoppt alle weiteren.", "Unterzeichnende gelten als unabhängig und ehrlich; Absprachen werden nicht modelliert.", "Beträge sind illustrativ; es gibt keine echte Währung."],
};

const fmt = (n: number) => `€${n.toLocaleString("en-US")}`;

export function ContractExplorer() {
  const t = useT();
  const { lang } = useLang();
  const [input, setInput] = useState<ContractInput>(baseContract);
  const [focus, setFocus] = useState<StageId>("proposal");
  const [revealed, setRevealed] = useState(STAGES.length);
  const timer = useRef<number | null>(null);
  const results = useMemo(() => runLifecycle(input), [input]);
  const set = <K extends keyof ContractInput>(k: K, v: ContractInput[K]) => {
    setInput((p) => ({ ...p, [k]: v }));
    setRevealed(STAGES.length);
  };

  useEffect(() => () => { if (timer.current) window.clearInterval(timer.current); }, []);

  const run = () => {
    if (timer.current) window.clearInterval(timer.current);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(STAGES.length);
      return;
    }
    setRevealed(0);
    let n = 0;
    timer.current = window.setInterval(() => {
      n++;
      setRevealed(n);
      setFocus(STAGES[Math.min(n, STAGES.length) - 1] ?? "audit");
      if (n >= STAGES.length && timer.current) window.clearInterval(timer.current);
    }, 550);
  };

  const s = stages[focus];
  const focusResult = results.find((r) => r.id === focus)!;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
      <div className="space-y-3">
        <ControlGroup title={t(c.inputs)}>
          <RangeControl label={t(c.amount)} value={input.amount} min={0} max={80000} step={1000} onChange={(v) => set("amount", v)} format={fmt} />
          <RangeControl label={t(c.treasury)} value={input.treasury} min={0} max={80000} step={1000} onChange={(v) => set("treasury", v)} format={fmt} />
          <RangeControl label={t(c.required)} value={input.required} min={1} max={5} onChange={(v) => set("required", v)} accent="violet" />
          <RangeControl label={t(c.signatures)} value={input.signatures} min={0} max={5} onChange={(v) => set("signatures", v)} accent="violet" />
          <ToggleControl label={t(c.recipient)} checked={input.recipientValid} onChange={(v) => set("recipientValid", v)} />
          <ToggleControl label={t(c.timelock)} checked={input.timelockElapsed} onChange={(v) => set("timelockElapsed", v)} />
          <ToggleControl label={t(c.oracle)} checked={input.oracleConfirmed} onChange={(v) => set("oracleConfirmed", v)} />
          <ToggleControl label={t(c.log)} checked={input.logPublished} onChange={(v) => set("logPublished", v)} />
        </ControlGroup>
        <button type="button" onClick={run} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-[13px] font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5">
          <Play size={15} /> {t(c.run)}
        </button>
        <Assumptions title={t(c.assumptions)} items={assumptions[lang]} />
      </div>

      <div className="space-y-4">
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6" aria-label="Lifecycle">
          {results.map((r, i) => {
            const visible = i < revealed;
            const status = visible ? r.status : "pending";
            return (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => setFocus(r.id)}
                  aria-pressed={focus === r.id}
                  className={cn(
                    "relative flex h-full w-full flex-col gap-2 rounded-xl border p-3 text-left transition-all",
                    focus === r.id ? "border-primary/50 bg-surface-raised" : "border-border bg-surface/60 hover:border-[var(--line-strong)]",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-dim">0{i + 1}</span>
                    <span
                      className={cn(
                        "grid h-5 w-5 place-items-center rounded-full",
                        status === "pass" && "bg-mint/20 text-mint",
                        status === "fail" && "bg-rose/20 text-rose",
                        (status === "skipped" || status === "pending") && "bg-muted text-dim",
                      )}
                    >
                      {status === "pass" ? <Check size={12} /> : status === "fail" ? <X size={12} /> : <Minus size={12} />}
                    </span>
                  </div>
                  <span className="text-[13px] font-semibold text-foreground">{t(stages[r.id].title)}</span>
                  <span className={cn("text-[10.5px] leading-snug", status === "fail" ? "text-rose" : "text-dim")}>
                    {visible ? t(reasons[r.reason] ?? reasons["ok"]!) : "…"}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="panel p-6" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="display-3 !text-[1.6rem] text-foreground">{t(s.title)}</h3>
            <span className={cn("chip", focusResult.status === "pass" ? "text-mint" : focusResult.status === "fail" ? "text-rose" : "text-dim")}>
              <span className="chip-dot" /> {t(reasons[focusResult.reason] ?? reasons["ok"]!)}
            </span>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{t(s.text)}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="mono-label mb-2.5 text-primary">{t(c.requirements)}</div>
              <ul className="space-y-2">
                {s.requirements.map((x) => (
                  <li key={x.en} className="flex gap-2.5 text-[13px] text-foreground/85"><Check size={14} className="mt-0.5 shrink-0 text-primary" /> {t(x)}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mono-label mb-2.5 text-rose">{t(c.failures)}</div>
              <ul className="space-y-2">
                {s.failures.map((x) => (
                  <li key={x.en} className="flex gap-2.5 text-[13px] text-foreground/85"><X size={14} className="mt-0.5 shrink-0 text-rose" /> {t(x)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-violet/30 bg-violet/5 p-4">
          <div className="mono-label mb-2 text-violet">{t(c.insight)}</div>
          <p className="text-[13px] leading-relaxed text-foreground/85">{t(c.insightText)}</p>
        </div>
      </div>
    </div>
  );
}
