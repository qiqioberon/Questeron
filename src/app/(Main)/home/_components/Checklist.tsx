
import { ListChecks, XCircle } from "lucide-react";
import { ChecklistItem } from "@/types/Tasks";
import { useEffect, useState } from "react";
import updatedChecklist from "@/api/Task/Checklist/updateChecklist";
import deletedChecklist from "@/api/Task/Checklist/deleteChecklist";
import FormCardChecklist from "./FormChecklist";

export default function ChecklistModal({
	checklist,
	setData,
	id,
}: {
	checklist: ChecklistItem[];
	setData: React.Dispatch<React.SetStateAction<any>>;
	id: string;
}) {
	const [newChecklist, setNewChecklist] = useState<ChecklistItem[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			await new Promise((resolve) => setTimeout(resolve, 100));
			setNewChecklist(checklist);
		};

		fetchData();
	}, [checklist]);

	const { mutateChecklist } = updatedChecklist();
	const { mutateDeleteChecklist } = deletedChecklist();

	const handleCheckboxChange = async (index: number) => {
		const updatedChecklists = [...newChecklist];
		updatedChecklists[index].isDone = !updatedChecklists[index].isDone;
		setNewChecklist(updatedChecklists);
		console.log(updatedChecklists[index]);
		console.log(id);
		setData((prev: any) => ({
			...prev,
			checklists: updatedChecklists,
		}));
		const sendChecklist = {
			checklistItem: updatedChecklists[index].checklistItem,
			isDone: updatedChecklists[index].isDone,
			idTask: id,
			idChecklist: updatedChecklists[index]._id,
		};
		await mutateChecklist(sendChecklist);
	};

	const handleDeleteChecklist = async (checklistId: string, taskID: string) => {
		const sendDelete = {
			idTask: taskID,
			idChecklist: checklistId,
		};
		setNewChecklist((prevChecklists) =>
			prevChecklists.filter((checklist) => checklist._id !== checklistId)
		);
		setData((prev: any) => ({
			...prev,
			checklists: newChecklist.filter(
				(checklist) => checklist._id !== checklistId
			),
		}));
		await mutateDeleteChecklist(sendDelete);
	};

	return (
		<>
			<div className="w-full justify-start items-start gap-7 inline-flex">
				<ListChecks className="w-20 h-20 shadow-white" color="white" />
				<div className=" flex-col items-start gap-5 inline-flex">
					<div className="text-white text-2xl font-black font-['Inter']">
						Checklist
					</div>

					<div className="w-96 h-fit p-4">
						<ol className="flex flex-col gap-2 pb-4">
							{newChecklist && newChecklist.length > 0 ? (
								newChecklist.map((checklists, index: number) => (
									<li key={checklists._id}>
										<div className="flex flex-row justify-between items-center">
											<div>
												<input
													type="checkbox"
													className="w-4 h-4"
													checked={checklists.isDone || false}
													onChange={() => handleCheckboxChange(index)}
												></input>
												<span className="px-4 text-white font-semibold">
													{checklists.checklistItem}
												</span>
											</div>
											<button
												onClick={() =>
													handleDeleteChecklist(checklists._id, id)
												}
												className="h-fit px-3 rounded-md text-white font-semibold overflow-hidden relative transition duration-200 hover:text-white hover:bg-black/15 hover:before:w-full"
											>
												<XCircle />
											</button>
										</div>
									</li>
								))
							) : (
								<p className="text-white font-black">KOSONG SLUR</p>
							)}
						</ol>
						<FormCardChecklist
							id={id}
							setData={setData}
							setNewChecklist={setNewChecklist}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
