import { useMemo, useState } from 'react';
import { runAll, runBacktrack, runDp, runGreedy } from '../api/scheduler';

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

export const useScheduler = () => {
  const [farms, setFarms] = useState(sampleFarms);
  const [budget, setBudget] = useState(15000);
  const [results, setResults] = useState({ greedy: null, dp: null, backtrack: null });
  const [lastRun, setLastRun] = useState('None');
  const [loading, setLoading] = useState({ greedy: false, dp: false, backtrack: false, all: false });
  const [error, setError] = useState('');

  const payload = useMemo(() => ({ farms, budget: Number(budget) || 0 }), [farms, budget]);

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

  return {
    farms,
    budget,
    setBudget,
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
    setFarms,
  };
};
