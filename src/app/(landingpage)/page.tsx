import { Medal } from "lucide-react";

const LandingPageMain = () => {
	return (
		<div className="flex items-center justify-center flex-col">
			<div className="flex items-center justify-center flex-col">
				<div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
					<Medal className="h-6 w-6 mr-2" />
					No 1 task managment
				</div>
				<h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
					Questeron helps team move
				</h1>
				<div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
					work forward.
				</div>
			</div>
			<div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
				Collaborate, manage projects, and reach new productivity peaks. From
				high rises to the home office, the way your team works is unique -
				accomplish it all with Questeron.
			</div>

			<button className="mt-6 inline-block px-4 py-2 text-lg font-bold text-center text-white  bg-pink-600 border-2 border-pink-800 rounded-lg shadow-md transition-all duration-300 cursor-pointer hover:bg-white hover:text-red-500 hover:border-red-500 active:bg-yellow-400 active:shadow-none active:translate-y-4">
				Get Questopia for free
			</button>
		</div>
	);
};

export default LandingPageMain;
