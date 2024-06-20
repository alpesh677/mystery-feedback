"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import resetPassword from "../../../../../../public/Reset password-pana.svg";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface passwordProp {
	password: string;
	confirmPassword: string;
}
export default function ChangePassword() {
	const router = useRouter();
	const params = useParams();
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [togglePassword, setTogglePassword] = useState(false)


	const form = useForm<passwordProp>({
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = form;

	const password = watch("password");

	async function onChangePassword(data: passwordProp) {
		try {
			setIsSubmitting(true)
			if (data.password !== data.confirmPassword) {
				throw new Error("Password and confirm Password do not match");
			}

			const response = await axios.patch("/api/change-password",{
				email : params.email,
				password : data.password
			});
			if (response.status === 200) {
				toast({
					title : "password changed successfully",
					variant : "default"
				})
				router.push("/sign-in");
			}
		} catch (error) {
			console.log("Error in sending mail: ", error);
			const axiosError = error as AxiosError<ApiResponse>;
			let errorMessage = axiosError.response?.data.message;
			toast({
				title: "Failed to fetch Email",
				description: errorMessage,
				variant: "destructive",
			});
			setIsSubmitting(false)
		}
	}
	return (
		<div className="flex justify-center items-center dark:bg-[#0d0d0d] min-h-[89vh]">
			<div className="w-full max-w-4xl p-8 space-y-5 lg:space-y-0 lg:space-x-20 lg:flex lg:items-center">
				<Image
					src={resetPassword}
					width={370}
					height={370}
					alt="Illustration"
					className="mx-auto aspect-square overflow-hidden rounded-xl object-cover lg:order-first"
				/>
				<div className="w-full max-w-md space-y-2 lg:order-last">
					<div className="text-center lg:text-left">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
							Reset your password
						</h1>
					</div>
					<Form {...form}>
						<form
							className="space-y-8"
							onSubmit={form.handleSubmit(onChangePassword)}
						>
							<FormField
								name="password"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<Input
												autoComplete="off"
												className="pr-10"
												id="new-password"
												placeholder="Password"
												type={togglePassword ? "text" : "password"}
												{...register("password", {
													required:
														"Password is required",
												})}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="confirmPassword"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												autoComplete="off"
												className="pr-10"
												id="confirm-password"
												placeholder="Confirm Password"
												type={togglePassword ? "text" : "password"}
												{...register(
													"confirmPassword",
													{
														required:
															"Confirm Password is required",
														validate: (value) =>
															value ===
																form.getValues(
																	"password",
																) ||
															"Passwords do not match",
													},
												)}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex items-center space-x-2">
							<Checkbox
								id="show-password"
								onClick={()=>(
									setTogglePassword(!togglePassword)
								)}
							/>
							<Label htmlFor="show-password">Show Password {" "}</Label>
						</div>
							<Button type="submit" className="w-full dark:bg-green-600 dark:hover:bg-green-700 dark:text-white">
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
									Please wait
								</>
							) : (
								"Submit"
							)}
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}
