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
import React from "react";
import { useForm } from "react-hook-form";

interface passwordProp {
	password: string;
	confirmPassword: string;
}
export default function ChangePassword() {
	const router = useRouter();
	const params = useParams();
	const { toast } = useToast();

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
			console.log("password", data.password);
			console.log("CPass", data.confirmPassword);
			if (data.password !== data.confirmPassword) {
				throw new Error("Password and confirm Password do not match");
			}

			const response = await axios.patch("/api/change-password");
			if (response.status === 200) {
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
		}
	}
	return (
		<div className="flex justify-center items-center min-h-[80vh]">
			<div className="w-full max-w-4xl p-8 space-y-8 lg:space-y-0 lg:space-x-20 lg:flex lg:items-center">
				<Image
					src={resetPassword}
					width={370}
					height={370}
					alt="Illustration"
					className="mx-auto aspect-square overflow-hidden rounded-xl object-cover lg:order-first"
				/>
				<div className="w-full max-w-md space-y-8 lg:order-last">
					<div className="text-center lg:text-left">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900">
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
												type="password"
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
												type="password"
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
							<Button type="submit" className="w-full">
								Submit
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}
