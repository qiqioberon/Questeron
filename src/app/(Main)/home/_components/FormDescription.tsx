import EditDescription from "@/api/Task/UpdateTaskDescription";
import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";

interface ChangeDescription {
	description: string;
}

export default function FormDescription({
	isEditing,
	setIsEditing,
	description,
	setData,
	id,
}: {
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	description: string;
	setData: React.Dispatch<React.SetStateAction<boolean>>;
	id: string;
}) {
	const methods = useForm<ChangeDescription>();
	const { register, handleSubmit, reset } = methods;
	const [newDescription, setNewDescription] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			await new Promise((resolve) => setTimeout(resolve, 100));
			setNewDescription(description);
		};

		fetchData();
	}, [description]);
	const { mutateDesctiption } = EditDescription();
	const submitHandler: SubmitHandler<ChangeDescription> = async (data) => {
		setIsEditing(false);
		reset();
		setNewDescription(data.description);
		setData((prev: any) => ({
			...prev,
			description: data.description,
		}));
		const editDes = {
			description: data.description,
			idTask: id,
		};
		await mutateDesctiption(editDes);
		console.log("Description submitted:", data);
	};

	return (
		<>
			{isEditing ? (
				<FormProvider {...methods}>
					<form
						onSubmit={handleSubmit(submitHandler)}
						className="m-1 py-0.5 px-1 space-y-4"
					>
						<textarea
							{...register("description")}
							id="description"
							placeholder="Enter a Description for this card..."
							defaultValue={description} // Menambahkan nilai default dari description
							className="font-['Montserrat'] font-medium w-96 h-56 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"
						/>
						<div className="flex items-center gap-x-2">
							<button
								type="submit"
								className="font-['Montserrat'] p-2 px-4 rounded-md bg-gray-950 text-gray-300 font-semibold shadow-lg overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-white hover:before:w-full"
							>
								Add Description
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
				<p className="text-white break-words">
					{newDescription ? newDescription : "KOSONG LUR"}
				</p>
			)}
		</>
	);
}
