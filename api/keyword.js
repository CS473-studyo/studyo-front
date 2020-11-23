import axios from 'axios';

const auth_Keyword = axios.create({
  baseURL: `${process.env.BASE_URL}/keyword`,
  withCredentials: true,
});

export const add = ({ lectureId, word }) =>
  auth_Keyword.post(`/${lectureId}`, { word });

export const dropVote = () => auth_Keyword.get(`/dropVote`);

export const getList = (lectureid) => auth_Keyword.get(`/${lectureid}`);

export const vote = (keywordId) => auth_Keyword.post(`/vote/${keywordId}`);
