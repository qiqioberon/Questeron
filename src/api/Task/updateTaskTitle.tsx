import { useMutation } from "@tanstack/react-query";
import main from "../main";
import { toast } from "react-toastify";

export default function LoginUser() {
	const { mutate: mutateUseLoginUser } = useMutation({
		mutationFn: (data: { title: string; idTask: string }) => {
			const { title, idTask } = data;
			return main.put(`task/${idTask}`, { title });
		},
		onError: () => toast.error("Gagal Update Title"),
		onSuccess: () => toast.success("Sukses Update Title"),
	});
	return { mutateUseLoginUser };
}
