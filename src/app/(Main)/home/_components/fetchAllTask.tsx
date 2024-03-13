import { Task } from "@/types/Tasks";
import { useEffect, useRef, useState } from "react";
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
	allTasks,
	title,
	status,
	setBoard,
	Board,
	BoardIndex,
}: {
	allTasks: Task[];
	title: string;
	status: string;
	Board: BoardType[];
	BoardIndex: number;
	setBoard: React.Dispatch<React.SetStateAction<any>>;
}) => {
	// const allTasks = useRef<Task[]>([]);
	// useEffect(() => {
	// 	const isTasksChanged =
	// 		JSON.stringify(tasks) !== JSON.stringify(allTasks.current);
	// 	if (isTasksChanged) {
	// 		allTasks.current = tasks;
	// 	}
	// 	console.log("TaskContainer", tasks);
	// }, [tasks]);

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
		index: number,
		clickedTitle: string
	) {
		e.stopPropagation();
		let clickedTask = e.target as HTMLDivElement;
		setSearch((prevSearch) => ({
			...prevSearch,
			searchID: taskId,
			searchTitle: clickedTitle,
			indexTask: index,
		}));
		console.log(clickedTask.textContent);
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

		setBoard((prev: any) => {
			const newBoard = [...prev];
			newBoard.forEach((board: BoardType) => {
				if (board.id === status) {
					board.tasks = board.tasks.filter((task: Task) => task._id !== idTask);
				}
			});
			return newBoard;
		});
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

			setBoard((prev: any) => {
				const newBoard = [...prev];
				newBoard.forEach((board: BoardType) => {
					if (board.id === status) {
						board.tasks = cloneTask.reverse();
					}
				});
				return newBoard;
			});
		}
	}, [isActiveAll.onModal, search.searchID]);

	function generateRandomColor() {
		var red = Math.floor(Math.random() * 240);
		var green = Math.floor(Math.random() * 240);
		var blue = Math.floor(Math.random() * 240);

		var color = "rgb(" + red + ", " + green + ", " + blue + ")";

		return color;
	}
	console.log(search.status.toString());
	return (
		<>
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

			<Droppable droppableId={`${search.status}`}>
				{(provided) => (
					<div className="mt-2 max-h-60 overflow-y-auto pr-1 pb-6">
						<div
							className="listcard flex flex-col gap-3 daftarTugas min-h-10 h-fit"
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{allTasks.slice().map((task: Task, index: number) => (
								<Draggable draggableId={task._id} key={task._id} index={index}>
									{(provided) => (
										<div
											key={task._id}
											className="flex flex-row justify-between w-full gap-2"
											{...provided.dragHandleProps}
											{...provided.draggableProps}
											ref={provided.innerRef}
										>
											<div className="flex flex-col w-full cursor-pointer">
												<div
													id={task._id}
													onClick={(e) =>
														OpenModal(e, task._id, index, task.title)
													}
													className="truncate border-2 text-white/80 border-transparent hover:border-[#83cbff] py-2 px-3 text-sm bg-white/35 rounded-xl  w-full text-wrap  shadow-lg"
												>
													<div className="flex flex-wrap gap-1">
														{task.tags ? (
															task.tags.map((tags) => {
																return (
																	<div
																		key={tags}
																		className="w-fit h-fit p-1 bg-sky-800 rounded-lg justify-center items-center gap-2.5 inline-flex border border-white relative "
																		style={{
																			backgroundColor: generateRandomColor(),
																		}}
																	>
																		<div className="w-fit flex items-center justify-center ">
																			<div className="p-0.5 text-white text-[14px] text-center font-md font-['Montserrat']">
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
													<p className="text-lg font-bold mt-4 text-black font-['Montserrat']">
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
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					</div>
				)}
			</Droppable>

			<div className="formcard">
				<div className="shrink-0 h-full select-none mx-3 mt-3">
					<FormCard status={search.status} setBoard={setBoard} />
				</div>
			</div>
		</>
	);
};
