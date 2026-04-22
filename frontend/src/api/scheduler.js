import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/schedule',
  timeout: 15000,
});

export const runGreedy = (payload) => api.post('/greedy', payload);
export const runDp = (payload) => api.post('/dp', payload);
export const runBacktrack = (payload) => api.post('/backtrack', payload);
export const runAll = (payload) => api.post('/all', payload);
