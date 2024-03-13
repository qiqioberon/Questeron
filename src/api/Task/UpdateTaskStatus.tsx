import { useMutation } from "@tanstack/react-query";
import main from "../main";
import { toast } from "react-toastify";

export default function EditTaskStatus() {
	const { mutate: mutateStatusTask, error } = useMutation({
		mutationFn: (data: { status: string; idTask: string }) => {
			const { status, idTask } = data;
			return main.put(`task/${idTask}`, { status });
		},
		onError: () => toast.error("Gagal Update Status Task"),
		onSuccess: () => toast.success("Sukses Update Status Task"),
	});
	return { mutateStatusTask, error };
}
