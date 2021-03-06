import axios from 'axios';

const auth_Keyword = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/keyword`,
  withCredentials: true,
});

export const add = ({ lectureId, word }) =>
  auth_Keyword.post(`/${lectureId}`, { word });

export const dropVote = () => auth_Keyword.delete(`/`);

export const getList = (lectureid) => auth_Keyword.get(`/${lectureid}`);

export const vote = (keywordId) => auth_Keyword.post(`/vote/${keywordId}`);

export const cancel = (keywordId) =>
  auth_Keyword.post(`/cancel/${keywordId}`);

export const getUserList = (lectureid) =>
  auth_Keyword.get(`/user/${lectureid}`);
