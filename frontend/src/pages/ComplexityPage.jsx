import { useEffect } from 'react';
import { useScheduler } from '../hooks/useScheduler';
import ComplexityTab from '../components/tabs/ComplexityTab';

export default function ComplexityPage() {
  const { results, runAllAlgorithms } = useScheduler();

  useEffect(() => {
    if (!results.greedy) {
      runAllAlgorithms().catch(() => {});
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Algorithm Complexity Analysis</h1>
        <p className="text-gray-500">Compare time and space complexity of different algorithms</p>
      </div>

      <div className="bg-surface rounded-xl border border-ink/10 shadow-soft p-6">
        <ComplexityTab />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border-2 border-red/30 bg-red/5 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">⚡</span>
            <h3 className="text-lg font-bold">Backtracking</h3>
          </div>
          <p className="text-2xl font-bold text-red mb-2">O(4^n)</p>
          <p className="text-sm text-gray-600">Exhaustive search with pruning. Most accurate but slowest for large datasets.</p>
        </div>

        <div className="rounded-xl border-2 border-blue/30 bg-blue/5 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📊</span>
            <h3 className="text-lg font-bold">Dynamic Programming</h3>
          </div>
          <p className="text-2xl font-bold text-blue mb-2">O(n×B)</p>
          <p className="text-sm text-gray-600">Polynomial time. Optimal solution with reasonable performance.</p>
        </div>

        <div className="rounded-xl border-2 border-green/30 bg-green/5 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">⚙️</span>
            <h3 className="text-lg font-bold">Greedy</h3>
          </div>
          <p className="text-2xl font-bold text-green mb-2">O(n log n)</p>
          <p className="text-sm text-gray-600">Fastest algorithm. Good approximation, useful for real-time decisions.</p>
        </div>
      </div>

      <div className="rounded-xl border border-ink/10 bg-surface p-6 shadow-soft">
        <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
        <div className="space-y-3">
          <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-semibold">Greedy Time</span>
            <span>{results.greedy?.timeComplexity || 'N/A'}</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-semibold">DP Time</span>
            <span>{results.dp?.timeComplexity || 'N/A'}</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-semibold">Backtrack Time</span>
            <span>{results.backtrack?.timeComplexity || 'N/A'}</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-semibold">Backtrack Prune Rate</span>
            <span className="text-green font-bold">{results.backtrack?.pruneRate?.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
