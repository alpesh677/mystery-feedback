"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import enterOtp from "../../../../../public/Enter OTP-pana.svg";
import * as z from "zod";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordOTP() {
	const router = useRouter();
	const params = useParams();
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof verifySchema>>({
		resolver: zodResolver(verifySchema),
	});

	async function onSubmit(data: z.infer<typeof verifySchema>) {
		const emailParam = Array.isArray(params.email)
			? params.email[0]
			: params.email;
		const mail = decodeURIComponent(emailParam);
		console.log(mail);
		try {
			setIsSubmitting(true)
			const response = await axios.post("/api/forgot-password-verify", {
				email: params.email,
				code: data.code,
			});
			if (response.data.success) {
				router.push(`/forgot-password/${mail}/change-password`);
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
					src={enterOtp}
					width={370}
					height={370}
					alt="Illustration"
					className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
				/>
				<div>
                <div className="text-center lg:text-left mb-3 ">
						<h1 className="text-4xl font-bold tracking-tight dark:text-gray-300 text-gray-900">
                        Verify your account
						</h1>
						<p className="mt-2 text-base dark:text-gray-300 text-gray-600">
                        Enter the 6-digit code sent to your email.
						</p>
					</div>
					<Form {...form}>
						<form
							className="space-y-8 p-2"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<div className="justify-center items-center">
								<FormField
									name="code"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Verification Code
											</FormLabel>
											<FormControl>
												<InputOTP
													maxLength={6}
													{...field}
													className="text-black"
												>
													<InputOTPGroup>
														<InputOTPSlot
															index={0}
															className="bg-black/70 text-white"
														/>
														<InputOTPSlot
															index={1}
															className="bg-black/70 text-white"
														/>
														<InputOTPSlot
															index={2}
															className="bg-black/70 text-white"
														/>
														<InputOTPSlot
															index={3}
															className="bg-black/70 text-white"
														/>
														<InputOTPSlot
															index={4}
															className="bg-black/70 text-white"
														/>
														<InputOTPSlot
															index={5}
															className="bg-black/70 text-white"
														/>
													</InputOTPGroup>
												</InputOTP>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<Button type="submit" className="w-full">
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
									Please wait
								</>
							) : (
								"Verify"
							)}
							</Button>
						</form>
					</Form>
					<div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
						Didn&lsquo;t receive the code?
						<Link
							className="font-medium text-blue-600 hover:underline dark:text-blue-500"
							href="#"
						>
							Resend
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
