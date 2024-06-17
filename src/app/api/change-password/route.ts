import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
	await dbConnect();

	try {
		const { email, password } = await request.json();
		const decodedEmail = decodeURIComponent(email);

		const user = await UserModel.findOne({ email: decodedEmail });

		if (!user) {
			return Response.json(
				{
					success: false,
					message: "User not found",
				},
				{ status: 404 },
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword;
		await user.save();

		return Response.json(
			{
				success: true,
				message: "Password Changed successfully",
			},
			{ status: 200 },
		);
	} catch (error) {
		return Response.json(
			{
				success: false,
				message: "Error while changing password",
			},
			{ status: 500 },
		);
	}
}
