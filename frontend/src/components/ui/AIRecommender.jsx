const AIRecommender = ({ farms, budget, riskLevel }) => {
  const recs = farms.map((farm) => {
    const window = Math.max(0, farm.deadline - farm.harvestDay);
    const risk = riskLevel(farm);
    let method = 'Bio-decomposer';
    let reason = 'Low pollution and moderate cost works for most windows.';
    let confidence = 72;

    if (risk === 'HIGH') {
      method = 'Burning';
      reason = 'Deadline window is tight; shortest duration is safest for feasibility.';
      confidence = 85;
    } else if (window >= 7 && budget >= 20000) {
      method = 'Mulching';
      reason = 'Longer window and healthy budget favor zero-pollution method.';
      confidence = 90;
    } else if (budget < 7000) {
      method = 'Bio-decomposer';
      reason = 'Budget-constrained scenario prioritizes low-cost, low-pollution option.';
      confidence = 80;
    }

    return { farmId: farm.id, method, reason, confidence };
  });

  return (
    <div className="rounded-2xl border border-ink/10 bg-surface p-4 shadow-soft">
      <h3 className="mb-3 font-heading text-sm font-bold">AI Recommender (Rule-Based)</h3>
      <div className="space-y-2">
        {recs.map((rec) => (
          <div key={rec.farmId} className="rounded-xl border border-ink/10 p-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono">
              <span>{rec.farmId}</span>
              <span className="rounded-full bg-blue/10 px-2 py-0.5 text-blue">{rec.method}</span>
              <span>{rec.confidence}% confidence</span>
            </div>
            <p className="mt-1 text-ink/70">{rec.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommender;
