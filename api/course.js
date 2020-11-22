import axios from 'axios';

const course = axios.create({
  baseURL: `${process.env.BASE_URL}/course`,
  withCredentials: true,
});

export const userCourses = () => course.get(`/`);
export const courseInfo = (courseId) => course.get(`/${courseId}`);
export const join = (courseId) => course.post(`/join/${courseId}`);
