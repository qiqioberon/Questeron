import { useMutation } from "@tanstack/react-query";
import main from "@/api/main";
import { toast } from "react-toastify";

export default function UpdateAttachment() {
    const { mutate: mutateUpdateAttachment, isError, data: responseUpdateAttachment, isPending } = useMutation({
        mutationFn: (data: { link: string, displayText: string, idTask: string, idAttachment: string }) => {
            const { link, displayText, idTask, idAttachment } = data;
            return main.put(`task/${idTask}/attachment/${idAttachment}`, {
                link, displayText
            });
        },
        onError: () => toast.error("Gagal Update Attachment"),
        onSuccess: () => toast.success("Sukses Update Attachment"),
    });
    return { mutateUpdateAttachment, isError, responseUpdateAttachment, isPending };
}


