import { NotebookPen, Pencil } from "lucide-react";
import { useState } from "react";
import FormDescription from "./FormDescription";

export default function DescriptionModal({
	description,
	setData,
	id,
}: {
	description: string;
	setData: React.Dispatch<React.SetStateAction<any>>;
	id: string;
}) {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<>
			<div className="w-full justify-start items-start gap-7 inline-flex">
				<NotebookPen className="w-20 h-20 shadow-white" color="white" />
				<div className=" flex-col items-start gap-5 inline-flex">
					<div className="flex flex-row gap-3 items-center">
						<div className="text-white text-2xl font-black font-['Montserrat']">
							Description
						</div>
						<button
							onClick={() => setIsEditing(true)}
							className="w-fit h-fit p-1 bg-zinc-300 rounded-full flex items-center justify-center hover:bg-black/20"
						>
							<Pencil size={15} />
						</button>
					</div>
					<div className="w-[500px] h-fit p-7 text-wrap bg-black/30 rounded-lg">
						<FormDescription
							isEditing={isEditing}
							setIsEditing={setIsEditing}
							description={description}
							setData={setData}
							id={id}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
