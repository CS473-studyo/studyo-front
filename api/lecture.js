import axios from 'axios';

const auth = axios.create({
  baseURL: `${process.env.BASE_URL}/lecture`,
  withCredentials: true,
});

export const show = (course) => auth.post(`/show/${course}`);
// export const check = () => auth.get(`/check`);
// export const logout = () => auth.get(`/logout`);
