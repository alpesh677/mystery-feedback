'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCompletion } from "ai/react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "@/components/ui/use-toast";

const specialChar = "||";

const intialMessageString =
	"What's a childhood memory that brings a smile to your face?  ||  What's an unconventional but satisfying way you spend your free time? || What's a skill you're eager to learn or improve? ";

const parseStringMessages = (messageString: string): string[] => {
	return messageString.split(specialChar);
};

export default function SendMessage() {
	const params = useParams<{ username: string }>();
	const username = params.username;

	const {
		complete,
		completion,
		error,
		isLoading: isSuggestLoading,
	} = useCompletion({
		api: "/api/suggest-messages",
		initialCompletion: intialMessageString,
	});

	const form = useForm<z.infer<typeof messageSchema>>({
		resolver: zodResolver(messageSchema),
	});

	const messageContent = form.watch("content");

	const [isLoading, setIsLoading] = useState(false);

	const handleMessageCLick = (message: string) => {
		form.setValue("content", message);
	};

	const onSubmit = async (data: z.infer<typeof messageSchema>) => {
		setIsLoading(true);

		try {
			const response = await axios.post<ApiResponse>(
				"/api/send-message",
				{
					...data,
					username,
				},
			);

			toast({
				title: response.data.message,
				variant: "default",
			});
			form.reset({ ...form.getValues(), content: "" });
		} catch (error) {
			const axiosError = error as AxiosError<ApiResponse>;
			toast({
				title: "Error",
				description:
					axiosError.response?.data.message ??
					"Failed to sent message",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const fetchSuggestMessages = async () => {
		try {
			complete("");
		} catch (error: any) {
			toast({
				title: "error",
				description: error,
				variant: "destructive",
			});
		}
	};

	return (
		<div className="container mx-auto my-8 p-6 bg-white rounded max-w-xl">
			<h1 className="text-4xl font-bold mb-6 text-center">
				Public Profile Link
			</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<FormField
						name="content"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Send Anonymous Message to @{username}
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Write your anonymous message here"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex justify-center">
						{isLoading ? (
							<Button disabled>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							</Button>
						) : (
							<Button
								type="submit"
								disabled={isLoading || !messageContent}
							>
								Send It
							</Button>
						)}
					</div>
				</form>
			</Form>

			<div className="space-y-4 my-8">
				<div className="space-y-2">
					<Button onClick={fetchSuggestMessages} className="my-4">
						Suggest Messages ( A.I )
					</Button>
					<p className="">Click any Message below to select it.</p>
				</div>
				<Card>
					<CardHeader>
						<h3 className="text-xl font-semibold">Messages</h3>
					</CardHeader>
					<CardContent className="max-w-fit flex flex-col space-y-4 items-center justify-center">
						{error ? (
							<p className="text-red-500">{error.message}</p>
						) : (
							parseStringMessages(completion).map(
								(message, index) => (
									<Button
										key={index}
										variant={"outline"}
										className="mb-2 max-w-fit"
										onClick={() =>
											handleMessageCLick(message)
										}
									>
										{isSuggestLoading ? (
											<>
												<Loader2 className="w-5 h-5 text-black animate-spin mr-2" />
												Casting magic spell
											</>
										) : (
											<span>{message}</span>
										)}
									</Button>
								),
							)
						)}
					</CardContent>
				</Card>
			</div>
			<Separator className="my-6" />
			<div className="text-center">
				<div className="mb-4">Get Your Message Board</div>
				<Link href={"/sign-up"}>
					<Button>Create Your Account</Button>
				</Link>
			</div>
		</div>
	);
}
