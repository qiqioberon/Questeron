import { useMutation, MutationFunction } from "@tanstack/react-query";
import main from "../main";
import { SignUp as SignUpForm } from "@/types/SignUpForm";
import { toast } from "react-toastify";

export default function SignUpUser() {
	const {
		mutate: mutateSignUp,
		data: responseSignUp,
		isSuccess,
		error,
	} = useMutation({
		mutationFn: (data: SignUpForm) => {
			const SignUpUser = data;
			return main.post(`user`, SignUpUser);
		},
		onError: (error: any) => toast.error(getErrorMessage(error)),
		onSuccess: () => toast.success("Sukses Sign Up"),
	});

	return { mutateSignUp, responseSignUp, isSuccess, error };
}

function getErrorMessage(error: any) {
	let resultMessage = "";
	if (error) {
		console.log(error.request);
		const responseJson = JSON.parse(error.request.response);
		console.log(responseJson.resultMessage.en);

		resultMessage = responseJson.resultMessage.en.toString();
	}
	return resultMessage;
}
