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

export const vote = (keywordId) => auth_Keyword.post(`/join/${keywordId}`);

const auth_Answer = axios.create({
  baseURL: `http://localhost:8080/answering`,
  withCredentials: true,
});

export const answering = ({ question, user, content }) =>
  auth_Answer.post(`/`, { question, user, content });

export const others = ({ id }) => auth_Answer.post(`/others`, { id });

export const myanswer = ({ id, userId }) =>
  auth_Answer.post(`/myanswer`, { id, userId });

export const like = (answerId) => auth_Answer.post(`/join/${answerId}`);

export const clap = (id, user) => auth_Answer.post('/clap', { id, user });
