const riskColor = {
  HIGH: 'bg-red/10 text-red border-red/30',
  MED: 'bg-amber/10 text-amber border-amber/30',
  LOW: 'bg-green/10 text-green border-green/30',
};

const Sidebar = ({
  farms,
  budget,
  setBudget,
  riskLevel,
  addFarm,
  removeFarm,
  updateFarm,
  runOne,
  loading,
  utilization,
}) => {
  return (
    <aside className="fixed bottom-10 left-0 top-16 w-full overflow-auto border-r border-ink/10 bg-surface px-4 py-4 scrollbar-thin md:w-[280px]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-sm font-bold">Farms</h2>
          <button onClick={addFarm} className="rounded-lg bg-green px-2 py-1 text-xs font-semibold text-white">
            + Add
          </button>
        </div>

        <div className="space-y-3">
          {farms.map((farm, index) => {
            const risk = riskLevel(farm);
            const avatar = risk === 'HIGH' ? 'bg-red' : risk === 'MED' ? 'bg-amber' : 'bg-green';
            return (
              <div key={`${farm.id}-${index}`} className="rounded-xl border border-ink/10 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${avatar}`} />
                    <input
                      value={farm.id}
                      onChange={(e) => updateFarm(index, 'id', e.target.value)}
                      className="w-20 rounded border border-ink/20 px-1 py-0.5 font-mono text-xs"
                    />
                  </div>
                  <button onClick={() => removeFarm(index)} className="text-xs text-red">
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  <label className="flex flex-col gap-1">
                    Harvest
                    <input
                      type="number"
                      value={farm.harvestDay}
                      onChange={(e) => updateFarm(index, 'harvestDay', e.target.value)}
                      className="rounded border border-ink/20 px-1 py-1"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Deadline
                    <input
                      type="number"
                      value={farm.deadline}
                      onChange={(e) => updateFarm(index, 'deadline', e.target.value)}
                      className="rounded border border-ink/20 px-1 py-1"
                    />
                  </label>
                </div>
                <div className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold ${riskColor[risk]}`}>
                  {risk} RISK
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-ink/10 p-3">
          <label className="mb-2 block font-heading text-xs font-bold">Budget</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full rounded-lg border border-ink/20 px-2 py-1.5 font-mono text-sm"
          />
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
            <div className="h-full bg-amber" style={{ width: `${Math.min(100, utilization)}%` }} />
          </div>
          <p className="mt-1 font-mono text-[10px] text-ink/60">Utilization: {utilization.toFixed(1)}%</p>
        </div>

        <div className="space-y-2">
          {[
            ['greedy', 'Run Greedy'],
            ['dp', 'Run DP'],
            ['backtrack', 'Run Backtrack'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => runOne(key)}
              disabled={loading[key]}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading[key] && <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />}
              {label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
