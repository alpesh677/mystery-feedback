import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
	await dbConnect();

	const session = await getServerSession(authOptions);
	const user: User = session?.user as User;

	if (!session || !session.user) {
		return Response.json(
			{
				success: false,
				message: "Not authenticated",
			},
			{
				status: 401,
			},
		);
	}

	const userId = user?._id;
	const { acceptMesssages } = await request.json();

	try {
		const updatedUser = await UserModel.findByIdAndUpdate(
			userId,
			{ isAcceptingMessage: acceptMesssages },
			{ new: true },
		);

		if (!updatedUser) {
			return Response.json(
				{
					success: false,
					message:
						"Unable to find user to update message acceptance status",
				},
				{ status: 404 },
			);
		}

		return Response.json(
			{
				success: true,
				message: "Message acceptance status updated successfully",
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error updataeding message acceptance status : ", error);
		return Response.json(
			{
				success: false,
				message: "Error updating message acceptance message",
			},
			{
				status: 500,
			},
		);
	}
}

export async function GET(request : Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if(!session || !user){
        return Response.json(
            {
                success : false,
                message : "Not authenticated"
            },
            {
                status : 401
            }
        )
    }

    try {
        const foundUser = await UserModel.findById(user._id);
    
        if(!foundUser) {
            return Response.json(
                {
                    success : false,
                    messsage : "User not Found"
                },
                {
                    status : 200
                }
            )
        }

        return Response.json(
            {
                success : true,
                isAcceptingMessagee : foundUser.isAcceptingMessage
            },
            {
                status : 200
            }
        )
    } catch (error) {
        console.error("Error Retrieving message Acceptance message : ", error);
        return Response.json(
            {
                success : false,
                message : "Error Retrieving message Acceptance message"
            },
            {
                status : 500
            }
        )
    }
}