import axios from 'axios';

const lecture = axios.create({
  baseURL: `${process.env.BASE_URL}/lecture`,
  withCredentials: true,
});

export const courseLectures = (course) => lecture.get(`/${course}`);
// export const check = () => auth.get(`/check`);
// export const logout = () => auth.get(`/logout`);
