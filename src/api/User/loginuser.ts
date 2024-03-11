import { useMutation } from "@tanstack/react-query";
import main from "../main";
import { LoginUser as LoginUserType } from "@/types/LoginUserType";
import { toast } from "react-toastify";



export default function LoginUser() {
	const {
		mutate: mutateUseLoginUser,
		data: response,

		isSuccess,
	} = useMutation({
		mutationFn: (data: LoginUserType) => {
			const loginUser = data;

			return main.post(`user/login`, loginUser);
		},
		onError: () => toast.error("Gagal Login"),
		onSuccess: () => toast.success("Sukses Login"),
	});
	return { mutateUseLoginUser, response, isSuccess };
}

// export const SignUpUser = async ({
// 	nrp,
// 	nama,
// 	email,
// 	password,
// }: {
// 	nrp: string;
// 	nama: string;
// 	email: string;
// 	password: string;
// }): Promise<UserResponse> => {
// 	try {
// 		const response = await axios.post(
// 			`${baseURL}/user`,
// 			{
// 				username: nrp,
// 				name: nama,
// 				email,
// 				password,
// 				language: "en",
// 			},
// 			{
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 			}
// 		);
// 		console.log(response.data);
// 		return response.data;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// export const GetCurrentUser = async (): Promise<UserResponse> => {
// 	try {
// 		const response = await axios.get(`${baseURL}/user`, {
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${token}`,
// 			},
// 		});
// 		console.log(response.data);
// 		return response.data;
// 	} catch (error) {
// 		throw error;
// 	}
// };
