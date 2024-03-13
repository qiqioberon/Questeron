import React from "react";
import { Logo } from "@/components/logo";
import { ChevronUp, User } from "lucide-react";
import getUser from "@/api/User/getUser";
import { toast } from "react-toastify";

const handleRotate = () => {
	console.log("rotate");
};

export const Navbar = () => {
	const { getUserData, error } = getUser();
	//console.log(getUserData?.data, error);
	if (!getUserData) return toast.error("Gagal Fetch Data User");
	return (
		<>
			<nav className="fixed z-30 top-0 px-4 w-full h-16 border-b-2 border-black shadow-xl bg-white flex items-center">
				<div className="flex items-center gap-x-4">
					<div className="hidden md:flex">
						<Logo />
					</div>
				</div>
				<div className="ml-auto flex items-center gap-x-2 pe-4">
					<User
						className="bg-sky-900 p-2 rounded-full"
						color="white"
						size={50}
					/>
					<ChevronUp size={30} strokeWidth={4} onClick={handleRotate} />
				</div>
			</nav>
			<div
				className="sidebar-right inline-flex flex-col items-center  gap-5 justify-center absolute bg-white z-20 top-14 right-0 w-80 h-96 overflow-hidden transition duration-500 shadow-md"
				id="sidebars"
			>
				<User
					className="bg-sky-900 p-2 rounded-full  "
					color="white"
					size={80}
				/>

				<div>
					<div className="header-sidebar-kanan pl-4">
						<h2 className="text-xl ">{getUserData.data.user.name}</h2>
						<p className="text-sm">blablabla@gmail.com</p>
					</div>
					<div className="menu-sidebar-kanan">
						<div
							className="printilan-sidebar-kanan flex items-center mt-4 cursor-pointer hover:bg-blue-200 rounded-md p-2"
							// onclick="handleClick()"
						>
							{/* <User
								className="bg-sky-900 p-2 rounded-full ml-4 mr-2 w-10"
								color="white"
								size={50}
							/> */}

							<span className="font-medium">Ubah Profil</span>
						</div>
						<div
							className="printilan-sidebar-kanan flex items-center cursor-pointer hover:bg-blue-200 rounded-md p-2"
							// onclick="handleClick()"
						>
							<img
								src="./image/Jadwal.png"
								className="ml-4 mr-2 w-10"
								// style="background-color: transparent"
							/>
							<span className="font-medium">History Planning</span>
						</div>
						<div
							className="printilan-sidebar-kanan flex items-center cursor-pointer hover:bg-blue-200 rounded-md p-2"
							// onclick="handleClick()"
						>
							<img
								src="./image/daftarplan.png"
								className="ml-4 mr-2 w-10"
								// style="background-color: transparent"
							/>
							<span className="font-medium">Daftar Planning</span>
						</div>
						<div
							className="printilan-sidebar-kanan flex items-center cursor-pointer hover:bg-blue-200 rounded-md p-2"
							// onclick="handleClick()"
						>
							<img
								src="./image/logout2.png"
								className="ml-4 mr-2 w-10"
								// style="background-color: transparent"
							/>
							<span className="font-medium">Logout</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
