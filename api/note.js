import axios from 'axios';

const note = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/note`,
  withCredentials: true,
});

export const upload = (LectureId, file) =>
  note.post(`/${LectureId}`, file);

export const comment = (LectureId, page, text) =>
  note.post(`/text/${LectureId}`, { page, text });

export const userLectureNotes = (LectureId, page) =>
  note.get(`/user/${LectureId}/${page}`);

export const otherLectureNotes = (LectureId, page) =>
  note.get(`/other/${LectureId}/${page}`);

export const clap = (LectureId, UserId, page) =>
  note.post(`/clap`, { LectureId, UserId, page });

export const getClap = (LectureId, UserId, page) =>
  note.get(`/clap/${LectureId}/${UserId}/${page}`);
