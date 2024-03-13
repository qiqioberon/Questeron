import { useMutation } from "@tanstack/react-query";
import main from "@/api/main";
import { toast } from "react-toastify";

export default function DeleteTask() {
	const { mutate: mutateDeleteTask, error } = useMutation({
		mutationFn: (idTask: string) => {
			return main.delete(`task/${idTask}`);
		},
		onError: () => toast.error("Gagal Delete Task"),
		onSuccess: () => toast.success("Sukses Delete Task"),
	});
	return { mutateDeleteTask, error };
}

// export const DeleteTask = async (id) => {
//     try {
//         const response = await fetch(`${baseURL}/task/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//         });
//         const data = await response.json();
//         console.log(data);
//         return data;
//         // Lakukan penanganan respons dari API di sini, seperti menangani token, pesan kesalahan, dll.
//     } catch (error) {
//         throw error;
//     }
// }
