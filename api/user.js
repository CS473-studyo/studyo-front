import axios from 'axios';

const auth = axios.create({
  baseURL: `http://localhost:8080/user`,
  withCredentials: true,
});

export const login = ({ email, password }) =>
  auth.post(`/login`, { email, password });
// export const check = () => auth.get(`/check`);
// export const logout = () => auth.get(`/logout`);

const auth_Keyword = axios.create({
  baseURL: `http://localhost:8080/word`,
  withCredentials: true,
});

export const save = ({ user, course, lecture, content }) =>
  auth_Keyword.post(`/`, { user, course, lecture, content });

export const getList = ({ course, lecture }) =>
  auth_Keyword.post(`/list`, { course, lecture });
  
export const vote = ( keywordId ) =>
auth_Keyword.post(`/join/${keywordId}`);