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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const VerifyAccount = () => {
	const router = useRouter();
	const params = useParams();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof verifySchema>>({
		resolver: zodResolver(verifySchema),
	});

	const onSubmit = async (data: z.infer<typeof verifySchema>) => {
		try {
			const response = await axios.post<ApiResponse>(`/api/verify-code`, {
				username: params.username,
				code: data.code,
			});

			toast({
				title: "Success",
				description: response.data.message,
			});

			router.replace("/sign-in");
		} catch (error) {
			const axiosError = error as AxiosError<ApiResponse>;
			toast({
				title: "verification failed",
				description:
					axiosError.response?.data?.message ??
					"An error occured. Please try again later",
				variant: "destructive",
			});
		}
	};
	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-[#010101]">
			<div className="w-full max-w-md p-8 space-y-8 bg-white  dark:bg-[#0d0d0d] dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 rounded-lg shadow-md border border-sky-500">
				<div className="text-center">
					<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
						Verify Your Account
					</h1>
					<p className="mb-4 dark:text-gray-100">
						Enter the verification code sent to your email
					</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							name="code"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="dark:text-gray-100">Verification Code</FormLabel>
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
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit">Verify</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default VerifyAccount;
