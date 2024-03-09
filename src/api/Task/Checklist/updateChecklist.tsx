import { useMutation } from "@tanstack/react-query";
import main from "@/api/main";
import { toast } from "react-toastify";

export default function updatedChecklist() {
	const { mutate: mutateChecklist, error } = useMutation({
		mutationFn: (data: {
			checklistItem: string;
			isDone: boolean;
			idTask: string;
			idChecklist: string;
		}) => {
			const { checklistItem, isDone, idTask, idChecklist } = data;
			return main.put(`task/${idTask}/checklist/${idChecklist}`, {
				checklistItem,
				isDone,
			});
		},
		onError: () => toast.error("Gagal Update Checklist"),
		onSuccess: () => toast.success("Sukses Update Checklist"),
	});
	return { mutateChecklist, error };
}
