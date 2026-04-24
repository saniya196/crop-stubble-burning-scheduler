import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScheduler } from '../hooks/useScheduler';
import { useToast } from '../context/ToastContext';
import KPIStrip from '../components/ui/KPIStrip';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { farms, budget, setBudgetWithValidation, budgetError, results, loading, error, runAllAlgorithms } = useScheduler();
  const { addToast } = useToast();

  useEffect(() => {
  if (!results.greedy && !loading.all) {
    runAllAlgorithms().catch((err) => {
      addToast('Failed to run algorithms', 'error');
    });
  }
}, []);

  const allResults = useMemo(
    () => [results.greedy, results.dp, results.backtrack].filter(Boolean),
    [results]
  );

  const bestResult = useMemo(() => {
    if (!allResults.length) return null;
    return [...allResults].sort((a, b) => a.totalPollution - b.totalPollution)[0];
  }, [allResults]);

  const assignments = bestResult?.assignments || [];

  const kpis = useMemo(() => {
    const minPollution = allResults.length ? Math.min(...allResults.map((r) => r.totalPollution)) : 0;
    const optimalCost = results.dp?.totalCost ?? 0;
    const coverageCount = assignments.filter((a) => a.methodName !== 'UNASSIGNED').length;
    const pruneRate = results.backtrack?.pruneRate ? `${results.backtrack.pruneRate.toFixed(1)}%` : '0%';
    const ecoMethods = assignments.filter((a) => a.methodName !== 'Burning' && a.methodName !== 'UNASSIGNED').length;
    const dpImp = results.greedy && results.dp && results.greedy.totalPollution > 0
      ? (((results.greedy.totalPollution - results.dp.totalPollution) / results.greedy.totalPollution) * 100).toFixed(1) + '%'
      : '0%';

    return {
      minPollution,
      optimalCost: `₹ ${optimalCost.toLocaleString()}`,
      coverage: `${coverageCount}/${farms.length}`,
      pruneRate,
      ecoMethods,
      dpImprovement: dpImp,
    };
  }, [allResults, results, assignments, farms.length]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">📊 Dashboard</h1>
          <p className="text-gray-500">Welcome to Crop Stubble Burning Scheduler</p>
        </div>
        <button
          onClick={() => runAllAlgorithms()}
          disabled={loading.all}
          className="px-6 py-3 bg-green text-white font-semibold rounded-lg hover:bg-green/90 transition disabled:opacity-50 flex items-center gap-2"
        >
          {loading.all ? '⟳ Running...' : '▶ Run All Algorithms'}
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red/30 bg-red/10 p-4 text-sm text-red font-semibold flex items-start gap-2">
          <span>✕</span>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-ink/10 bg-surface p-6 shadow-soft">
          <h2 className="text-xl font-semibold mb-4">🚜 Quick Stats</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Total Farms</span>
              <span className="font-bold text-lg text-ink">{farms.length}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <label className="text-gray-600 font-medium block mb-2">Available Budget (₹)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudgetWithValidation(e.target.value)}
                placeholder="Enter budget amount"
                className={`w-full px-3 py-2 border rounded-md font-bold text-lg transition ${
                  budgetError ? 'border-red/50 bg-red/5 focus:ring-red/30' : 'border-gray-300 bg-white focus:ring-green/30'
                } focus:outline-none focus:ring-2`}
              />
              {budgetError && (
                <p className="text-red text-sm font-semibold mt-2">✕ {budgetError}</p>
              )}
              {!budgetError && budget > 0 && (
                <p className="text-green text-sm font-semibold mt-2">✓ Budget set to ₹{budget.toLocaleString()}</p>
              )}
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Best Algorithm</span>
              <span className="font-bold text-lg text-blue">{bestResult?.algorithmName.toUpperCase() || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Min Pollution</span>
              <span className="font-bold text-lg text-red">{kpis.minPollution} units</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-surface p-6 shadow-soft">
          <h2 className="text-xl font-semibold mb-4">⚙️ Algorithm Status</h2>
          <div className="space-y-2">
            {[
              { name: 'Greedy', key: 'greedy', icon: '⚡', color: 'green' },
              { name: 'Dynamic Programming', key: 'dp', icon: '📊', color: 'blue' },
              { name: 'Backtracking', key: 'backtrack', icon: '🔍', color: 'red' },
            ].map((algo) => (
              <div key={algo.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{algo.icon}</span>
                  <span className="font-medium">{algo.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {loading[algo.key] && <span className="text-sm animate-spin">⟳</span>}
                  <span className={`w-3 h-3 rounded-full ${results[algo.key] ? 'bg-green' : loading[algo.key] ? 'bg-amber animate-pulse' : 'bg-gray-300'}`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <KPIStrip kpis={kpis} />

      <div className="rounded-xl border border-ink/10 bg-surface p-6 shadow-soft">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">📋 Top Assignments</h2>
          <button
            onClick={() => navigate('/results')}
            className="text-sm text-blue hover:text-blue/70 font-semibold"
          >
            View All →
          </button>
        </div>
        {assignments.length > 0 ? (
          <div className="space-y-2">
            {assignments.slice(0, 4).map((a) => (
              <div key={a.farmId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-ink">{a.farmId}</span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">{a.methodName}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{a.days} days</span>
                  <span className="font-bold text-green text-lg">₹{a.cost}</span>
                </div>
              </div>
            ))}
            {assignments.length > 4 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                +{assignments.length - 4} more farms
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-500 py-8 text-center">No assignments yet. Run algorithms to see results.</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate('/results')}
          className="p-4 rounded-xl border border-ink/10 bg-surface hover:bg-blue/5 transition text-center"
        >
          <div className="text-2xl mb-2">📈</div>
          <p className="font-semibold">View Results</p>
          <p className="text-xs text-gray-500">Detailed algorithm outputs</p>
        </button>
        <button
          onClick={() => navigate('/gantt')}
          className="p-4 rounded-xl border border-ink/10 bg-surface hover:bg-blue/5 transition text-center"
        >
          <div className="text-2xl mb-2">📅</div>
          <p className="font-semibold">Gantt Chart</p>
          <p className="text-xs text-gray-500">Visual schedule</p>
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="p-4 rounded-xl border border-ink/10 bg-surface hover:bg-blue/5 transition text-center"
        >
          <div className="text-2xl mb-2">⚙️</div>
          <p className="font-semibold">Settings</p>
          <p className="text-xs text-gray-500">Manage farms & budget</p>
        </button>
      </div>
    </div>
  );
}
