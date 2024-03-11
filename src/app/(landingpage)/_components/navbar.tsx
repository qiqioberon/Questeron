import { Logo } from "@/components/logo";

export const Navbar = () => {
	return (
		<div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
			<div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
				<Logo />
				<div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
					<a href="/sign-in">
						<button className="p-1 px-4 rounded-md bg-gray-950 text-gray-300 font-semibold shadow-lg overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-white hover:before:w-full">
							Login
						</button>
					</a>
					<a href="/sign-up">
						<button className="p-1 px-4 rounded-md bg-gray-950 text-gray-300 font-semibold shadow-lg overflow-hidden relative transition duration-200 hover:text-gray-800 hover:bg-white hover:before:w-full">
							Get Questeron for free
						</button>
					</a>
				</div>
			</div>
		</div>
	);
};
