"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signupSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import googleSvg from "../../../../public/google.svg";
import githubSvg from "../../../../public/github-mark.svg"


function SignUp() {
	const { toast } = useToast();
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [usernameMessage, setUsernameMessage] = useState("");
	const [isCheckingUsername, setIsCheckingUsername] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [debouncedUsername, setDebouncedUsername] = useDebounceValue(
		username,
		500,
	);

	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		const checkUsernameUnique = async () => {
			if (debouncedUsername) {
				setIsCheckingUsername(true);
				setUsernameMessage("");
				try {
					const response = await axios.get(
						`/api/check-username-unique?username=${debouncedUsername}`,
					);
					setUsernameMessage(response.data.message);
					console.log("username Message : ", usernameMessage);
				} catch (error) {
					const axiosError = error as AxiosError<ApiResponse>;
					setUsernameMessage(
						axiosError.response?.data.message ??
							"error checking username",
					);
				} finally {
					setIsCheckingUsername(false);
				}
			}
		};
		checkUsernameUnique();
	}, [debouncedUsername]);

	const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
		setIsSubmitting(true);
		try {
			const response = await axios.post<ApiResponse>(
				"/api/sign-up",
				data,
			);
			toast({
				title: "Success",
				description: response.data.message,
			});

			router.replace(`/verify/${username}`);
			setIsSubmitting(false);
		} catch (error: any) {
			console.error("Error in signup of user", error);
			const axiosError = error as AxiosError<ApiResponse>;
			let errorMessage = axiosError.response?.data?.message;
			toast({
				title: "Sign up failed",
				description: errorMessage,
				variant: "destructive",
			});
			setIsSubmitting(false);
		}
	};

	const [errorMessage, setErrorMessage] = useState("");

	const handleSignIn = async (provider:string) => {
		const result = await signIn(provider,{ redirect: false });

		if (!result) {
			setErrorMessage("User already exists with this email.");
		} else {
			setErrorMessage("");
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-800">
			<div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
				<div className="text-center">
					<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
						Join Mystery Message
					</h1>
					<p className="mb-4">
						Sign up to start your anonymous adventure
					</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							name="username"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder="username"
											{...field}
											onChange={(e) => {
												field.onChange(e);
												setUsername(e.target.value);
											}}
										/>
									</FormControl>
									<FormDescription>
										{isCheckingUsername && (
											<Loader2 className="text-black ml-2 w-8 h-8 animate-spin" />
										)}
										<span
											className={`text-sm font-semibold ${
												usernameMessage ===
												"Username is available"
													? "text-green-500"
													: "text-red-500"
											}`}
										>
											{usernameMessage}
										</span>
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="email"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="email"
											{...field}
										/>
									</FormControl>
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
									<FormControl>
										<Input
											type="password"
											placeholder="password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className=""
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
									Please wait
								</>
							) : (
								"Signup"
							)}
						</Button>
					</form>
				</Form>
				<Button
					onClick={() => signIn("google")}
					className="mt-4 w-full"
				>
					<Image
						src={googleSvg}
						alt="googlesvg"
						className="scale-50"
						onClick={() => signIn("google")}
					></Image> Google
				</Button>
				<Button
					onClick={() => handleSignIn("github")}
					className="mt-4 w-full"
				>
					<Image
						src={githubSvg}
						alt="githubsvg"
						className="scale-50"
						onClick={() => handleSignIn("github")}
					></Image> Github
				</Button>
				{errorMessage && <p className="text-red-600">{errorMessage}</p>}
				<div className="text-center mt-4">
					<p>
						Already a member?{" "}
						<Link
							href="/sign-in"
							className="text-blue-600 hover:text-blue-800"
						>
							Sign-in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
