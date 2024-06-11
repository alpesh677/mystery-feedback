import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/User";

export async function POST(request: Request) {
	await dbConnect();

	const { username, content } = await request.json();

	try {
		const user = await UserModel.findOne({ username }).exec();

		if (!user) {
			return Response.json(
				{
					message: "User not found",
					success: false,
				},
				{
					status: 404,
				},
			);
		}

		if (!user.isAcceptingMessage) {
			return Response.json(
				{
					message: "User is not accepting message",
					success: false,
				},
				{
					status: 403,
				},
			);
		}
		const newMessage = { content, createdAt: new Date() };

		user.messages.push(newMessage as Message);

		await user.save();

		return Response.json(
			{
				message: "Message sent successfully",
				success: true,
			},
			{
				status: 201,
			},
		);
	} catch (error) {
        console.error("Error Adding message :", error);
        return Response.json(
            {
                message : "Internal Server error",
                success : false
            },
            {
                status : 500
            }
        )
    }
}
