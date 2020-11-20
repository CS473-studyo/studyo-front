import axios from 'axios';

const auth = axios.create({
  baseURL: `http://localhost:8080/user`,
  withCredentials: true,
});

export const login = ({ email, password }) =>
  auth.post(`/login`, { email, password });
// export const check = () => auth.get(`/check`);
// export const logout = () => auth.get(`/logout`);
