import React, { useEffect, useState } from "react";
import { Paperclip } from "lucide-react";
import DeleteAttachment from "@/api/Task/Attachment/deleteAttachment";
import { ModalAttachment } from "./ModalAtachment";
import FormAttachment from "./FormAttachment";

type AttachmentProps = {
	_id: string;
	displayText: string;
	link: string;
};

const Attachment = ({
	attachments,
	setData,
	id,
}: {
	attachments: AttachmentProps[];
	setData: React.Dispatch<React.SetStateAction<any>>;
	id: string;
}) => {
	const [newAttachment, setnewAttachment] = useState<AttachmentProps[]>([]);
	const [modalData, setModalData] = useState({
		index: 0,
		attachmentID: "",
	});
	const [onModal, setOnModal] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			await new Promise((resolve) => setTimeout(resolve, 100));
			setnewAttachment(attachments);
		};

		fetchData();
	}, [attachments]);

	const { mutateDeleteAttachment } = DeleteAttachment();
	const handleDeleteAttachment = async (
		attachmentID: string,
		taskID: string
	) => {
		console.log(attachmentID, taskID);
		setnewAttachment((prevChecklists) =>
			prevChecklists.filter((attachment) => attachment._id !== attachmentID)
		);
		setData((prev: any) => ({
			...prev,
			attachments: newAttachment.filter(
				(attachment) => attachment._id !== attachmentID
			),
		}));
		await mutateDeleteAttachment({
			idTask: taskID,
			idAttachment: attachmentID,
		});
	};

	const openModalAttachment = (id: string, curIndex: number) => {
		setModalData({
			index: curIndex,
			attachmentID: id,
		});
		setOnModal(!onModal);
	};

	return (
		<div className="w-full justify-start items-start gap-7 inline-flex">
			<Paperclip className="w-20 h-20 shadow-white" color="white" />
			<div className="flex flex-col items-start gap-2 ">
				<div className="text-white text-2xl font-black font-['Inter']">
					Attachment
				</div>

				<div className="flex flex-col gap-5">
					{newAttachment && newAttachment.length > 0 ? (
						newAttachment.map((attachments, index: number) => (
							<div
								className="w-96 h-fit p-4 bg-black/25 flex flex-row gap-3"
								key={attachments._id}
							>
								<div className="w-44 h-auto bg-zinc-300 rounded flex justify-center items-center font-bold text-xl">
									LINK
								</div>
								<div className="w-full h-fit flex flex-col text-white gap-1">
									<h1 className="font-bold text-xl">
										{attachments.displayText}
									</h1>
									<a
										href={attachments.link}
										target="_blank"
										rel="noopener noreferrer"
									>
										<button className="underline w-fit">
											{attachments.link}
										</button>
									</a>
									<div className="flex flex-row gap-3 pt-2">
										<button
											onClick={() =>
												handleDeleteAttachment(attachments._id, id)
											}
											className="w-fit p-2 text-sm bg-black/50 text-white rounded-lg  h-fit font-semibold overflow-hidden relative transition duration-200  hover:bg-black/15 hover:before:w-full"
										>
											remove
										</button>

										<button
											onClick={() =>
												openModalAttachment(attachments._id, index)
											}
											className="w-fit p-2 text-sm bg-black/50 text-white rounded-lg  h-fit font-semibold overflow-hidden relative transition duration-200  hover:bg-black/15 hover:before:w-full"
										>
											edit
										</button>
									</div>
								</div>
							</div>
						))
					) : (
						<p className="text-white font-black">KOSONG SLUR</p>
					)}
					{onModal && (
						<ModalAttachment
							index={modalData.index}
							onModal={onModal}
							setonModal={setOnModal}
							idTask={id}
							idAttachment={modalData.attachmentID}
							attachment={newAttachment}
							setAttachment={setnewAttachment}
							setData={setData}
						/>
					)}
					<FormAttachment
						attachment={newAttachment}
						setAttachment={setnewAttachment}
						setData={setData}
						id={id}
					/>
				</div>
			</div>
		</div>
	);
};

export default Attachment;
