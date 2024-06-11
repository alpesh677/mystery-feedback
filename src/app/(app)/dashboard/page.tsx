"use client";

import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/model/User";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function userDashboard() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSwitchLoading, setIsSwitchLoading] = useState(false);

	const { toast } = useToast();
	const handleDeleteMessage = (messageId: string) => {
		setMessages(messages.filter((message) => message._id !== messageId));
	};

	const { data: session } = useSession();

	const form = useForm({
		resolver: zodResolver(AcceptMessageSchema),
	});

	const { register, watch, setValue,control } = form;
	const acceptMsg = watch("acceptMessages");

	// console.log(acceptMessages)

	const fetchAcceptMessages = useCallback(async () => {
		setIsSwitchLoading(true);

		try {
			const response = await axios.get<ApiResponse>(
				"/api/accept-messages",
			);
			setValue("acceptMessages", response.data.isAcceptingMessage);
		} catch (error) {
			const axiosError = error as AxiosError<ApiResponse>;
			console.log("Error in accept message : ", axiosError.response?.data.message);
			toast({
				title: "Error",
				description:
					axiosError.response?.data.message ??
					"Failed to fetch message settings",
				variant: "destructive",
			});
		} finally {
			setIsSwitchLoading(false);
		}
	}, [setValue]);

	const fetchMessages = useCallback(
		async (refresh: boolean = false) => {
			setIsLoading(true);
			setIsSwitchLoading(false);

			try {
				const response = await axios.get<ApiResponse>(
					"/api/get-messages",
				);
				setMessages(response.data.messages || []);

				if (refresh) {
					toast({
						title: "refreshed Messages",
						description: "Showing latest messages",
					});
				}
			} catch (error) {
				const axiosError = error as AxiosError<ApiResponse>;
				console.log("Error in fetch messages : ", axiosError.response?.data.message);
				toast({
					title: "error",
					description:
						axiosError.response?.data.message ??
						"Failed to fetch messages",
					variant: "destructive",
				});
			} finally {
				setIsLoading(false);
				setIsSwitchLoading(false);
			}
		},
		[setIsLoading, setMessages],
	);

	useEffect(() => {
		if (!session || !session.user) return;

		fetchMessages();
		fetchAcceptMessages();
	}, [session,setValue,fetchAcceptMessages,fetchMessages]);

	const handleSwithChange = async () => {
		try {
			const response = await axios.post<ApiResponse>(
				"/api/accept-messages",
				{
					acceptMesssages: !acceptMsg,
				},
			);

			console.log(response.data.isAcceptingMessage)

			setValue("acceptMessages",  response.data.isAcceptingMessage);

			toast({
				title: response.data.message,
				variant: "default",
			});
		} catch (error: any) {
			const axiosError = error as AxiosError<ApiResponse>;
			toast({
				title: "error",
				description:
					axiosError.response?.data.message ??
					"Failed to update message settings",
				variant: "destructive",
			});
		}
	};

	if (!session || !session.user) {
		return <div></div>;
	}

	const { username } = session.user as User;

	const baseUrl = `${window.location.protocol}//${window.location.host}`;
	const profileUrl = `${baseUrl}/u/${username}`;

	const copyToClipBoard = () => {
		navigator.clipboard.writeText(profileUrl);
		toast({
			title: "URL copied",
			description: "profile URL has been copied to clipboard",
		});
	};

	return (
		<div className="my-8 mx-4 md:mx-4 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
			<h1 className="text-4xl font-bold mb-4">User Dashboard</h1>
			<div className="mb-4">
				<h2 className="text-lg font-semibold mb-2">
					Copy Your Unique Link
				</h2>{" "}
				<div className="flex items-center">
					<input
						type="text"
						value={profileUrl}
						disabled 
						className="input border-input w-full p-2 mr-2"
					/>

					<Button onClick={copyToClipBoard}>Copy</Button>
				</div>
			</div>

			<div className="mb-4">
				<Switch
					{...register("acceptMessages")}
					checked={acceptMsg}
					onCheckedChange={handleSwithChange}
					disabled={isSwitchLoading}
				/>

				<span className="ml-2">
					Accept Messages : {acceptMsg ? "ON" : "OFF"}
				</span>
			</div>
			<Separator />
			<Button
				className="mt-4"
				variant={"outline"}
				onClick={(e) => {
					e.preventDefault();
					fetchMessages(true);
				}}
			>
				{isLoading ? (
					<Loader2 className="h-4 w-4 animate-spin" />
				) : (
					<RefreshCcw className="h-4 w-4" />
				)}
			</Button>

			<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
				{messages.length > 0 ? (
					messages.map((message, index) => (
						<MessageCard
							key={message._id}
							message={message}
							onMessageDelete={handleDeleteMessage}
						/>
					))
				) : (
					<p>No Message to display.</p>
				)}
			</div>
		</div>
	);
}

export default userDashboard;