import { useMutation } from "@tanstack/react-query";
import main from "@/api/main";
import { toast } from "react-toastify";

export default function CreateTask() {
	const {
		mutate: mutateCreateTask,
		error,
		data: responseCreateTask,
		isPending,
	} = useMutation({
		mutationFn: (data: { title: string; status: string }) => {
			const { title, status } = data;
			return main.post(`task`, {
				title,
				status,
			});
		},
		onError: () => toast.error("Gagal Create Task"),
		onSuccess: () => toast.success("Sukses Create Task"),
	});
	return { mutateCreateTask, error, responseCreateTask, isPending };
}

// export const CreateTask = async (judul) => {
//     try {
//         const response = await fetch(`${baseURL}/task`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//                 title: judul,
//             })
//         });
//         const data = await response.json();
//         console.log(data);
//         return data;

//     } catch (error) {
//         throw error;
//     }
// }
