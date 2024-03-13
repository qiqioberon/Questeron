import { useState, useEffect } from "react";
import FormLabel from "./editLabel";
import { XCircle } from "lucide-react";
import EditTaskTags from "@/api/Task/UpdateTaskTags";

export default function AllLabel({
	label,
	id,
	setData,
}: {
	label: string[];
	id: string;
	setData: React.Dispatch<React.SetStateAction<any>>;
}) {
	const [newLabel, setNewLabel] = useState<string[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			await new Promise((resolve) => setTimeout(resolve, 100));
			setNewLabel(label);
		};

		fetchData();
	}, [label]);
	const { mutateTags } = EditTaskTags();
	const handleDeleteLabel = async (index: number) => {
		const Alllabel = [...newLabel];
		Alllabel.splice(index, 1);
		setNewLabel(Alllabel);
		setData((prev: any) => ({
			...prev,
			tags: Alllabel,
		}));
		const newAllLabel = {
			tags: Alllabel,
			idTask: id,
		};
		await mutateTags(newAllLabel);
	};

	function generateRandomColor() {
		var red = Math.floor(Math.random() * 240);
		var green = Math.floor(Math.random() * 240);
		var blue = Math.floor(Math.random() * 240);

		var color = "rgb(" + red + ", " + green + ", " + blue + ")";

		return color;
	}

	return (
		<>
			<div className="w-full flex flex-row gap-4">
				<div className="text-white text-2xl font-semibold font-['Montserrat'] ">
					Labels
				</div>
				<FormLabel
					label={newLabel}
					id={id}
					setNewLabel={setNewLabel}
					setData={setData}
				/>
			</div>
			<div className="flex flex-wrap gap-1.5">
				{newLabel && newLabel.length > 0 ? (
					newLabel.map((tags, index) => (
						<>
							<div
								className="font-['Montserrat'] w-fit h-14 p-1 bg-sky-800 rounded-lg justify-center items-center gap-2.5 inline-flex border border-white relative cursor-pointer"
								key={index}
								style={{ backgroundColor: generateRandomColor() }}
							>
								<div className="w-fit flex items-center justify-center gap-4">
									<div className="ps-6 text-white text-xl font-bold font-['Montserrat']">
										{tags}
									</div>
									<button
										onClick={() => handleDeleteLabel(index)}
										className="relative p-2 me-3  text-white rounded-full hover:bg-sky-500 transition-all duration-500"
									>
										<XCircle />
									</button>
								</div>
							</div>
						</>
					))
				) : (
					<p className="text-white font-medium font-['Montserrat']">
						KOSONG SLUR
					</p>
				)}
			</div>
		</>
	);
}
