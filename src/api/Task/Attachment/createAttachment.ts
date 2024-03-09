import { useMutation } from "@tanstack/react-query";
import main from "@/api/main";
import { toast } from "react-toastify";

export default function CreateAttachment() {
    const { mutate: mutateCreateAttachment, error, data: responseCreateAttachment, isPending } = useMutation({
        mutationFn: (data: { link: string, displayText: string, idTask: string }) => {
            const { link, displayText, idTask } = data;
            return main.post(`task/${idTask}/attachment`, [{
                link, displayText
            }]);
        },
        onError: () => toast.error("Gagal create Attachment"),
        onSuccess: () => toast.success("Sukses create Attachment"),
    });
    return { mutateCreateAttachment, error, responseCreateAttachment, isPending };
}


