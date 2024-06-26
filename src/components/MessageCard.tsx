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
                            <Button className="p-2 h-8 w-10 dark:bg-red-700" variant={"destructive"}>
                                <X className="h-5 w-5"/>
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
								<AlertDialogCancel className="dark:bg-white dark:text-black">Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 dark:text-white">Continue</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
                <div className="text-sm pt-3">
                    {dayjs(message.createdAt).format('MMM DD, YYYY hh:mm A')};
                </div>
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}

export default MessageCard;
