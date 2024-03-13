import axios from "axios";
import useUserStore from "@/store/userStore";

export const baseURL = process.env.API_URL;

const main = axios.create({
	baseURL: "https://oprec-api.labse.in/api",
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: false,
});

main.interceptors.request.use((config) => {
	const accessToken =
		useUserStore.getState().accessToken || localStorage.getItem("accessToken");
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});
export default main;
