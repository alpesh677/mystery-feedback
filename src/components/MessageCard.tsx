import { Message } from "@/model/User";
import React from "react";
import { useToast } from "./ui/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import dayjs from "dayjs"

type MessageCardProps = {
	message: Message;
	onMessageDelete: (messageId: string) => void;
};

function MessageCard({ message, onMessageDelete }: MessageCardProps) {
	const { toast } = useToast();

	const handleDeleteConfirm = async () => {
		try {
			const response = await axios.delete<ApiResponse>(
				`/api/delete-message/${message._id}`,
			);

			toast({
				title: response.data.message,
			});
			onMessageDelete(message._id);
		} catch (error) {
			const axiosError = error as AxiosError<ApiResponse>;
			toast({
				title: "Error",
				description:
					axiosError.response?.data?.message ??
					"Failed to delete message",
				variant: "destructive",
			});
		}
	};

	return (
		<Card className="card-bordered">
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle>{message.content}</CardTitle>
					<AlertDialog>
						<AlertDialogTrigger asChild>
                            <Button variant={"destructive"}>
                                <X className="w-5 h-5"/>
                            </Button>
                        </AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will
									permanently delete this message.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
                <div className="text-sm">
                    {dayjs(message.createdAt).format('MMM DD, YYYY hh:mm A')};
                </div>
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}

export default MessageCard;