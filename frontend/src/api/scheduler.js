import { createApiClient } from './client';

const api = createApiClient('/api/schedule');

export const runGreedy = (payload) => api.post('/greedy', payload);
export const runDp = (payload) => api.post('/dp', payload);
export const runBacktrack = (payload) => api.post('/backtrack', payload);
export const runAll = (payload) => api.post('/all', payload);
