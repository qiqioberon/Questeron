import { Task } from "@/types/Tasks";
import { FetchAllTask } from "./fetchAllTask";
import { useState, useEffect, useRef } from "react";

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
					updatedBoard[boardIndex].tasks.push(task);
				}
			});
			setBoard(updatedBoard);
			previousTasks.current = tasks;
		}
		console.log("BoardContainer", tasks);
	}, [tasks]);

	console.log(board.map((boards) => boards.colors));
	return (
		<>
			{board.map((boards, index: number) => (
				<div key={boards.id} className={`flex flex-row gap-8 mt-9 ms-7 `}>
					<div
						className={`${
							boards.colors === "sky-700" && "bg-sky-700"
						} absolute  w-[280px] rounded-t-3xl text-${boards.colors}`}
					>
						.
					</div>
					<div className="w-[280px] rounded-lg bg-[#f1f2f4] shadow-md pb-2 card h-fit mb-7 mt-5">
						<div className="p-2 h-full overflow-x-auto">
							<div className="pt-2 px-2 text-sm font-semibold flex flex-row items-center pb-6">
								<div className="w-full text-lg px-2.5 py-1 h-8 font-black border-transparent">
									{boards.title}
								</div>
								<div>
									<p
										className={`text-md font-bold bg-${boards.colors} text-white p-3 rounded-full drop-shadow-md`}
									>
										{boards.tasks.length}
									</p>
								</div>
							</div>
							<FetchAllTask
								tasks={boards.tasks}
								title={boards.title}
								status={boards.id}
								Board={board}
								BoardIndex={index}
							/>
						</div>
					</div>
				</div>
			))}
		</>
	);
}
