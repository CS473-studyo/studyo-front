import axios from 'axios';

const auth_Question = axios.create({
    baseURL: `http://localhost:8080/question`,
    withCredentials: true,
  });

export const post = ({ title, detail, userid, lecture}) =>
    auth_Question.post(`/post`, { title, detail, userid, lecture });

export const list = ({ userid }) => //my Question
auth_Question.post(`/list`, { userid });

export const quizList = ({ lecture }) => //Lecture Quiz
auth_Question.post(`/quizList`, { lecture });
        