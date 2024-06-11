import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request: Request) {
	await dbConnect();
	const session = await getServerSession(authOptions);
	const _user: User = session?.user as User;

	if (!session || !_user) {
		return Response.json(
			{ success: false, message: "Not authenticated" },
			{ status: 401 },
		);
	}
	const userId = new mongoose.Types.ObjectId(_user._id);
	console.log(_user._id);
	try {
		const user = await UserModel.aggregate([
			{ $match: { _id: userId } },
			{ $unwind: '$messages' },
			{ $sort: { "messages.createdAt": -1 } },
			{ $group: { _id: "$_id", messages: { $push: "$messages" } } },
		]).exec();

		if (!user || user.length === 0) {
			return Response.json(
				{ message: "User not found", success: false },
				{ status: 404 },
			);
		}

		return Response.json(
			{ messages: user[0].messages },
			{
				status: 200,
			},
		);
	} catch (error) {
		console.error("An unexpected error occurred:", error);
		return Response.json(
			{ message: "Internal server error", success: false },
			{ status: 500 },
		);
	}
}

// import dbConnect from "@/lib/dbConnect";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]/options";
// import UserModel from "@/model/User";
// import { User } from "next-auth";
// import mongoose from "mongoose";

// export async function GET(request: Request) {
// 	await dbConnect();

// 	const session = await getServerSession(authOptions);
// 	console.log(session)
// 	const _user: User = session?.user as User;

// 	if (!session || !_user) {
// 		return Response.json(
// 			{
// 				success: false,
// 				message: "Not Authenticated",
// 			},
// 			{
// 				status: 401,
// 			},
// 		);
// 	}

// 	console.log("User id in get message route : ", _user);
// 	const userId = new mongoose.Types.ObjectId(_user._id);
// 	// console.log("userId", userId);
// 	try {
// 		const user = await UserModel.aggregate([
// 			{
// 				$match: {
// 					_id: userId,
// 				},
// 			},
// 			{
// 				$unwind: "$messages",
// 			},
// 			{
// 				$sort: {
// 					"messages.createdAt": -1,
// 				},
// 			},
// 			{
// 				$group: {
// 					_id: "$_id",
// 					messages: {
// 						$push: "$messages",
// 					},
// 				},
// 			},
// 		]).exec();

// 		console.log("aggregation user:",user)

// 		if (!user || user.length === 0) {
// 			return Response.json(
// 				{
// 					success: false,
// 					message: "User not Found",
// 				},
// 				{ status: 404 },
// 			);
// 		}

// 		return Response.json(
// 			{
// 				message: user[0].messages,
// 			},
// 			{
// 				status: 200,
// 			},
// 		);
// 	} catch (error) {
//         console.error("An unexpected Error occured : ", error);
//         return Response.json(
//             {
//                 message : "Internal Server Error",
//                 success : false
//             },
//             {
//                 status : 500
//             }
//         )
//     }
// }
