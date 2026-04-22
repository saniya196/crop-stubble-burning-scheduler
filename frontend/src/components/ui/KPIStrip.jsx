const KPI = ({ label, value, tone = 'text-ink' }) => (
  <div className="rounded-xl border border-ink/10 bg-surface p-3 shadow-soft">
    <p className="font-mono text-[10px] uppercase text-ink/60">{label}</p>
    <p className={`mt-1 font-heading text-lg font-extrabold ${tone}`}>{value}</p>
  </div>
);

const KPIStrip = ({ kpis }) => {
  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      <KPI label="Min Pollution" value={kpis.minPollution} tone="text-green" />
      <KPI label="Optimal Cost" value={kpis.optimalCost} tone="text-blue" />
      <KPI label="Farm Coverage" value={kpis.coverage} tone="text-ink" />
      <KPI label="Prune Rate" value={kpis.pruneRate} tone="text-red" />
      <KPI label="Eco Methods" value={kpis.ecoMethods} tone="text-green" />
      <KPI label="DP Improvement" value={kpis.dpImprovement} tone="text-amber" />
    </section>
  );
};

export default KPIStrip;
