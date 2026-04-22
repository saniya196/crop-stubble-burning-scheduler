const methodColor = {
  Burning: 'bg-red',
  Mulching: 'bg-green',
  'Bio-decomposer': 'bg-blue',
  'Manual Removal': 'bg-amber',
  UNASSIGNED: 'bg-ink/30',
};

const GanttChart = ({ farms, assignments = [] }) => {
  return (
    <div id="gantt-export" className="rounded-2xl border border-ink/10 bg-surface p-4 shadow-soft">
      <div
        className="mb-3 grid gap-1 text-[10px] font-mono text-ink/60"
        style={{ gridTemplateColumns: 'repeat(22, minmax(0, 1fr))' }}
      >
        {Array.from({ length: 22 }, (_, i) => (
          <span key={i} className="text-center">{i}</span>
        ))}
      </div>
      <div className="space-y-2">
        {farms.map((farm) => {
          const assignment = assignments.find((a) => a.farmId === farm.id) || { methodName: 'UNASSIGNED', days: 0, cost: 0, pollution: 0 };
          const riskWindow = Math.max(0, Number(farm.deadline) - Number(farm.harvestDay));
          const urgent = riskWindow <= 3;
          return (
            <div key={farm.id} className="group relative rounded-lg border border-ink/10 px-2 py-1">
              <div className="mb-1 flex items-center gap-2 text-xs font-mono">
                <span className="w-14">{farm.id}</span>
                {urgent && <span title="Urgent farm">⚡</span>}
              </div>
              <div className="relative h-5 rounded bg-ink/5">
                <div
                  className={`absolute h-5 rounded ${methodColor[assignment.methodName] || 'bg-ink/30'}`}
                  style={{ left: `${(farm.harvestDay / 21) * 100}%`, width: `${(Math.max(1, assignment.days) / 21) * 100}%` }}
                />
              </div>
              <div className="pointer-events-none absolute right-2 top-1 hidden rounded border border-ink/20 bg-white px-2 py-1 text-[10px] shadow group-hover:block">
                {assignment.methodName} | {assignment.days}d | Rs {assignment.cost} | P {assignment.pollution}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-mono">
        {Object.entries(methodColor).slice(0, 4).map(([name, color]) => (
          <span key={name} className="flex items-center gap-1">
            <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
