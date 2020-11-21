import axios from 'axios';

const auth_Keyword = axios.create({
  baseURL: `${process.env.BASE_URL}/word`,
  withCredentials: true,
});

export const save = ({ user, course, lecture, content }) =>
  auth_Keyword.post(`/`, { user, course, lecture, content });

export const getList = ({ course, lecture }) =>
  auth_Keyword.post(`/list`, { course, lecture });

export const vote = (keywordId) => auth_Keyword.post(`/join/${keywordId}`);
