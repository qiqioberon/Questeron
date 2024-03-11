import { useMutation } from "@tanstack/react-query";
import main from "../main";
import { toast } from "react-toastify";

export default function EditDescription() {
	const { mutate: mutateDesctiption, error } = useMutation({
		mutationFn: (data: { description: string; idTask: string }) => {
			const { description, idTask } = data;
			return main.put(`task/${idTask}`, { description });
		},
		onError: () => toast.error("Gagal Update Description"),
		onSuccess: () => toast.success("Sukses Update Description"),
	});
	return { mutateDesctiption, error };
}
