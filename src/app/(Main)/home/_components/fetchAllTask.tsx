import { AllTasks, Task } from "@/types/Tasks";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
interface SearchState {
	searchTitle: string;
	searchID: string;
	newTitle: string;
	indexTask: number;
	task: Task;
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

export const FetchAllTask = ({ tasks }: AllTasks) => {
	const [allTask, setAllTask] = useState(tasks);
	const [isActiveAll, setIsActiveAll] = useState({
		isEditing: false,
		onModal: false,
	});

	const [search, setSearch] = useState<SearchState>({
		searchTitle: "",
		searchID: "",
		newTitle: "",
		indexTask: 0,
		task: initialState,
	});

	function OpenModal(e: React.MouseEvent<HTMLDivElement>, index: number) {
		let clickedTask = e.target as HTMLDivElement;
		setSearch((prevSearch) => ({
			...prevSearch,
			searchID: clickedTask.id,
			searchTitle: clickedTask.innerHTML,
			indexTask: index,
		}));
		console.log(clickedTask.id);
		console.log(index);
		setIsActiveAll((prev) => ({
			...prev,
			onModal: true,
		}));
	}
	console.log(search.indexTask);

	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		let clickedTask = e.target as HTMLButtonElement;
		let clickedTaskID = clickedTask.id;
		console.log(clickedTask.id);
		// const DeleteTasks = await DeleteTask(clickedTaskID);
		setAllTask((prevtask) =>
			prevtask.filter((task) => task._id !== clickedTaskID)
		);
	};

	useEffect(() => {
		if (
			isActiveAll.onModal === false &&
			search.searchID !== "" &&
			search.newTitle
		) {
			console.log(search.newTitle);

			const cloneTask = [...allTask];
			cloneTask.reverse();
			console.log(cloneTask[search.indexTask]);
			console.log(cloneTask[0]);
			cloneTask[search.indexTask] = search.task;
			cloneTask[search.indexTask].title = search.newTitle;
			setAllTask(cloneTask.reverse());
		}
	}, [isActiveAll.onModal, search.searchID]);

	return (
		<>
			{isActiveAll.onModal && (
				<Modal
					id={search.searchID}
					onModal={isActiveAll.onModal}
					setNewTitleTask={setSearch}
					setOnModal={setIsActiveAll}
					tasks={allTask}
					title={search.searchTitle}
				/>
			)}
			{allTask
				.slice()
				.reverse()
				.map((task, index) => (
					<div
						key={task._id}
						className="flex flex-row justify-between w-full gap-2"
						// draggable
						// onDragStart={() => (dragTask.current = index)}
						// onDragOver={() => (draggedOverTask.current = index)}
						// onDragEnd={handleDrag}
						// onDragOverCapture={(e) => e.preventDefault()}
					>
						<div
							className="truncate border-2 text-white/80 border-transparent hover:border-[#83cbff] py-2 px-3 text-sm bg-[#a2a2a2] rounded-md shadow-sm w-full text-wrap"
							id={task._id}
							onClick={(e) => OpenModal(e, index)}
						>
							{task.title}
						</div>
						<button
							onClick={handleDelete}
							id={task._id}
							className="h-auto px-3 text-sm text-black bg-white rounded-lg w-fit  font-semibold overflow-hidden relative transition duration-200  hover:bg-black/15 hover:before:w-full"
						>
							X
						</button>
					</div>
				))}
		</>
	);
};
