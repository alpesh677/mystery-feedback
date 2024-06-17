import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
	await dbConnect();

	try {
		const { email, code } = await request.json();
		const decodedEmail = decodeURIComponent(email);

		if (!email) {
			return Response.json(
				{
					success: false,
					message: "Email not found",
				},
				{ status: 404 },
			);
		}

		const user = await UserModel.findOne({ email: decodedEmail });
		if (!user) {
			return Response.json(
				{
					success: false,
					message: "User not found with this email",
				},
				{ status: 404 },
			);
		}

		const isCodeValid = code === user.verifyCode && user.verifyCodeExpiry;
		const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();

		if (isCodeExpired && isCodeExpired) {
			return Response.json(
				{
					success: true,
					message: "OTP verified successfully",
				},
				{ status: 200 },
			);
		} else if (!isCodeExpired) {
			return Response.json(
				{
					success: false,
					message: "OPT is expired Please generate a new OTP",
				},
				{ status: 400 },
			);
		} else {
			return Response.json(
				{
					success: false,
					message: "Incorrect OTP please verify your code",
				},
				{ status: 400 },
			);
		}
	} catch (error) {
		console.log("error entering forgot password otp : ", error);
		return Response.json(
			{
				success: false,
				message: "Error finding user",
			},
			{ status: 500 },
		);
	}
}