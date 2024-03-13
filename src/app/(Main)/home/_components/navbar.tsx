import React, { useState } from "react";
import { Logo } from "@/components/logo";
import { ChevronUp, LogOut, User } from "lucide-react";
import getUser from "@/api/User/getUser";
import Link from "next/link";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";
export const Navbar = () => {
	const [isRotate, setIsRotate] = useState(false);
	const { getUserData } = getUser();
	const Router = useRouter();
	const handleRotate = () => {
		setIsRotate(!isRotate);
	};

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		useUserStore.getState().setAccessToken("");
		Router.push("/");
	};

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
					<ChevronUp
						size={30}
						strokeWidth={4}
						onClick={handleRotate}
						style={{ transform: isRotate ? "rotate(180deg)" : "rotate(0deg)" }}
						className="transition-all duration-200"
					/>
				</div>
			</nav>
			<div
				className={`sidebar-right inline-flex flex-col items-center gap-5 justify-center absolute bg-white z-20 top-14 right-0 w-80 h-64 overflow-hidden shadow-md ${
					isRotate ? "" : "hidden"
				}`}
				id="sidebars"
			>
				<User className="bg-sky-900 p-2 rounded-full" color="white" size={80} />
				<div>
					<div className="header-sidebar-kanan text-center">
						<h2 className="text-xl ">
							{getUserData ? getUserData.data.user.name : "Loading..."}
						</h2>
						<p className="text-sm">
							{getUserData ? getUserData.data.user.email : "Loading..."}
						</p>
					</div>
					<div className="menu-sidebar-kanan">
						<Link href="/sign-in">
							<div
								className="printilan-sidebar-kanan flex items-center justify-center cursor-pointer hover:bg-blue-200 rounded-md p-2 mt-2"
								onClick={handleLogout}
							>
								<LogOut className="mr-2 w-10" />
								<span className="font-medium">Logout</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};
