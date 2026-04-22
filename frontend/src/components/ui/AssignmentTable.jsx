const methodPill = (methodName) => {
  if (methodName === 'Burning') return 'bg-red/10 text-red border-red/30';
  if (methodName === 'Mulching') return 'bg-green/10 text-green border-green/30';
  if (methodName === 'Bio-decomposer') return 'bg-blue/10 text-blue border-blue/30';
  if (methodName === 'Manual Removal') return 'bg-amber/10 text-amber border-amber/30';
  return 'bg-ink/10 text-ink/60 border-ink/20';
};

const ecoPill = (grade) => {
  if (grade === 'A+') return 'bg-green/10 text-green border-green/30';
  if (grade === 'B') return 'bg-amber/10 text-amber border-amber/30';
  return 'bg-red/10 text-red border-red/30';
};

const AssignmentTable = ({ farms, assignments = [] }) => {
  const rows = farms.map((farm) => {
    const a = assignments.find((item) => item.farmId === farm.id) || {
      methodName: 'UNASSIGNED',
      days: 0,
      cost: 0,
      pollution: 0,
      ecoGrade: 'NA',
    };
    const window = Math.max(0, Number(farm.deadline) - Number(farm.harvestDay));
    return { farm, a, window };
  });

  return (
    <div className="overflow-auto rounded-2xl border border-ink/10 bg-surface shadow-soft">
      <table className="min-w-full text-left text-xs">
        <thead className="bg-ink/5 font-heading text-[11px] uppercase">
          <tr>
            {['Farm ID', 'Harvest', 'Deadline', 'Window', 'Method', 'Duration', 'Cost', 'Pollution', 'P-Level', 'Eco Grade'].map((h) => (
              <th key={h} className="px-3 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="font-mono">
          {rows.map(({ farm, a, window }) => (
            <tr key={farm.id} className="border-t border-ink/10">
              <td className="px-3 py-2">{farm.id}</td>
              <td className="px-3 py-2">{farm.harvestDay}</td>
              <td className="px-3 py-2">{farm.deadline}</td>
              <td className="px-3 py-2">{window}</td>
              <td className="px-3 py-2">
                <span className={`inline-flex rounded-full border px-2 py-0.5 ${methodPill(a.methodName)}`}>
                  {a.methodName === 'Burning' ? '🔥' : a.methodName === 'Mulching' ? '🌿' : a.methodName === 'Bio-decomposer' ? '🧪' : a.methodName === 'Manual Removal' ? '🔧' : '❔'} {a.methodName}
                </span>
              </td>
              <td className="px-3 py-2">{a.days}</td>
              <td className="px-3 py-2">{a.cost}</td>
              <td className="px-3 py-2">{a.pollution}</td>
              <td className="px-3 py-2">
                <div className="h-2 w-20 overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full bg-red" style={{ width: `${Math.min(100, a.pollution)}%` }} />
                </div>
              </td>
              <td className="px-3 py-2">
                <span className={`inline-flex rounded-full border px-2 py-0.5 ${ecoPill(a.ecoGrade)}`}>{a.ecoGrade}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;
