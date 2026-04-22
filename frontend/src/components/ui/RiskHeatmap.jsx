const tone = {
  HIGH: 'bg-red/70',
  MED: 'bg-amber/70',
  LOW: 'bg-green/70',
};

const RiskHeatmap = ({ farms, riskLevel }) => {
  return (
    <div className="rounded-2xl border border-ink/10 bg-surface p-4 shadow-soft">
      <h3 className="mb-2 font-heading text-sm font-bold">Risk Heatmap (4x2)</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {farms.map((farm) => {
          const risk = riskLevel(farm);
          return (
            <div key={farm.id} className="rounded-xl border border-ink/10 p-2">
              <p className="mb-1 font-mono text-xs">{farm.id}</p>
              <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className={`h-4 rounded ${tone[risk]}`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RiskHeatmap;
