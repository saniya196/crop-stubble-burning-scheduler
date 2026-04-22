import { useEffect } from 'react';
import { useScheduler } from '../hooks/useScheduler';
import ExtrasTab from '../components/tabs/ExtrasTab';

export default function ExtrasPage() {
  const { farms, results, budget, riskLevel, runAllAlgorithms } = useScheduler();

  useEffect(() => {
    if (!results.greedy) {
      runAllAlgorithms().catch(() => {});
    }
  }, []);

  const bestResult = [results.greedy, results.dp, results.backtrack]
    .filter(Boolean)
    .sort((a, b) => a.totalPollution - b.totalPollution)[0] || {};

  const assignments = bestResult?.assignments || [];

  const onExport = {
    csv: () => console.log('CSV'),
    pdf: () => console.log('PDF'),
    all: () => console.log('All'),
    saveConfig: () => console.log('Save'),
    loadConfig: () => console.log('Load'),
    copyJson: () => console.log('Copy'),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Extras & AI</h1>
        <p className="text-gray-500">Advanced analytics and AI-powered recommendations</p>
      </div>

      <ExtrasTab farms={farms} riskLevel={riskLevel} budget={budget} assignments={assignments} onExport={onExport} />
    </div>
  );
}
