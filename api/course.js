import axios from 'axios';

const course = axios.create({
  baseURL: `${process.env.BASE_URL}/course`,
  withCredentials: true,
});

export const list = (id) => course.post(`/list`);
