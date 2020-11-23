import axios from 'axios';

const auth = axios.create({
  baseURL: `${process.env.BASE_URL}/user`,
  withCredentials: true,
});

export const register = ({ name, email, password }) =>
  auth.post(`/register`, { name, email, password });

export const login = ({ email, password }) =>
  auth.post(`/login`, { email, password });

export const check = () => auth.get(`/check`);

export const logout = () => auth.get(`/logout`);
