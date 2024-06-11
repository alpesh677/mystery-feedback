import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
	await dbConnect();

	try {
		const { username, code } = await request.json();
		const decodeUsername = decodeURIComponent(username);
		const user = await UserModel.findOne({ username: decodeUsername });

		if (!user) {
			return Response.json(
				{
					success: false,
					message: "User not found",
				},
				{ status: 400 },
			);
		}

		const isCodeValid = user.verifyCode === code;
		const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();

		if (isCodeValid && isCodeExpired) {
			user.isVerified = true;
			await user.save();

			return Response.json(
				{
					success: true,
					message: "Account verified successfully",
				},
				{ status: 200 },
			);
		} else if (!isCodeExpired) {
			return Response.json(
				{
					success: false,
					message:
						"Verification code has Expired. Please sign up again to get a new code",
				},
				{ status: 400 },
			);
		} else {
			return Response.json(
				{
					success: false,
					message: "Incorrect verification code",
				},
				{ status: 400 },
			);
		}
	} catch (error) {
		console.error("error verifiying user :", error);
		return Response.json(
			{
				success: false,
				message: "error verifying user",
			},
			{ status: 500 },
		);
	}
}
