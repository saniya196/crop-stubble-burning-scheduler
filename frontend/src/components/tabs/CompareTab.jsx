const cellTone = (method, greedyMethod) => {
  if (!method || !greedyMethod) return '';
  if (method !== greedyMethod && method !== 'Burning') return 'bg-green/10';
  return '';
};

const CompareTab = ({ farms, results }) => {
  const methodsFor = (algo, farmId) => results[algo]?.assignments?.find((a) => a.farmId === farmId)?.methodName || '-';

  return (
    <div className="overflow-auto rounded-2xl border border-ink/10 bg-surface shadow-soft">
      <table className="min-w-full text-xs">
        <thead className="bg-ink/5 font-heading uppercase">
          <tr>
            <th className="px-3 py-2 text-left">Farm</th>
            <th className="px-3 py-2 text-left">Greedy</th>
            <th className="px-3 py-2 text-left">DP</th>
            <th className="px-3 py-2 text-left">Backtrack</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {farms.map((farm) => {
            const g = methodsFor('greedy', farm.id);
            const d = methodsFor('dp', farm.id);
            const b = methodsFor('backtrack', farm.id);
            return (
              <tr key={farm.id} className="border-t border-ink/10">
                <td className="px-3 py-2">{farm.id}</td>
                <td className="px-3 py-2">{g}</td>
                <td className={`px-3 py-2 ${cellTone(d, g)}`}>{d}</td>
                <td className={`px-3 py-2 ${cellTone(b, g)}`}>{b}</td>
              </tr>
            );
          })}
          <tr className="border-t-2 border-ink/20 bg-ink/5 font-semibold">
            <td className="px-3 py-2">Total Cost</td>
            <td className="px-3 py-2">{results.greedy?.totalCost ?? '-'}</td>
            <td className="px-3 py-2">{results.dp?.totalCost ?? '-'}</td>
            <td className="px-3 py-2">{results.backtrack?.totalCost ?? '-'}</td>
          </tr>
          <tr className="border-t border-ink/10 font-semibold">
            <td className="px-3 py-2">Total Pollution</td>
            {['greedy', 'dp', 'backtrack'].map((k) => {
              const value = results[k]?.totalPollution;
              const min = Math.min(...['greedy', 'dp', 'backtrack'].map((x) => results[x]?.totalPollution ?? Number.MAX_SAFE_INTEGER));
              return (
                <td key={k} className={`px-3 py-2 ${value === min ? 'bg-green/10 text-green' : ''}`}>
                  {value ?? '-'}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompareTab;
