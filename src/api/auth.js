import axios from "axios";

export const registerUser = (newUser) => axios.post('http://127.0.0.1:8000/api/register', newUser);

