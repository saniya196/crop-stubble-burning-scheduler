import { useEffect, useMemo } from 'react';
import { useScheduler } from '../hooks/useScheduler';
import GanttTab from '../components/tabs/GanttTab';

export default function GanttPage() {
  const { farms, results, runAllAlgorithms } = useScheduler();

  useEffect(() => {
    if (!results.greedy) {
      runAllAlgorithms().catch(() => {});
    }
  }, []);

  const bestResult = useMemo(() => {
    const allResults = [results.greedy, results.dp, results.backtrack].filter(Boolean);
    if (!allResults.length) return null;
    return [...allResults].sort((a, b) => a.totalPollution - b.totalPollution)[0];
  }, [results]);

  const assignments = bestResult?.assignments || [];

  const exportPng = async () => {
    // TODO: Implement PNG export
    console.log('Export PNG');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Gantt Chart</h1>
        <p className="text-gray-500">Optimal farm clearing schedule visualization (Best Algorithm: {bestResult?.algorithmName.toUpperCase()})</p>
      </div>

      <div className="bg-surface rounded-xl border border-ink/10 shadow-soft p-6">
        <GanttTab farms={farms} assignments={assignments} onExportPng={exportPng} />
      </div>

      <div className="rounded-xl border border-ink/10 bg-surface p-6 shadow-soft">
        <h2 className="text-xl font-semibold mb-4">Schedule Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Total Duration</p>
            <p className="text-2xl font-bold">21 days</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Farms Scheduled</p>
            <p className="text-2xl font-bold">{assignments.filter(a => a.methodName !== 'UNASSIGNED').length}/{farms.length}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Total Cost</p>
            <p className="text-2xl font-bold text-green">₹{bestResult?.totalCost.toLocaleString() || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
