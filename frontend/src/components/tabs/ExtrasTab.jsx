import AIRecommender from '../ui/AIRecommender';
import DonutChart from '../ui/DonutChart';
import RiskHeatmap from '../ui/RiskHeatmap';

const ExtrasTab = ({ farms, riskLevel, budget, assignments, onExport }) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-2">
        <RiskHeatmap farms={farms} riskLevel={riskLevel} />
        <AIRecommender farms={farms} budget={budget} riskLevel={riskLevel} />
      </div>
      <DonutChart assignments={assignments} />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        <button onClick={onExport.csv} className="rounded-lg bg-green px-3 py-2 text-xs font-semibold text-white">CSV</button>
        <button onClick={onExport.pdf} className="rounded-lg bg-blue px-3 py-2 text-xs font-semibold text-white">PDF</button>
        <button onClick={onExport.png} className="rounded-lg bg-amber px-3 py-2 text-xs font-semibold text-white">PNG</button>
        <button onClick={onExport.saveConfig} className="rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white">Save Config</button>
        <button onClick={onExport.loadConfig} className="rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white">Load Config</button>
        <button onClick={onExport.copyJson} className="rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white">Copy JSON</button>
      </div>
    </div>
  );
};

export default ExtrasTab;
