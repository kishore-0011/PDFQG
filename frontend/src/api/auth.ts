import api from './axios';

export const register = (data: {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}) => api.post('/auth/register', data);

export const login = (data: {
  email: string;
  password: string;
}) => api.post('/auth/login', data);

export const sendResetCode = (email: string) =>
  api.post('/auth/send-code', { email, type: 'reset' });

export const resetPassword = (data: {
  email: string;
  code: string;
  newPassword: string;
}) => api.post('/auth/reset-password', data);

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout'); // adjust endpoint as needed
};
