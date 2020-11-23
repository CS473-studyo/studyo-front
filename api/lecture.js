import axios from 'axios';

const lecture = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/lecture`,
  withCredentials: true,
});

export const courseLectures = (course) => lecture.get(`/${course}`);

export const lectureInfo = (lectureId) =>
  lecture.get(`/info/${lectureId}`);
// export const check = () => auth.get(`/check`);
// export const logout = () => auth.get(`/logout`);
