import { useEffect, useMemo, useState } from 'react';
import { useScheduler } from '../hooks/useScheduler';
import ResultsTab from '../components/tabs/ResultsTab';

export default function ResultsPage() {
  const [activeAlgo, setActiveAlgo] = useState('dp');
  const { farms, results, loading, error, runOne, runAllAlgorithms } = useScheduler();

  useEffect(() => {
    if (!results.greedy) {
      runAllAlgorithms().catch(() => {});
    }
  }, []);

  const exportsApi = {
    csv: () => console.log('CSV'),
    pdf: () => console.log('PDF'),
    png: () => console.log('PNG'),
    all: () => console.log('All'),
    saveConfig: () => console.log('Save'),
    loadConfig: () => console.log('Load'),
    copyJson: () => console.log('Copy'),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Algorithm Results</h1>
        <p className="text-gray-500">View detailed results from each scheduling algorithm</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red/30 bg-red/10 p-4 text-sm text-red">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {['Greedy', 'DP', 'Backtrack'].map((algo) => (
          <button
            key={algo}
            onClick={() => {
              setActiveAlgo(algo.toLowerCase());
              if (!results[algo.toLowerCase()]) {
                runOne(algo.toLowerCase());
              }
            }}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeAlgo === algo.toLowerCase()
                ? 'bg-green text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${loading[algo.toLowerCase()] ? 'opacity-75' : ''}`}
            disabled={loading[algo.toLowerCase()]}
          >
            {loading[algo.toLowerCase()] ? '⟳ ' : ''}{algo}
          </button>
        ))}
        <button
          onClick={() => runAllAlgorithms()}
          className="px-6 py-2 rounded-lg font-semibold bg-blue text-white hover:bg-blue/90 transition ml-auto"
        >
          Run All
        </button>
      </div>

      <ResultsTab farms={farms} results={results} activeAlgo={activeAlgo} onExport={exportsApi} />
    </div>
  );
}
