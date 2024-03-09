import { useMutation } from "@tanstack/react-query";
import main from "@/api/main";
import { toast } from "react-toastify";

export default function deletedChecklist() {
	const { mutate: mutateDeleteChecklist, error } = useMutation({
		mutationFn: (data: { idTask: string; idChecklist: string }) => {
			const { idTask, idChecklist } = data;
			return main.delete(`task/${idTask}/checklist/${idChecklist}`);
		},
		onError: () => toast.error("Gagal delete Checklist"),
		onSuccess: () => toast.success("Sukses delete Checklist"),
	});
	return { mutateDeleteChecklist, error };
}
