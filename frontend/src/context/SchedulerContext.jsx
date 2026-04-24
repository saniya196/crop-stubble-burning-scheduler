import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { runAll, runBacktrack, runDp, runGreedy } from '../api/scheduler';

const SchedulerContext = createContext();

const sampleFarms = [
  { id: 'F-01', harvestDay: 1, deadline: 4 },
  { id: 'F-02', harvestDay: 2, deadline: 9 },
  { id: 'F-03', harvestDay: 3, deadline: 6 },
  { id: 'F-04', harvestDay: 5, deadline: 12 },
  { id: 'F-05', harvestDay: 7, deadline: 15 },
  { id: 'F-06', harvestDay: 8, deadline: 11 },
  { id: 'F-07', harvestDay: 10, deadline: 20 },
  { id: 'F-08', harvestDay: 12, deadline: 14 },
];

const riskLevel = (farm) => {
  const window = Math.max(0, Number(farm.deadline) - Number(farm.harvestDay));
  if (window <= 3) return 'HIGH';
  if (window <= 7) return 'MED';
  return 'LOW';
};

export const SchedulerProvider = ({ children }) => {
  const [farms, setFarms] = useState(sampleFarms);
  const [budget, setBudget] = useState(15000);
  const [results, setResults] = useState({ greedy: null, dp: null, backtrack: null });
  const [lastRun, setLastRun] = useState('None');
  const [loading, setLoading] = useState({ greedy: false, dp: false, backtrack: false, all: false });
  const [error, setError] = useState('');
  const [budgetError, setBudgetError] = useState('');

  // Validate and set budget
  const setBudgetWithValidation = (value) => {
    const numValue = Number(value);
    if (value === '' || value === null) {
      setBudgetError('Budget cannot be empty');
      return false;
    }
    if (isNaN(numValue)) {
      setBudgetError('Budget must be a valid number');
      return false;
    }
    if (numValue <= 0) {
      setBudgetError('Budget must be a positive number');
      return false;
    }
    setBudget(numValue);
    setBudgetError('');
    return true;
  };

  const payload = useMemo(() => ({ farms, budget: Number(budget) || 0 }), [farms, budget]);

  // Auto-run algorithms when budget or farms change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const autoRun = async () => {
        setError('');
        setLoading((prev) => ({ ...prev, all: true }));
        try {
          console.log('Auto-running with payload:', payload);
          const response = await runAll(payload);
          console.log('Auto-run response:', response.data);
          setResults({
            greedy: response.data.greedy,
            dp: response.data.dp,
            backtrack: response.data.backtrack,
          });
          setLastRun(response.data.bestAlgorithm || 'ALL');
        } catch (err) {
          const message = err?.response?.data?.message || err.message || 'Failed to auto-run solvers';
          console.error('Auto-run error:', message);
          setError(message);
        } finally {
          setLoading((prev) => ({ ...prev, all: false }));
        }
      };

      autoRun();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [payload]);

  const runOne = async (algorithm) => {
    setError('');
    setLoading((prev) => ({ ...prev, [algorithm]: true }));
    try {
      const callMap = { greedy: runGreedy, dp: runDp, backtrack: runBacktrack };
      const response = await callMap[algorithm](payload);
      setResults((prev) => ({ ...prev, [algorithm]: response.data }));
      setLastRun(algorithm.toUpperCase());
      return response.data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Failed to run solver';
      setError(message);
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, [algorithm]: false }));
    }
  };

  const runAllAlgorithms = async () => {
    setError('');
    setLoading((prev) => ({ ...prev, all: true }));
    try {
      const response = await runAll(payload);
      setResults({
        greedy: response.data.greedy,
        dp: response.data.dp,
        backtrack: response.data.backtrack,
      });
      setLastRun(response.data.bestAlgorithm || 'ALL');
      return response.data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Failed to run all solvers';
      setError(message);
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, all: false }));
    }
  };

  const addFarm = () => {
    const next = farms.length + 1;
    const id = `F-${String(next).padStart(2, '0')}`;
    setFarms((prev) => [...prev, { id, harvestDay: 1, deadline: 5 }]);
  };

  const removeFarm = (index) => {
    setFarms((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFarm = (index, key, value) => {
    setFarms((prev) =>
      prev.map((farm, i) =>
        i === index ? { ...farm, [key]: key === 'id' ? value : Number(value) } : farm
      )
    );
  };

  const value = {
    farms,
    setFarms,
    budget,
    setBudget,
    setBudgetWithValidation,
    budgetError,
    setBudgetError,
    results,
    lastRun,
    loading,
    error,
    riskLevel,
    runOne,
    runAllAlgorithms,
    addFarm,
    removeFarm,
    updateFarm,
  };

  return (
    <SchedulerContext.Provider value={value}>
      {children}
    </SchedulerContext.Provider>
  );
};

export const useScheduler = () => {
  const context = useContext(SchedulerContext);
  if (!context) {
    throw new Error('useScheduler must be used within a SchedulerProvider');
  }
  return context;
};
