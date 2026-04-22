import axios from 'axios';

const api = axios.create({
  baseURL: 'https://crop-stubble-burning-scheduler-2.onrender.com/api/schedule',
  timeout: 15000,
});

export const runGreedy = (payload) => api.post('/greedy', payload);
export const runDp = (payload) => api.post('/dp', payload);
export const runBacktrack = (payload) => api.post('/backtrack', payload);
export const runAll = (payload) => api.post('/all', payload);
