import axios from 'axios';

const auth_Question = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/question`,
  withCredentials: true,
});
// export const courseLectures = (course) => lecture.get(`/${course}`);
export const post = (lectureId, title, content) =>
  auth_Question.post(`/${lectureId}`, { title, content });

export const list = () => auth_Question.get(`/user`);

export const quizList = (lectureId) => auth_Question.get(`/${lectureId}`);

export const question = (questionId) =>
  auth_Question.get(`/id/${questionId}`);
