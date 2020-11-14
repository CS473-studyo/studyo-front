import baseURL from "../baseURL";
import axios from "axios";

const course = axios.create({ baseURL: `${baseURL}/course` });

export const get = id => course.get(`/${id}`);
