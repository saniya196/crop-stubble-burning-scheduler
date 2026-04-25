import axios from 'axios';

const configuredApiUrl =
  import.meta.env.VITE_API_URL || 'https://crop-stubble-burning-scheduler-2.onrender.com';

const normalizedApiUrl = configuredApiUrl.replace(/\/+$/, '');
const baseURL = normalizedApiUrl.endsWith('/api/schedule')
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api/schedule`;

const api = axios.create({
  baseURL,
  timeout: 15000,
});

export const runGreedy = (payload) => api.post('/greedy', payload);
export const runDp = (payload) => api.post('/dp', payload);
export const runBacktrack = (payload) => api.post('/backtrack', payload);
export const runAll = (payload) => api.post('/all', payload);
