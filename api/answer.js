import axios from 'axios';

const answer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/answer`,
  withCredentials: true,
});

export const submit = (questionId, content) =>
  answer.post(`/${questionId}`, { content });

export const answers = (questionId) => answer.get(`/${questionId}`);

export const userAnswer = (questionId) =>
  answer.get(`/user/${questionId}`);

export const clap = (answerId) => answer.post(`/clap/${answerId}`);

export const getClap = (answerId) => answer.get(`/clap/${answerId}`);

export const approve = (answerId) => answer.post(`/select/${answerId}`);
