const lineClass = (line) => {
  const v = line.toLowerCase();
  if (v.includes('prune')) return 'text-red';
  if (v.includes('success') || v.includes('selected')) return 'text-green';
  return 'text-amber';
};

const TracePanel = ({ title, lines }) => (
  <div className="rounded-2xl border border-ink/10 bg-surface p-3 shadow-soft">
    <h3 className="mb-2 font-heading text-sm font-bold">{title}</h3>
    <div className="max-h-80 space-y-1 overflow-auto rounded-lg bg-ink p-2 font-mono text-[11px]">
      {(lines || []).map((line, idx) => (
        <p key={idx} className={lineClass(line)}>{line}</p>
      ))}
    </div>
  </div>
);

const TraceTab = ({ results }) => {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <TracePanel title="Greedy Decision Trace" lines={results.greedy?.stepTrace} />
      <TracePanel title="Backtracking Prune Trace" lines={results.backtrack?.stepTrace} />
      <TracePanel title="DP Trace" lines={results.dp?.stepTrace} />
    </div>
  );
};

export default TraceTab;
