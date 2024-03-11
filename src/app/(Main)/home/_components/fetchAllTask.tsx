import { Task } from "@/types/Tasks";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import DeleteTask from "@/api/Task/deleteTask";
import FormCard from "./FormCard";
import { BoardType } from "./BoardContainer";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
interface SearchState {
	searchTitle: string;
	searchID: string;
	newTitle: string;
	indexTask: number;
	task: Task;
	title: string;
	status: string;
	Board: BoardType[];
	BoardIndex: number;
}

const initialState: Task = {
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
};

export const FetchAllTask = ({
	tasks,
	title,
	status,

	Board,
	BoardIndex,
}: {
	tasks: Task[];
	title: string;
	status: string;
	Board: BoardType[];
	BoardIndex: number;
}) => {
	const [allTasks, setAllTask] = useState<Task[]>(tasks);
	const [isActiveAll, setIsActiveAll] = useState({
		isEditing: false,
		onModal: false,
	});
	console.log(status);
	console.log(title);
	const [search, setSearch] = useState<SearchState>({
		searchTitle: "",
		searchID: "",
		newTitle: "",
		indexTask: 0,
		task: initialState,
		title: title,
		status: status,
		Board: Board,
		BoardIndex: BoardIndex,
	});

	function OpenModal(
		e: React.MouseEvent<HTMLDivElement>,
		taskId: string,
		index: number
	) {
		e.stopPropagation();
		let clickedTask = e.target as HTMLDivElement;
		setSearch((prevSearch) => ({
			...prevSearch,
			searchID: taskId,
			searchTitle: clickedTask.textContent as string,
			indexTask: index,
		}));
		console.log(clickedTask.innerHTML);
		console.log(clickedTask.id);
		console.log(index);
		setIsActiveAll((prev) => ({
			...prev,
			onModal: true,
		}));
	}
	console.log(search.indexTask);
	const { mutateDeleteTask } = DeleteTask();
	const handleDelete = async (
		e: React.MouseEvent<HTMLButtonElement>,
		idTask: string
	) => {
		e.preventDefault();

		await mutateDeleteTask(idTask);
		setAllTask((prevtask: any) =>
			prevtask.filter((task: Task) => task._id !== idTask)
		);
	};

	useEffect(() => {
		if (
			isActiveAll.onModal === false &&
			search.searchID !== "" &&
			search.newTitle
		) {
			console.log(search.newTitle);

			const cloneTask = [...allTasks];
			cloneTask.reverse();
			console.log(cloneTask[search.indexTask]);
			console.log(cloneTask[0]);
			cloneTask[search.indexTask] = search.task;
			cloneTask[search.indexTask].title = search.newTitle;
			setAllTask(cloneTask.reverse());
			// const AllBoard = [...Board];
			// AllBoard[BoardIndex].tasks = cloneTask.reverse();
			// setAllTask(AllBoard);
		}
	}, [isActiveAll.onModal, search.searchID]);

	function generateRandomColor() {
		var red = Math.floor(Math.random() * 240);
		var green = Math.floor(Math.random() * 240);
		var blue = Math.floor(Math.random() * 240);

		var color = "rgb(" + red + ", " + green + ", " + blue + ")";

		return color;
	}

	return (
		<>
			<div className="mt-2 max-h-60 overflow-y-auto pr-1">
				<div className="listcard flex flex-col gap-3 daftarTugas">
					{isActiveAll.onModal && (
						<Modal
							id={search.searchID}
							onModal={isActiveAll.onModal}
							setNewTitleTask={setSearch}
							setOnModal={setIsActiveAll}
							tasks={allTasks}
							title={search.searchTitle}
							titleBoard={title}
						/>
					)}
					{allTasks
						.slice()
						.reverse()
						.map((task: Task, index) => (
							<div
								key={task._id}
								className="flex flex-row justify-between w-full gap-2"
								// draggable
								// onDragStart={() => (dragTask.current = index)}
								// onDragOver={() => (draggedOverTask.current = index)}
								// onDragEnd={handleDrag}
								// onDragOverCapture={(e) => e.preventDefault()}
							>
								<div className="flex flex-col w-full cursor-pointer">
									<div
										id={task._id}
										onClick={(e) => OpenModal(e, task._id, index)}
										className="truncate border-2 text-white/80 border-transparent hover:border-[#83cbff] py-2 px-3 text-sm bg-white/35 rounded-xl  w-full text-wrap  shadow-lg"
									>
										<div className="flex flex-wrap gap-1">
											{task.tags ? (
												task.tags.map((tags) => {
													return (
														<div
															key={tags}
															className="w-fit h-fit p-1 bg-sky-800 rounded-lg justify-center items-center gap-2.5 inline-flex border border-white relative cursor-pointer"
															style={{ backgroundColor: generateRandomColor() }}
														>
															<div className="w-fit flex items-center justify-center ">
																<div className="p-0.5 text-white text-[14px] text-center font-md font-['Poppins']">
																	{tags}
																</div>
															</div>
														</div>
													);
												})
											) : (
												<></>
											)}
										</div>
										<p className="text-lg font-bold mt-4 text-black">
											{task.title}
										</p>
									</div>
								</div>
								<button
									onClick={(e) => handleDelete(e, task._id)}
									id={task._id}
									className="h-auto px-3 text-sm text-black bg-white rounded-lg w-fit  font-semibold overflow-hidden relative transition duration-200  hover:bg-black/15 hover:before:w-full"
								>
									X
								</button>
							</div>
						))}
				</div>
			</div>
			<div className="formcard">
				<div className="shrink-0 h-full select-none mx-3 mt-3">
					<FormCard setTasks={setAllTask} status={search.status} />
				</div>
			</div>
		</>
	);
};
