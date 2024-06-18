import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { SendForgotPasswordEmail } from "@/helpers/SendForgotPasswordEmail";

export async function POST(request: Request) {
	await dbConnect();

	try {
		const { email } = await request.json();
		console.log(email);
		if (!email) {
			return Response.json(
				{
					success: false,
					message: "Please enter the Email",
				},
				{ status: 400 },
			);
		}

		const existingUser = await UserModel.findOne({ email });
		if (!existingUser) {
			return Response.json(
				{
					success: false,
					message: "We cannot find any user by this email.",
				},
				{ status: 404 },
			);
		}

		const username = existingUser.username;
		const verifyCode = Math.floor(
			100000 + Math.random() * 900000,
		).toString();
		existingUser.verifyCode = verifyCode;
		existingUser.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);

		await existingUser.save();
		const emailResponse = await SendForgotPasswordEmail(
			username,
			email,
			verifyCode,
		);

		return Response.json(
			{
				success: true,
				message: "User Found",
			},
			{ status: 200 },
		);
	} catch (error) {
		return Response.json(
			{
				success: false,
				message: "Error while fetching user",
			},
			{ status: 500 },
		);
	}
}
