import EditTaskTags from "@/api/Task/UpdateTaskTags";
import GetTaskData from "@/api/Task/getTask";
import { Plus, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";

interface ChangeLabel {
	tags: string;
}

export default function FormLabel({
	label,
	id,
	setNewLabel,
	setData,
}: {
	label: string[];
	id: string;
	setNewLabel: React.Dispatch<React.SetStateAction<any>>;
	setData: React.Dispatch<React.SetStateAction<any>>;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const methods = useForm<ChangeLabel>();
	const { register, handleSubmit, reset } = methods;
	const { mutateTags } = EditTaskTags();
	const submitHandler: SubmitHandler<ChangeLabel> = async (data) => {
		setIsEditing(false);
		reset();
		console.log("Formulir diserahkan:", data);
		const AllLabel = [...label, data.tags];
		const newAllLabel = {
			tags: AllLabel,
			idTask: id,
		};
		setData((prev: any) => ({
			...prev,
			tags: AllLabel,
		}));
		setNewLabel(AllLabel);
		await mutateTags(newAllLabel);
	};

	return (
		<>
			{isEditing ? (
				<FormProvider {...methods}>
					<form
						onSubmit={handleSubmit(submitHandler)}
						className="m-1 mx-16 py-3 px-4 space-y-4 bg-black/35 rounded-lg fixed right-64"
					>
						<h1 className="font-extrabold text-lg text-white">New Label</h1>
						<input
							{...register("tags")}
							id="tags"
							placeholder="Enter tags"
							className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"
						/>
						<div className="flex items-center gap-x-2">
							<button
								type="submit"
								className="p-2 px-4 rounded-md bg-gray-950 text-gray-300 font-semibold shadow-lg overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-white hover:before:w-full"
							>
								Add Label
							</button>
							<button
								onClick={() => setIsEditing(false)}
								className="px-3 rounded-md p-2 font-semibold overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-black/15 hover:before:w-full"
							>
								<XCircle />
							</button>
						</div>
					</form>
				</FormProvider>
			) : (
				<button
					onClick={() => setIsEditing(true)}
					className="w-fit rounded-md bg-[#f1f2f4] hover:bg-black/15 transition p-3 flex items-center "
				>
					<Plus className="h-4 w-4" />
				</button>
			)}
		</>
	);
}
