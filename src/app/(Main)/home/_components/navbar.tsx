import React from "react";
import { Logo } from "@/components/logo";

export const Navbar = () => {
	return (
		<nav className="fixed z-30 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
			<div className="flex items-center gap-x-4">
				<div className="hidden md:flex">
					<Logo />
				</div>
			</div>
			<div className="ml-auto flex items-center gap-x-2"></div>
		</nav>
	);
};
