"use client";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import googleSvg from "../../../../public/google.svg";
import githubSvg from "../../../../public/github.svg";
import { useState } from "react";

const SignInForm = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			identifier: "",
			password: "",
		},
	});

	const { toast } = useToast();

	const onSubmit = async (data: z.infer<typeof signInSchema>) => {
		const result = await signIn("credentials", {
			redirect: false,
			identifier: data.identifier,
			password: data.password,
		});

		if (result?.error) {
			toast({
				title: "Login Failed",
				description: result.error,
				variant: "destructive",
			});
		}

		if (result?.url) {
			router.replace("/dashboard");
		}
	};

	const [errorMessage, setErrorMessage] = useState("");
	const handleSignIn = async (provider: string) => {
		const result = await signIn(provider, { redirect: false });

		if (!result) {
			setErrorMessage("User already exists with this email.");
		} else {
			setErrorMessage("");
		}
	};


	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-200">
			<div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
				<div className="text-center">
					<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
						Welcome Back to True Feedback
					</h1>
					<p className="mb-4">
						Sign in to Continue your secret conversations.
					</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							name="identifier"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email/Username</FormLabel>
									<Input {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="password"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<Input type="password" {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="w-full" type="submit">
							Sign In
						</Button>
					</form>
				</Form>
				<div className="text-center mt-4">
					<p className="">
						Not a member yet?{" "}
						<Link
							href={"/sign-up"}
							className="text-blue-600 hover:text-blue-800"
						>
							Sign up
						</Link>
					</p>
				</div>
				<div className="flex items-center">
					<hr className="flex-grow border-t border-gray-300" />
					<span className="px-3 text-black font-bold">
						OR
					</span>
					<hr className="flex-grow border-t border-gray-300" />
				</div>
				<div className="flex flex-col space-y-3">
					<Button
						onClick={() => signIn("google")}
						className="py-2 px-4 max-w-md flex justify-center items-center bg-black hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
					>
						<Image
							src={googleSvg}
							alt="googlesvg"
							className="scale-50"
							onClick={() => signIn("google")}
						></Image>{" "}
						Sign in with Google
					</Button>
					<Button
						onClick={() => handleSignIn("github")}
						className="py-2 px-4 max-w-md flex justify-center items-center bg-black hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="currentColor"
							className="mr-2"
							viewBox="0 0 1792 1792"
						>
							<path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
						</svg>{" "}
						Sign in with Github
					</Button>
					<Button
						onClick={() => signIn("twitter")}
						className="py-2 px-4 max-w-md flex justify-center items-center bg-black hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M8 2H1l8.26 11.015L1.45 22H4.1l6.388-7.349L16 22h7l-8.608-11.478L21.8 2h-2.65l-5.986 6.886zm9 18L5 4h2l12 16z"
							/>
						</svg>
						&nbsp; Sign in with Twitter
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SignInForm;
