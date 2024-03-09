import { useMutation } from "@tanstack/react-query";
import main from "../main";
import { toast } from "react-toastify";

export default function EditTaskTags() {
	const { mutate: mutateTags, error } = useMutation({
		mutationFn: (data: { tags: string[]; idTask: string }) => {
			const { tags, idTask } = data;
			return main.put(`task/${idTask}`, { tags });
		},
		onError: () => toast.error("Gagal Update Tags"),
		onSuccess: () => toast.success("Sukses Update Tags"),
	});
	return { mutateTags, error };
}
