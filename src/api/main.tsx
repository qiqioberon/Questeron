import axios from "axios";

export const baseURL = process.env.API_URL;

export const main = axios.create({
	baseURL: "https://oprec-api.labse.in/api",
	headers: {
		"Content-Type": "application/json",
	},

	withCredentials: false,
});

main.defaults.headers.common[
	"Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ4MDdlMjJhYmNjOTBhNGM2N2IzY2EiLCJpYXQiOjE3MDg2NTc3NzcsImV4cCI6MTcxMTI0OTc3N30.tjc17lT_dQhivAMjF_YrGEhxwy5lRB-pGh_LeVRh5fo`;

export default main;