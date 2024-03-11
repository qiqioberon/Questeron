import { useMutation } from "@tanstack/react-query";
import main from "@/api/main";
import { toast } from "react-toastify";

export default function DeleteAttachment() {
    const { mutate: mutateDeleteAttachment, error } = useMutation({
        mutationFn: (data: { idTask: string; idAttachment: string }) => {
            const { idTask, idAttachment } = data;
            return main.delete(`task/${idTask}/attachment/${idAttachment}`);
        },
        onError: () => toast.error("Gagal delete Attachment"),
        onSuccess: () => toast.success("Sukses delete Attachment"),
    });
    return { mutateDeleteAttachment, error };
}
