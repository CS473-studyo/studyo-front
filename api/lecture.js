import axios from 'axios';

const lecture = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/lecture`,
  withCredentials: true,
});

export const lectureInfo = (lectureId) => lecture.get(`/${lectureId}`);
