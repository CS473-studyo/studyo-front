import axios from 'axios';

const auth = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
  withCredentials: true,
});

export const register = ({ name, email, password }) =>
  auth.post(`/register`, { name, email, password });

export const login = ({ email, password }) =>
  auth.post(`/login`, { email, password });

export const check = (options) => auth.get(`/check`, options);

export const logout = () => auth.get(`/logout`);

export const getTutorial = () => auth.get(`/tutorial`);
export const checkTutorial = () => auth.post(`/tutorial`);
