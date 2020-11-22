import axios from 'axios';

const note = axios.create({
  baseURL: `${process.env.BASE_URL}/note`,
  withCredentials: true,
});

export const upload = (lectureId, file) =>
  note.post(`/${lectureId}`, file);
