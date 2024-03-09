import { useMutation } from "@tanstack/react-query";
import main from "@/api/main";
import { toast } from "react-toastify";

export default function CreateChecklist() {
    const { mutate: mutateCreateChecklist, error, data: responseCreateChecklist, isPending } = useMutation({
        mutationFn: (data: { checklistItem: string, isDone: boolean, idTask: string }) => {
            const { checklistItem, isDone, idTask } = data;
            return main.post(`task/${idTask}/checklist`, [{
                checklistItem, isDone
            }]);
        },
        onError: () => toast.error("Gagal create Checklist"),
        onSuccess: () => toast.success("Sukses create Checklist"),
    });
    return { mutateCreateChecklist, error, responseCreateChecklist, isPending };
}


