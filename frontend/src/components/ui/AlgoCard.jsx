const badgeStyle = {
  FAST: 'bg-green/10 text-green border-green/30',
  OPTIMAL: 'bg-blue/10 text-blue border-blue/30',
  EXACT: 'bg-red/10 text-red border-red/30',
};

const AlgoCard = ({ title, icon, badge, result }) => {
  const coverage = result?.assignments?.filter((a) => a.methodName !== 'UNASSIGNED').length || 0;
  const total = result?.assignments?.length || 0;
  const pollution = result?.totalPollution || 0;

  return (
    <article className="rounded-2xl border border-ink/10 bg-surface p-4 shadow-soft">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-heading text-base font-extrabold">{icon} {title}</h3>
        <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${badgeStyle[badge]}`}>{badge}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 font-mono text-xs">
        <p>Cost: Rs {(result?.totalCost || 0).toLocaleString()}</p>
        <p>Pollution: {pollution}</p>
        <p>Time: {result?.timeComplexity || 'N/A'}</p>
        <p>Space: {result?.spaceComplexity || 'N/A'}</p>
        <p>Coverage: {coverage}/{total}</p>
        <p>Feasible: {result?.feasible ? 'Yes' : 'No'}</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10">
        <div className="h-full bg-green" style={{ width: `${Math.max(5, Math.min(100, 100 - pollution / 2))}%` }} />
      </div>
    </article>
  );
};

export default AlgoCard;
