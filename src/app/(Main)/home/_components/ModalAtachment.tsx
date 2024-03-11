import UpdateAttachment from "@/api/Task/Attachment/updateAttachment";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
type UpdateAttachment = {
	link: string;
	displayText: string;
};

type AttachmentProps = {
	_id: string;
	displayText: string;
	link: string;
};

export const ModalAttachment = ({
	onModal,
	setonModal,
	idTask,
	idAttachment,
	attachment,
	setAttachment,
	index,
	setData,
}: {
	onModal: boolean;
	setonModal: React.Dispatch<React.SetStateAction<any>>;
	idTask: string;
	idAttachment: string;
	attachment: AttachmentProps[];
	setAttachment: React.Dispatch<React.SetStateAction<any>>;
	index: number;
	setData: React.Dispatch<React.SetStateAction<any>>;
}) => {
	const { mutateUpdateAttachment, isPending, isError } = UpdateAttachment();

	const methods = useForm<UpdateAttachment>();
	const { register, handleSubmit, reset } = methods;
	const submitHandler: SubmitHandler<UpdateAttachment> = async (data) => {
		const allAttachment = [...attachment];
		const newAttachment = {
			_id: idAttachment,
			link: data.link,
			displayText: data.displayText,
		};
		allAttachment[index] = newAttachment;
		setAttachment(allAttachment);
		const sendUpdate = {
			link: data.link,
			displayText: data.displayText,
			idTask: idTask,
			idAttachment: idAttachment,
		};
		setData((prev: any) => ({
			...prev,
			attachments: allAttachment,
		}));
		await mutateUpdateAttachment(sendUpdate);
		setonModal(false);
	};

	const ToggleEditAttachment = () => {
		setonModal(!onModal);
	};

	return (
		<div className="fixed z-50 h-screen inset-0 bg-black bg-opacity-50 flex justify-center pt-20 pb-20 overflow-y-auto">
			<div className="w-fit h-fit p-12 bg-zinc-700 justify-start items-start rounded-2xl flex flex-col gap-8 ">
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
						/>
						<h1 className="font-extrabold text-lg text-white">LINK</h1>
						<input
							id="title"
							placeholder="Enter link"
							className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm p-3 rounded-lg"
							{...register("link")}
						/>
						<div className="flex items-center gap-x-2">
							<button
								type="submit"
								className="p-2 px-4 rounded-md bg-gray-950 text-gray-300 font-semibold shadow-lg overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-white hover:before:w-full"
								disabled={isPending}
							>
								{isPending ? "Updating..." : "Update"}
							</button>
							<button
								onClick={ToggleEditAttachment}
								className="px-3 rounded-md p-2 font-semibold overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-black/15 hover:before:w-full"
								disabled={isPending}
							>
								X
							</button>
						</div>
						{isError && (
							<div className="text-red-500">Error updating attachment</div>
						)}
					</form>
				</FormProvider>
			</div>
		</div>
	);
};
