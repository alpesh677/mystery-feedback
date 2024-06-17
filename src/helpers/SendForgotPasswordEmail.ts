import nodemailer from "nodemailer";
import { ApiResponse } from "@/types/ApiResponse";
import {generateForgotPasswordEmail} from "../../emails/forgotPasswordEmail"

export async function sendEmailVerificationEmail(
	username: string,
	email: string,
	verifyCode: string,
): Promise<ApiResponse> {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});
		console.log("this is properties:", { username, email, verifyCode });

        const emailContent = generateForgotPasswordEmail({
            username,
            otp:verifyCode
        })
		
		const info = await transporter.sendMail({
			from: "mysteryfeedback4@gmail.com",
			to: email,
			subject: "Forgot Password OTP",
			html: emailContent,
		});

		return {
			success: true,
			message: "forgot email otp sent successfully",
		};
	} catch (emailError) {
		console.log("Error sending  email:", emailError);
		return {
			success: false,
			message: "Failed to send verification email",
		};
	}
}