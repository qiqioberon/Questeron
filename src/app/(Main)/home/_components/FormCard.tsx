import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm, SubmitHandler, set } from "react-hook-form";
import CreateTask from "@/api/Task/createTask";
import { AllTasks, Task } from "@/types/Tasks";
type NewCard = { title: string };

export default function FormCard({
	setTasks,
	status,
}: {
	setTasks: React.Dispatch<React.SetStateAction<any>>;
	status: string;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const { mutateCreateTask, responseCreateTask, error } = CreateTask();
	const methods = useForm<NewCard>();
	const { reset, handleSubmit, register } = methods;
	const submitHandler: SubmitHandler<NewCard> = async (data) => {
		console.log("Formulir diserahkan:", data);
		reset();
		setIsEditing(false);
		const sendData = {
			title: data.title,
			status: status,
		};
		await mutateCreateTask(sendData);
	};

	if (error) {
		console.log(error);
	}

	useEffect(() => {
		if (responseCreateTask && responseCreateTask.data.data) {
			const currentTask = responseCreateTask.data.data.task;
			setTasks((prevTasks: any) => [
				...prevTasks,
				{
					_id: currentTask._id,
					title: currentTask.title,
					description: "",
					tags: [],
					dueDate: "",
					checklists: [],
					attachments: [],
					status: status,
					createdAt: "",
					updatedAt: "",
					__v: 0,
					deletedAt: "",
				},
			]);
		}
	}, [responseCreateTask]);

	if (isEditing) {
		return (
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(submitHandler)}
					className="m-1 py-0.5 px-1 space-y-4"
				>
					<textarea
						{...register("title")}
						id="title"
						placeholder="Enter a title for this card..."
						className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"
					/>
					<div className="flex items-center gap-x-2">
						<button
							type="submit"
							className="p-2 px-4 rounded-md bg-gray-950 text-gray-300 font-semibold shadow-lg overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-white hover:before:w-full"
						>
							Add card
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className=" px-3 rounded-md p-2 font-semibold overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-black/15 hover:before:w-full"
						>
							X
						</button>
					</div>
				</form>
			</FormProvider>
		);
	} else {
		return (
			<button
				onClick={() => setIsEditing(true)}
				className="w-full rounded-md  bg-[#f1f2f4] hover:bg-black/15 transition p-3 flex items-center font-medium text-sm"
			>
				<Plus className="h-4 w-4 mr-2" />
				Add a list
			</button>
		);
	}
}
