import axios from 'axios';

// Use environment variable or default to local backend in development
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/schedule';

const api = axios.create({
  baseURL,
  timeout: 15000,
});

export const runGreedy = (payload) => api.post('/greedy', payload);
export const runDp = (payload) => api.post('/dp', payload);
export const runBacktrack = (payload) => api.post('/backtrack', payload);
export const runAll = (payload) => api.post('/all', payload);
