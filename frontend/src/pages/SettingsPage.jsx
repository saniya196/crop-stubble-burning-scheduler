import { useRef, useState } from 'react';
import { useScheduler } from '../hooks/useScheduler';
import { useToast } from '../context/ToastContext';

export default function SettingsPage() {
  const {
    farms,
    budget,
    setBudgetWithValidation,
    budgetError,
    setBudgetError,
    riskLevel,
    loading,
    addFarm,
    removeFarm,
    updateFarm,
    setFarms,
  } = useScheduler();

  const { addToast } = useToast();
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});

  const validateFarm = (farm) => {
    const errs = {};
    if (!farm.id.trim()) errs.id = 'Farm ID is required';
    if (farm.harvestDay < 0 || isNaN(farm.harvestDay)) errs.harvest = 'Harvest day must be positive';
    if (farm.deadline < 0 || isNaN(farm.deadline)) errs.deadline = 'Deadline must be positive';
    if (farm.deadline <= farm.harvestDay) errs.deadline = 'Deadline must be after harvest day';
    return errs;
  };

  const handleBudgetChange = (value) => {
    const isValid = setBudgetWithValidation(value);
    if (isValid) {
      addToast(`Budget updated to ₹${Number(value).toLocaleString()}`, 'success');
    }
  };

  const exportConfig = () => {
    try {
      const data = JSON.stringify({ farms, budget }, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `stubblesched-config-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      addToast('Configuration exported successfully', 'success');
    } catch (err) {
      addToast('Failed to export configuration', 'error');
    }
  };

  const importConfig = () => fileInputRef.current?.click();

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (!Array.isArray(data.farms)) throw new Error('Invalid farms data');
        if (typeof data.budget !== 'number') throw new Error('Invalid budget');
        setFarms(data.farms);
        setBudgetWithValidation(data.budget);
        addToast(`Loaded ${data.farms.length} farms with budget ₹${data.budget.toLocaleString()}`, 'success');
      } catch (err) {
        addToast(`Invalid configuration file: ${err.message}`, 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleAddFarm = () => {
    addFarm();
    addToast('New farm added', 'success');
  };

  const handleRemoveFarm = (idx) => {
    const farmId = farms[idx].id;
    removeFarm(idx);
    addToast(`Farm ${farmId} removed`, 'success');
  };

  const handleResetDefaults = () => {
    const defaultFarms = [
      { id: 'F-01', harvestDay: 1, deadline: 4 },
      { id: 'F-02', harvestDay: 2, deadline: 9 },
      { id: 'F-03', harvestDay: 3, deadline: 6 },
      { id: 'F-04', harvestDay: 5, deadline: 12 },
      { id: 'F-05', harvestDay: 7, deadline: 15 },
      { id: 'F-06', harvestDay: 8, deadline: 11 },
      { id: 'F-07', harvestDay: 10, deadline: 20 },
      { id: 'F-08', harvestDay: 12, deadline: 18 },
    ];
    setFarms(defaultFarms);
    setBudgetWithValidation(15000);
    setBudgetError('');
    addToast('Reset to default configuration', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">⚙️ Settings & Configuration</h1>
        <p className="text-gray-500">Manage farms, budget, and optimize your scheduling strategy</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Farm Management */}
        <div className="lg:col-span-2 rounded-xl border border-ink/10 bg-surface p-6 shadow-soft">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">🚜 Farm Management</h2>
            <span className="text-sm bg-green/20 text-green px-3 py-1 rounded-full font-semibold">{farms.length} farms</span>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto mb-4 border border-gray-200 rounded-lg p-3 bg-gray-50">
            {farms.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No farms added yet. Click "Add Farm" to get started.</p>
            ) : (
              farms.map((farm, idx) => {
                const farmErrors = validateFarm(farm);
                return (
                  <div key={idx} className={`flex gap-2 items-center p-3 bg-white rounded-lg border-2 transition ${
                    Object.keys(farmErrors).length > 0 ? 'border-red/30 bg-red/5' : 'border-gray-200 hover:border-green/50'
                  }`}>
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={farm.id}
                            onChange={(e) => updateFarm(idx, 'id', e.target.value)}
                            className="w-full px-2 py-1 border rounded font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-green"
                            placeholder="Farm ID"
                          />
                          {farmErrors.id && <p className="text-red text-xs">{farmErrors.id}</p>}
                        </div>
                        <div className="flex gap-1">
                          <div>
                            <input
                              type="number"
                              value={farm.harvestDay}
                              onChange={(e) => updateFarm(idx, 'harvestDay', parseInt(e.target.value) || 0)}
                              className="w-16 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green"
                              placeholder="H"
                              title="Harvest Day"
                            />
                            {farmErrors.harvest && <p className="text-red text-xs">Invalid</p>}
                          </div>
                          <div>
                            <input
                              type="number"
                              value={farm.deadline}
                              onChange={(e) => updateFarm(idx, 'deadline', parseInt(e.target.value) || 0)}
                              className="w-16 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green"
                              placeholder="D"
                              title="Deadline"
                            />
                            {farmErrors.deadline && <p className="text-red text-xs">Invalid</p>}
                          </div>
                        </div>
                      </div>
                      {farmErrors.deadline && <p className="text-red text-xs ml-2">{farmErrors.deadline}</p>}
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${
                      riskLevel(farm) === 'HIGH' ? 'bg-red/20 text-red' :
                      riskLevel(farm) === 'MED' ? 'bg-amber/20 text-amber' :
                      'bg-green/20 text-green'
                    }`}>
                      {riskLevel(farm)}
                    </span>
                    <button
                      onClick={() => handleRemoveFarm(idx)}
                      className="px-3 py-1 bg-red/10 text-red rounded hover:bg-red/20 transition font-semibold text-sm border border-red/30"
                      title="Remove farm"
                    >
                      ✕
                    </button>
                  </div>
                );
              })
            )}
          </div>

          <button
            onClick={handleAddFarm}
            className="w-full px-4 py-3 bg-green text-white rounded-lg font-semibold hover:bg-green/90 transition border-2 border-green hover:border-green/70 text-lg"
          >
            ➕ Add New Farm
          </button>
        </div>

        {/* Budget & Config */}
        <div className="space-y-4">
          <div className="rounded-xl border border-ink/10 bg-surface p-6 shadow-soft">
            <h2 className="text-xl font-semibold mb-4">💰 Budget</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 font-semibold block mb-2">Available Budget (₹)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => handleBudgetChange(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    budgetError ? 'border-red/50 bg-red/5 focus:ring-red/30' : 'border-gray-300 focus:ring-green/30'
                  }`}
                  placeholder="0"
                  min="0"
                />
              </div>
              {budgetError && (
                <p className="text-red text-sm font-semibold">✕ {budgetError}</p>
              )}
              {!budgetError && budget > 0 && (
                <p className="text-green text-sm font-semibold">✓ Budget valid</p>
              )}
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Current Budget</p>
              <p className="text-3xl font-bold text-green">₹{budget.toLocaleString()}</p>
            </div>
          </div>

          <div className="rounded-xl border border-ink/10 bg-surface p-6 shadow-soft">
            <h2 className="text-xl font-semibold mb-4">📥 Configuration</h2>
            <div className="space-y-2">
              <button
                onClick={exportConfig}
                className="w-full px-4 py-2 bg-blue text-white rounded-lg font-semibold hover:bg-blue/90 transition"
                title="Download current configuration as JSON"
              >
                📥 Export Config
              </button>
              <button
                onClick={importConfig}
                className="w-full px-4 py-2 bg-blue text-white rounded-lg font-semibold hover:bg-blue/90 transition"
                title="Load configuration from file"
              >
                📤 Import Config
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-3 text-center">Tip: Export and import your configuration anytime</p>
          </div>

          <div className="rounded-xl border border-ink/10 bg-surface p-6 shadow-soft">
            <h2 className="text-xl font-semibold mb-4">⚡ Quick Actions</h2>
            <button
              onClick={handleResetDefaults}
              className="w-full px-4 py-2 bg-amber text-white rounded-lg font-semibold hover:bg-amber/90 transition border border-amber/50"
              title="Reset to 8 default farms with ₹15,000 budget"
            >
              🔄 Reset to Defaults
            </button>
            <p className="text-xs text-gray-500 mt-3 text-center">Restores sample data for testing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
