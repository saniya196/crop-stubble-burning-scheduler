import AlgoCard from '../ui/AlgoCard';
import AssignmentTable from '../ui/AssignmentTable';

const ResultsTab = ({ farms, results, activeAlgo, onExport }) => {
  const assignmentSource = results[activeAlgo]?.assignments || [];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <AlgoCard title="Greedy" icon="⚡" badge="FAST" result={results.greedy} />
        <AlgoCard title="Dynamic Programming" icon="🧠" badge="OPTIMAL" result={results.dp} />
        <AlgoCard title="Backtracking" icon="🔍" badge="EXACT" result={results.backtrack} />
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={onExport.csv} className="rounded-lg bg-green px-3 py-1.5 text-xs font-semibold text-white">Export CSV</button>
        <button onClick={onExport.pdf} className="rounded-lg bg-blue px-3 py-1.5 text-xs font-semibold text-white">Export PDF</button>
        <button onClick={onExport.all} className="rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white">Export All</button>
      </div>

      <AssignmentTable farms={farms} assignments={assignmentSource} />
    </div>
  );
};

export default ResultsTab;
