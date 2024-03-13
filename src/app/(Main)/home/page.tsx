"use client";

import { Navbar } from "./_components/navbar";
import GetTaskData from "@/api/Task/getTask";
import useUserStore from "@/store/userStore";
import BoardContainer from "./_components/BoardContainer";
import { useRouter } from "next/navigation";
export default function Home() {
	const { taskData, isSuccess } = GetTaskData();
	console.log(taskData?.data.data.tasks, isSuccess);

	const { accessToken } =
		useUserStore.getState() || localStorage.getItem("accessToken");
	console.log(accessToken);
	const router = useRouter();

	if (!taskData)
		return (
			<p className="h-full flex items-center justify-center content-center">
				Loading...
			</p>
		);

	const tasks = taskData.data.data.tasks.filter((task) => !task.deletedAt);

	return (
		<>
			<div className="h-full font-['Montserrat']">
				<Navbar />
				{/* div dibawah ini children */}
				<div
					className="relative h-screen overflow-auto bg-no-repeat bg-cover bg-center"
					style={{
						background:
							"linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 212, 255, 1) 0%, rgba(9, 9, 121, 1) 100%)",
					}}
				>
					<div className="absolute inset-0 bg-black/10 " />

					{/* dibawah ini children alias si page */}
					<BoardContainer tasks={tasks} />
				</div>
			</div>
		</>
	);
}
