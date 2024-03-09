import { Plus, XCircle } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import CreateAttachment from "@/api/Task/Attachment/createAttachment";
type CreateAttachments = {
	link: string;
	displayText: string;
};

type AttachmentProps = {
	_id: string;
	displayText: string;
	link: string;
};

export default function FormAttachment({
	setData,
	attachment,
	setAttachment,
	id,
}: {
	setData: React.Dispatch<React.SetStateAction<any>>;
	attachment: AttachmentProps[];
	setAttachment: React.Dispatch<React.SetStateAction<any>>;
	id: string;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const { mutateCreateAttachment, isPending } = CreateAttachment();
	const methods = useForm<CreateAttachments>();
	const { register, handleSubmit, reset } = methods;
	const submitHandler: SubmitHandler<CreateAttachments> = async (data) => {
		const newAttachment = {
			link: data.link,
			displayText: data.displayText,
		};
		setAttachment((prevChecklists: any) => [...prevChecklists, newAttachment]);
		const allAttachment = [...attachment, newAttachment];
		await mutateCreateAttachment({
			link: data.link,
			displayText: data.displayText,
			idTask: id,
		});
		setData((prev: any) => ({
			...prev,
			attachments: allAttachment,
		}));
		reset();
		setIsEditing(false);
	};
	if (isEditing) {
		return (
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(submitHandler)}
					className="m-1 py-3 px-4 space-y-4 bg-black/20 rounded-lg"
				>
					<h1 className="font-extrabold text-lg text-white">JUDUL</h1>
					<input
						id="title"
						placeholder="Enter title"
						className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"
						{...register("displayText")}
					></input>
					<h1 className="font-extrabold text-lg text-white">LINK</h1>
					<input
						id="link"
						placeholder="Enter link"
						className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"
						{...register("link")}
					></input>
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
							<XCircle />
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
				Add an Attachment
			</button>
		);
	}
}
