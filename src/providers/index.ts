import axios from "axios";

const API_USER = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_USER,
});


export default API_USER;
