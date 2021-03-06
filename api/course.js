import axios from 'axios';

const course = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/course`,
  withCredentials: true,
});

export const userCourses = () => course.get(`/`);
export const newCourses = () => course.get(`/new`);
export const courseInfo = (courseId) => course.get(`/${courseId}`);
export const courseLectures = (code) => course.get(`/lectures/${code}`);
export const join = (courseId) => course.post(`/join/${courseId}`);
