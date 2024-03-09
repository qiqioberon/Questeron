"use client";
import getUser from "@/api/User/getUser";
import { Navbar } from "./_components/navbar";
import GetTaskData from "@/api/Task/getTask";
import { FetchAllTask } from "./_components/fetchAllTask";

export default function Home() {
	const { taskData, isSuccess } = GetTaskData();
	console.log(taskData?.data.data.tasks, isSuccess);
	const { getUserData, error } = getUser();
	console.log(getUserData, error);
	if (!taskData)
		return (
			<p className="h-full flex items-center justify-center content-center">
				{" "}
				Loading...{" "}
			</p>
		);

	const tasks = taskData.data.data.tasks;

	return (
		<>
			<div className="h-full">
				<Navbar />
				{/* div dibawah ini children */}
				<div
					className="relative h-screen overflow-auto bg-no-repeat bg-cover bg-center"
					style={{
						background:
							"linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 212, 255, 1) 0%, rgba(9, 9, 121, 1) 100%)",
					}}
				>
					{/* <BoardNavbar /> */}
					<div className="absolute inset-0 bg-black/10 " />
					<main className="relative pt-16 h-full">
						{/* dibawah ini children alias si page */}

						<div className="flex flex-row gap-8 m-9">
							<div className="w-72 rounded-lg bg-[#f1f2f4] shadow-md pb-2 card h-fit mb-7">
								<div className="p-2 h-full overflow-x-auto">
									<div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2 pb-2">
										<div className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
											DAFTAR TUGAS
										</div>
									</div>
									<div className=" max-h-60 overflow-y-auto pr-1">
										<div className="listcard flex flex-col gap-3 daftarTugas">
											{/* <div className="truncate border-2 text-white/80 border-transparent hover:border-[#83cbff] py-2 px-3 text-sm bg-[#a2a2a2] rounded-md shadow-sm" style={FontStyles.Medium}>wenak</div> */}
											<FetchAllTask tasks={tasks} />
										</div>
									</div>
									<div className="formcard">
										<div className="shrink-0 h-full select-none mx-3 mt-3">
											{/* <FormCard /> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
