import axios from "axios";

const apiRequest = axios.create({
	baseURL: "http://127.0.0.1:8800/api",
	withCredentials: true,
	method: "post"
});

export default apiRequest;
