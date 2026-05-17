import { createApiClient } from './client';

const authApi = createApiClient('/api/auth');

export const checkEmail = (email) => authApi.get('/email-check', { params: { email } });
export const loginUser = (payload) => authApi.post('/login', payload);
export const signupUser = (payload) => authApi.post('/signup', payload);