import { Task } from "@/types/Tasks";
import { IsActiveAllState } from "@/types/isActiveAllSet";
import {
	Crown,
	ListChecks,
	NotebookPen,
	Paperclip,
	Pencil,
	XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import EditTitle from "./editTitle";

import AllLabel from "./AllLabel";
import DescriptionModal from "./Description";
import ChecklistModal from "./Checklist";
import Attachment from "./Attachment";

export const Modal = ({
	onModal,
	setOnModal,
	tasks,
	id,
	title,
	setNewTitleTask,
}: {
	onModal: boolean;
	setOnModal: React.Dispatch<React.SetStateAction<any>>;
	tasks: Task[];
	id: string;
	title: string;
	setNewTitleTask: React.Dispatch<React.SetStateAction<any>>;
}) => {
	const outsideModal = useRef<HTMLDivElement>(null);
	const [data, setData] = useState<Task>({
		_id: "",
		title: "",
		description: "",
		tags: [],
		dueDate: "",
		checklists: [],
		attachments: [],
		status: "",
		createdAt: "",
		updatedAt: "",
		__v: 0,
		deletedAt: "",
	});

	const [isEditing, setIsEditing] = useState({
		isEditingAttachment: false,
		isEditingLabel: false,
		isEditingDescription: false,
		isEditingTitle: false,
	});

	const selectedTask = tasks.find((task) => task._id === id);
	console.log(selectedTask);
	useEffect(() => {
		if (selectedTask) {
			setData(selectedTask);
			setNewTitleTask((prev: any) => ({
				...prev,
				newTitle: title,
			}));
		}
	}, [selectedTask]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			const target = event.target as HTMLDivElement;
			if (
				outsideModal.current !== null &&
				outsideModal.current !== undefined &&
				!outsideModal.current.contains(target)
			) {
				setOnModal(!onModal);
				setNewTitleTask((prev: any) => ({
					...prev,
					task: data,
				}));
				console.log("Klik diluar elemen modal");
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onModal]);
	console.log(data.tags);

	function handleCloseModal() {
		setOnModal((prev: IsActiveAllState) => ({
			...prev,
			onModal: false,
		}));
		setNewTitleTask((prev: any) => ({
			...prev,
			task: data,
		}));
	}

	return (
		<>
			<div className="fixed top-0 z-40 h-screen inset-0 bg-black bg-opacity-50 flex justify-center pt-20 pb-20 overflow-y-auto">
				<div
					className="w-[800px] h-fit p-12 bg-zinc-700 justify-start items-start rounded-2xl flex flex-col gap-8 "
					ref={outsideModal}
				>
					<div className="w-full justify-between flex flex-row">
						<div className="w-full justify-start items-start gap-7 inline-flex">
							<Crown className="w-20 h-20 shadow-white" color="white" />
							<div className="flex-col justify-center items-start gap-3 inline-flex">
								<div className="justify-start items-center  flex flex-row w-full gap-4">
									<EditTitle
										title={data.title}
										setNewTitleTask={setNewTitleTask}
										Id={data._id}
									/>
								</div>

								<div>
									<span className="text-white text-lg font-normal font-['Inter']">
										in list{" "}
									</span>
									<span className="text-white text-lg font-normal font-['Inter'] underline">
										Daftar Tugas
									</span>
								</div>
								<div className="h-auto py-7 flex-col justify-start items-start gap-2.5 flex">
									<AllLabel id={data._id} label={data.tags} setData={setData} />
								</div>
							</div>
						</div>
						<div>
							<button
								onClick={handleCloseModal}
								className="px-3 text-3xl text-white rounded-full w-12 h-12 font-semibold overflow-hidden relative transition duration-200  hover:bg-black/15 hover:before:w-full"
							>
								<XCircle />
							</button>
						</div>
					</div>

					<div className="h-fit  justify-start items-start">
						<DescriptionModal
							description={data.description}
							setData={setData}
							id={data._id}
						/>
					</div>

					<div className="h-fit  justify-start items-start">
						<ChecklistModal
							checklist={data.checklists}
							setData={setData}
							id={data._id}
						/>
					</div>

					<div className="h-fit justify-start items-start">
						<Attachment
							attachments={data.attachments}
							setData={setData}
							id={data._id}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
