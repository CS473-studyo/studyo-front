import axios from 'axios';

const note = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/note`,
  withCredentials: true,
});

export const upload = (lectureId, file) =>
  note.post(`/${lectureId}`, file);

export const lectureNotes = (lectureId) => note.get(`/${lectureId}`);

export const clap = (noteId) => note.post(`/clap/${noteId}`);

export const getClap = (noteId) => note.get(`/clap/${noteId}`);
