"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { emailSchema } from "@/schemas/emailSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import forgotPassword from "../../../../public/Forgot password-amico.svg";
import { Loader2 } from "lucide-react";

export default function ForgotPassword() {
	const router = useRouter();
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);


	const form = useForm<z.infer<typeof emailSchema>>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(data: z.infer<typeof emailSchema>) {
		try {
			setIsSubmitting(true)
			const response = await axios.post("/api/forgot-password", data);
			
			if (response.status === 200) {
				toast({
					title : "OTP sent successfully",
					variant : "default"
				})
				router.push(`/forgot-password/${data.email}`);
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
		<div className="flex min-h-[90vh] items-center justify-center px-4 py-12 md:py-24 lg:py-32 bg-white dark:bg-[#0d0d0d]">
			<div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
				<Image
					src={forgotPassword}
					width={470}
					height={470}
					alt="Illustration"
					className="mx-auto aspect-square overflow-hidden rounded-xl object-cover lg:order-first"
				/>
				<div className="space-y-4 lg:order-last">
					<div className="text-center lg:text-left">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
							Forgot Password
						</h1>
						<p className="mt-2 text-base text-gray-600 dark:text-gray-300">
							Enter your email to reset your password.
						</p>
					</div>

					<Form {...form}>
						<form
							className="space-y-4"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<FormField
								name="email"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-lg">
											Email Address
										</FormLabel>
										<FormControl>
											<Input
												placeholder="please enter your email"
												type="email"
												required
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full">
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
									Please wait
								</>
							) : (
								"Reset Password"
							)}
							</Button>
						</form>
					</Form>
					<div className="text-center lg:text-left text-sm text-gray-600">
						<Link
							href={"/sign-up"}
							className="font-medium text-gray-900 hover:underline dark:text-gray-200"
						>
							Back to Signup
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
