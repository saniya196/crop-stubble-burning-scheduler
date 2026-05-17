import axios from 'axios';

const configuredApiUrl =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:8080'
    : 'https://crop-stubble-burning-scheduler-2.onrender.com');

const normalizedApiUrl = configuredApiUrl.replace(/\/+$/, '');

export const createApiClient = (pathSuffix) => {
  const baseURL = normalizedApiUrl.endsWith(pathSuffix)
    ? normalizedApiUrl
    : `${normalizedApiUrl}${pathSuffix}`;

  return axios.create({
    baseURL,
    timeout: 15000,
  });
};