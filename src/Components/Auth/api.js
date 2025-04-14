import axios from "axios";
const api =  axios.create({
    baseURL:"https://testing-9-j4r9.onrender.com/auth"
})

export const googleAuth = (code) => api.get(`./google?code=${code}`)