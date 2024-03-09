import { useState, useEffect } from "react";
import FormLabel from "./editLabel";

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

	return (
		<>
			<div className="w-full flex flex-row gap-4">
				<div className="text-white text-2xl font-semibold font-['Inter'] ">
					Labels
				</div>
				<FormLabel
					label={newLabel}
					id={id}
					setNewLabel={setNewLabel}
					setData={setData}
				/>
			</div>
			<div className="flex flex-wrap gap-3">
				{newLabel && newLabel.length > 0 ? (
					newLabel.map((tags, index) => (
						<div
							className="w-20 h-14 bg-sky-800  rounded-lg justify-center items-center gap-2.5 inline-flex border border-white"
							key={index}
							// style={{}}
						>
							<div className="text-white text-xl font-bold font-['Inter']">
								{tags}
							</div>
						</div>
					))
				) : (
					<p className="text-white font-black">KOSONG SLUR</p>
				)}
			</div>
		</>
	);
}
