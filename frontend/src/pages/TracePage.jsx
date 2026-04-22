import { useEffect } from 'react';
import { useScheduler } from '../hooks/useScheduler';
import TraceTab from '../components/tabs/TraceTab';

export default function TracePage() {
  const { results, runAllAlgorithms } = useScheduler();

  useEffect(() => {
    if (!results.greedy) {
      runAllAlgorithms().catch(() => {});
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Algorithm Trace</h1>
        <p className="text-gray-500">Step-by-step execution trace of each algorithm</p>
      </div>

      <div className="bg-surface rounded-xl border border-ink/10 shadow-soft p-6">
        <TraceTab results={results} />
      </div>
    </div>
  );
}
