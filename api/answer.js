import axios from 'axios';

const auth_Answer = axios.create({
    baseURL: `http://localhost:8080/answering`,
    withCredentials: true,
  });
  
  export const answering = ({ question, user, content }) =>
    auth_Answer.post(`/`, { question, user, content });
  
  export const others = ( id ) =>
    auth_Answer.post(`/others`, { id });
  
  export const myanswer = ({ id, userId }) =>
    auth_Answer.post(`/myanswer`, { id, userId });
  
  export const like = ( answerId ) =>
    auth_Answer.post(`/join/${answerId}`);
  
  export const clap = ( id, user ) =>
    auth_Answer.post('/clap', { id, user });