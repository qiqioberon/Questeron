import LoginUser from "@/api/Task/updateTaskTitle";
import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";

interface ChangeTitle {
	title: string;
}

export default function EditTitle({
	title,
	setNewTitleTask,
	Id,
}: {
	title: string;
	setNewTitleTask: React.Dispatch<React.SetStateAction<any>>;
	Id: string;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(title);
	const outsideTitle = useRef<HTMLFormElement>(null);
	const methods = useForm<ChangeTitle>();
	const { register, handleSubmit, reset } = methods;

	useEffect(() => {
		function handleOutsideClickTitle(event: MouseEvent) {
			if (
				outsideTitle.current &&
				!outsideTitle.current.contains(event.target as HTMLFormElement) &&
				isEditing
			) {
				handleSubmit(submitHandler)();
			}
		}

		document.addEventListener("mousedown", handleOutsideClickTitle);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClickTitle);
		};
	});

	const { mutateUseLoginUser } = LoginUser();
	const submitHandler: SubmitHandler<ChangeTitle> = async (data) => {
		setNewTitleTask((prev: any) => ({
			...prev,
			newTitle: data.title,
		}));
		setIsEditing(false);
		reset();

		setNewTitle(data.title);
		console.log("Formulir diserahkan:", data);
		const sendData = {
			title: data.title,
			idTask: Id,
		};

		await mutateUseLoginUser(sendData);
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	return (
		<>
			{isEditing ? (
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(submitHandler)} ref={outsideTitle}>
						<input
							autoFocus
							type="text"
							defaultValue={newTitle ? newTitle : title}
							className="text-4xl focus:text-white font-['Inter'] bg-transparent"
							{...register("title")}
						/>
					</form>
				</FormProvider>
			) : (
				<div className="justify-start items-center  flex flex-row w-full gap-4">
					<div className="text-white text-4xl font-black font-['Inter'] text-wrap">
						{newTitle ? newTitle : title}
					</div>
					<button
						onClick={handleEditClick}
						className="w-fit h-fit p-3 bg-zinc-300 rounded-full flex items-center justify-center hover:bg-black/20"
					>
						<Pencil />
					</button>
				</div>
			)}
		</>
	);
}
