import { useMutation, MutationFunction } from "@tanstack/react-query";
import main from "../main";
import { SignUp as SignUpForm } from "@/types/SignUpForm";
import { toast } from "react-toastify";

export default function SignUpUser() {
	const {
		mutate: mutateSignUp,
		data: responseSignUp,
		isSuccess,
	} = useMutation({
		mutationFn: (data: SignUpForm) => {
			const SignUpUser = data;
			return main.post(`user`, SignUpUser);
		},
		onError: (error: Error) => toast.error(error.message.toString()),
		onSuccess: () => toast.success("Sukses Sign Up"),
	});

	return { mutateSignUp, responseSignUp, isSuccess };
}
