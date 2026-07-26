import React from "react";

export function Stage({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="stage-head">
        <h2>{title}</h2>
        <span className="mono stage-note">{note}</span>
      </div>
      <div className="stage-body">{children}</div>
    </div>
  );
}

export function Row({ children }: { children: React.ReactNode }) {
  return <div className="field-row">{children}</div>;
}

export function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label className="field-label">
        {label} {required && <span style={{ color: "var(--danger)", marginLeft: "2px" }}>*</span>} {hint && <span className="field-hint">— {hint}</span>}
      </label>
      {children}
      {error && <span className="field-error mono">{error}</span>}
    </div>
  );
}
