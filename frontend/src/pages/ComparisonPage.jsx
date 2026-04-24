import { useEffect } from 'react';
import { useScheduler } from '../hooks/useScheduler';
import CompareTab from '../components/tabs/CompareTab';

export default function ComparisonPage() {
  const { farms, budget, results, runAllAlgorithms } = useScheduler();

  useEffect(() => {
    if (!results.greedy) {
      runAllAlgorithms().catch(() => {});
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Algorithm Comparison</h1>
          <p className="text-gray-500">Compare how each algorithm assigns clearing methods to farms</p>
        </div>
        <div className="bg-surface rounded-lg border border-ink/10 p-4 shadow-soft">
          <p className="text-sm text-gray-600 mb-1">Current Budget</p>
          <p className="text-2xl font-bold text-green">₹{budget.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-ink/10 shadow-soft p-6">
        <CompareTab farms={farms} results={results} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-ink/10 bg-surface p-6 shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Cost Comparison</h2>
          <div className="space-y-2">
            {['greedy', 'dp', 'backtrack'].map((algo) => (
              <div key={algo} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold capitalize">{algo}</span>
                <span className="text-green font-bold">₹{results[algo]?.totalCost.toLocaleString() || 'N/A'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-surface p-6 shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Pollution Comparison</h2>
          <div className="space-y-2">
            {['greedy', 'dp', 'backtrack'].map((algo) => (
              <div key={algo} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold capitalize">{algo}</span>
                <span className="text-red font-bold">{results[algo]?.totalPollution || 'N/A'} units</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
