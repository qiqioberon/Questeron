"use client";
import { useRouter } from "next/navigation";
import SignUpUser from "@/api/User/signup";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SignUp } from "@/types/SignUpForm";

export default function SignIn() {
	const router = useRouter();
	const methods = useForm<SignUp>();
	const { register, handleSubmit } = methods;
	const { mutateSignUp, responseSignUp, isSuccess } = SignUpUser();
	const onSubmit: SubmitHandler<SignUp> = async (datas) => {
		try {
			datas.language = "en";
			console.log(datas);

			await mutateSignUp(datas);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	if (isSuccess && responseSignUp && responseSignUp.status === 200) {
		router.push("/sign-in");
	} else {
	}

	return (
		<div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
			<div className="flex shadow-md">
				<div
					className="flex flex-wrap content-center justify-center rounded-l-md bg-white"
					style={{ width: "24rem", height: "32rem" }}
				>
					<div className="w-72">
						<h1 className="text-xl font-semibold">Welcome back</h1>
						<small className="text-gray-400">
							Welcome ! Please enter your details
						</small>
						<FormProvider {...methods}>
							<form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
								<div className="mb-3">
									<label
										className="mb-2 block text-xs font-semibold"
										htmlFor="username"
									>
										Username
									</label>
									<input
										id="username"
										type="text"
										placeholder="Enter your username"
										className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
										{...register("username")}
									/>
								</div>
								<div className="mb-3">
									<label
										className="mb-2 block text-xs font-semibold"
										htmlFor="name"
									>
										Name
									</label>
									<input
										id="name"
										type="text"
										placeholder="Enter your name"
										className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
										{...register("name")}
									/>
								</div>
								<div className="mb-3">
									<label
										className="mb-2 block text-xs font-semibold"
										htmlFor="email"
									>
										Email
									</label>
									<input
										id="email"
										type="email"
										placeholder="Enter your email"
										className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
										{...register("email")}
									/>
								</div>
								<div className="mb-3">
									<label
										htmlFor="password"
										className="mb-2 block text-xs font-semibold"
									>
										Password
									</label>
									<div className="relative">
										<input
											id="password"
											type={showPassword ? "text" : "password"}
											placeholder="*****"
											className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500 pr-10" // Tambahkan padding di kanan agar ikon mata tidak menutupi teks
											{...register("password")}
										/>
										<span className="absolute inset-y-0 right-0 flex items-center pr-2">
											{showPassword ? (
												<EyeOff
													onClick={togglePasswordVisibility}
													className="h-5 w-5 text-gray-500 cursor-pointer"
												/>
											) : (
												<Eye
													onClick={togglePasswordVisibility}
													className="h-5 w-5 text-gray-500 cursor-pointer"
												/>
											)}
										</span>
									</div>
								</div>

								<div className="mb-3">
									<button
										type="submit"
										className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md"
									>
										Sign Up
									</button>
								</div>
							</form>
						</FormProvider>
						<div className="text-center">
							<span className="text-xs text-gray-400 font-semibold">
								Already have an account?
							</span>
							<a
								href="/sign-in"
								className="text-xs font-semibold text-purple-700"
							>
								Sign In
							</a>
						</div>
					</div>
				</div>
				<div
					className="flex flex-wrap content-center justify-center rounded-r-md"
					style={{ width: "24rem", height: "32rem" }}
				>
					<img
						className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
						src="https://i.imgur.com/9l1A4OS.jpeg"
						alt="Login Background"
					/>
				</div>
			</div>
		</div>
	);
}
