import CreateChecklist from "@/api/Task/Checklist/createChecklist";
import { Plus, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";

interface NewChecklist {
	checklistItem: string;
	isDone: boolean;
	_id: string;
}

export default function FormCardChecklist({
	id,
	setData,
	setNewChecklist,
}: {
	id: string;
	setData: React.Dispatch<React.SetStateAction<any>>;
	setNewChecklist: React.Dispatch<React.SetStateAction<any>>;
}) {
	const [newData, setNewData] = useState<NewChecklist>({
		checklistItem: "",
		isDone: false,
		_id: "",
	});
	const { mutateCreateChecklist, responseCreateChecklist } = CreateChecklist();
	const [isEditing, setIsEditing] = useState(false);
	const methods = useForm<NewChecklist>();
	const { reset, handleSubmit, register } = methods;
	const submitHandler: SubmitHandler<NewChecklist> = async (data) => {
		const newData = { ...data, _id: "" };
		setNewData(newData);
		await mutateCreateChecklist({
			checklistItem: data.checklistItem,
			isDone: false,
			idTask: id,
		});
		reset();
	};

	useEffect(() => {
		if (responseCreateChecklist && responseCreateChecklist.data.data) {
			const currentTask = responseCreateChecklist.data.data.task;
			const newChecklistItem = currentTask.checklists.find(
				(checklist: NewChecklist) =>
					checklist.checklistItem === newData.checklistItem
			);
			if (newChecklistItem) {
				setData((prev: any) => ({
					...prev,
					checklists: [
						...prev.checklists,
						{
							checklistItem: newChecklistItem.checklistItem,
							isDone: newChecklistItem.isDone,
							_id: newChecklistItem._id,
						},
					],
				}));
				setNewChecklist((prevChecklist: any) => [
					...prevChecklist,
					{
						checklistItem: newChecklistItem.checklistItem,
						isDone: newChecklistItem.isDone,
						_id: newChecklistItem._id,
					},
				]);
			}
		}
	}, [responseCreateChecklist]);

	return (
		<>
			{isEditing ? (
				<FormProvider {...methods}>
					<form
						onSubmit={handleSubmit(submitHandler)}
						className="m-1 py-0.5 px-1 space-y-4"
					>
						<input
							autoFocus
							{...register("checklistItem")}
							id="checklistItem"
							placeholder="Enter a checklist title..."
							className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"
						/>
						<div className="flex items-center gap-x-2">
							<button
								type="submit"
								className="p-2 px-4 rounded-md bg-gray-950 text-gray-300 font-semibold shadow-lg overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-white hover:before:w-full"
							>
								Add List
							</button>
							<button
								onClick={() => setIsEditing(false)}
								className=" px-3 rounded-md p-2 font-semibold overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-black/15 hover:before:w-full"
							>
								<XCircle />
							</button>
						</div>
					</form>
				</FormProvider>
			) : (
				<button
					onClick={() => setIsEditing(true)}
					className="w-full rounded-md  bg-[#f1f2f4] hover:bg-black/15 transition p-3 flex items-center font-medium text-sm"
				>
					<Plus className="h-4 w-4 mr-2" />
					Add a list
				</button>
			)}
		</>
	);
}
