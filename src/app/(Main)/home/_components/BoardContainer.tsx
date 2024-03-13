import { Task } from "@/types/Tasks";
import { FetchAllTask } from "./fetchAllTask";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditTaskStatus from "@/api/Task/UpdateTaskStatus";
export type BoardType = {
	id: string;
	title: string;
	colors: string;
	tasks: Task[];
};

const Board: BoardType[] = [
	{
		id: "To Do",
		title: "To Do",
		colors: "sky-700",
		tasks: [],
	},
	{
		id: "In Progress",
		title: "In Progress",
		colors: "orange-700",
		tasks: [],
	},
	{
		id: "Revisions",
		title: "Revisions",
		colors: "fuchsia-700",
		tasks: [],
	},
	{
		id: "Done",
		title: "Done",
		colors: "green-700",
		tasks: [],
	},
];

export default function BoardContainer({ tasks }: { tasks: Task[] }) {
	const [board, setBoard] = useState(Board);
	const previousTasks = useRef<Task[]>([]);

	useEffect(() => {
		const updatedBoard = [...Board];
		const isTasksChanged =
			JSON.stringify(tasks) !== JSON.stringify(previousTasks.current);

		if (isTasksChanged) {
			tasks.forEach((task) => {
				const boardIndex = updatedBoard.findIndex(
					(board) => board.id === task.status
				);
				if (boardIndex !== -1) {
					updatedBoard[boardIndex].tasks.find((task) => task._id === task._id)
						? updatedBoard[boardIndex].tasks
						: updatedBoard[boardIndex].tasks.push(task);
				}
			});
			setBoard(updatedBoard);
			previousTasks.current = tasks;
		}
		console.log("BoardContainer", tasks);
	}, [tasks]);

	console.log(board.map((boards) => boards.colors));

	const { mutateStatusTask } = EditTaskStatus();
	const handleDragDrop = async (result: any) => {
		console.log(result);
		if (!result.destination) return;
		const { source, destination, type } = result;
		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		)
			return;
		if (type === "group") {
			const newBoard = [...board];
			const [removed] = newBoard.splice(source.index, 1);
			newBoard.splice(destination.index, 0, removed);
			return setBoard(newBoard);
		}

		const storeSourceIndex = board.findIndex(
			(board) => board.id === source.droppableId
		);
		const storeDestinationIndex = board.findIndex(
			(board) => board.id === destination.droppableId
		);
		const newBoard = [...board];
		const newSourceItems = [...newBoard[storeSourceIndex].tasks];
		const newDestinationItems =
			source.droppableId !== destination.droppableId
				? [...newBoard[storeDestinationIndex].tasks]
				: newSourceItems;
		const [removed] = newSourceItems.splice(source.index, 1);
		removed.status = destination.droppableId;
		newDestinationItems.splice(destination.index, 0, removed);
		newBoard[storeSourceIndex].tasks = newSourceItems;
		newBoard[storeDestinationIndex].tasks = newDestinationItems;
		await mutateStatusTask({
			idTask: removed._id,
			status: destination.droppableId,
		});
		console.log(newBoard);
		return setBoard(newBoard);
	};

	return (
		<>
			<DragDropContext onDragEnd={handleDragDrop}>
				<Droppable droppableId="Root" type="group" direction="horizontal">
					{(provided) => (
						<main
							className="relative pt-16 h-full flex flex-row"
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{board.map((boards, index: number) => (
								<>
									<div
										key={boards.id}
										className={`flex flex-row gap-8 mt-9 ms-7 `}
									>
										<Draggable
											draggableId={boards.id}
											key={boards.id}
											index={index}
										>
											{(provided) => (
												<div
													className="flex flex-row"
													{...provided.dragHandleProps}
													{...provided.draggableProps}
													ref={provided.innerRef}
												>
													<div
														className={cn(
															"absolute w-[280px] h-7 rounded-t-3xl",
															`text-${boards.colors}`,
															{ "bg-sky-700": boards.colors === "sky-700" },
															{
																"bg-orange-700": boards.colors === "orange-700",
															},
															{
																"bg-fuchsia-700":
																	boards.colors === "fuchsia-700",
															},
															{
																"bg-green-700": boards.colors === "green-700",
															}
														)}
													/>

													<div className="w-[280px] rounded-lg bg-[#f1f2f4] shadow-md pb-2 card h-fit mb-7 mt-5">
														<div className="p-2 h-full overflow-x-auto">
															<div className="pt-2 px-2 text-sm font-semibold flex flex-row items-center pb-6">
																<div className="w-full text-lg px-2.5 py-1 h-8 font-bold border-transparent font-['Montserrat']">
																	{boards.title}
																</div>
																<div>
																	<p
																		className={`font-['Montserrat'] text-md font-bold bg-${boards.colors} text-white p-3 rounded-full drop-shadow-md`}
																	>
																		{boards.tasks.length}
																	</p>
																</div>
															</div>
															<FetchAllTask
																allTasks={boards.tasks}
																title={boards.title}
																status={boards.id}
																Board={board}
																BoardIndex={index}
																setBoard={setBoard}
															/>
														</div>
													</div>
												</div>
											)}
										</Draggable>
									</div>
								</>
							))}
						</main>
					)}
				</Droppable>
			</DragDropContext>
		</>
	);
}
