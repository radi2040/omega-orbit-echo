import { useId, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function RangeControl({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
  accent,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  accent?: string;
}) {
  const id = useId();
  const fill = max > min ? ((value - min) / (max - min)) * 100 : 0;
  return (
    <div data-accent={accent}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[12.5px] text-muted-foreground">
          {label}
        </label>
        <output htmlFor={id} className="accent-text font-mono text-[12px] tabular-nums">
          {format ? format(value) : value}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="range-omega"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${fill}%` } as CSSProperties}
      />
    </div>
  );
}

export function ToggleControl({ label, checked, onChange, description }: { label: string; checked: boolean; onChange: (v: boolean) => void; description?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-lg border border-border px-3 py-2.5 text-left transition-colors hover:border-[var(--line-strong)]"
    >
      <span>
        <span className="block text-[12.5px] text-foreground/90">{label}</span>
        {description && <span className="mt-0.5 block text-[11px] text-dim">{description}</span>}
      </span>
      <span className={cn("relative h-5 w-9 shrink-0 rounded-full transition-colors", checked ? "bg-primary" : "bg-muted")}>
        <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-all", checked ? "left-[18px]" : "left-0.5")} />
      </span>
    </button>
  );
}

export function ControlGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-4 rounded-xl border border-border p-4">
      <legend className="mono-label px-1.5">{title}</legend>
      {children}
    </fieldset>
  );
}

export function Metric({ label, value, accent, hint }: { label: string; value: string; accent?: string | undefined; hint?: string | undefined }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-3.5" data-accent={accent}>
      <div className="mono-label !text-[9.5px]">{label}</div>
      <div className={cn("mt-1.5 font-mono text-[19px] tabular-nums", accent ? "accent-text" : "text-foreground")}>{value}</div>
      {hint && <div className="mt-1 text-[10.5px] text-dim">{hint}</div>}
    </div>
  );
}

export function Assumptions({ title, items }: { title: string; items: string[] }) {
  return (
    <details className="group rounded-xl border border-border bg-background/30 p-4">
      <summary className="mono-label cursor-pointer list-none select-none text-amber">
        <span className="mr-2 inline-block transition-transform group-open:rotate-90">›</span>
        {title}
      </summary>
      <ul className="mt-3 space-y-1.5 pl-1">
        {items.map((x) => (
          <li key={x} className="flex gap-2.5 text-[12.5px] leading-relaxed text-muted-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" />
            {x}
          </li>
        ))}
      </ul>
    </details>
  );
}

export const pct = (v: number, digits = 0) => `${(v * 100).toFixed(digits)}%`;
