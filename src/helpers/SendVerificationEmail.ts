import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendEmailVerificationEmail(
	username: string,
	email: string,
	verifyCode: string,
): Promise<ApiResponse> {
	try {
		console.log("this is properties : ",username, email,verifyCode)
		await resend.emails.send({
			from: "onboarding@resend.dev",
			to: email,
			subject: "Mystry Message Verification Code",
			react: VerificationEmail({username, otp:verifyCode}),
		});

        return {
            success : true,
            message : "Verification email sent successfully"
        };
	} catch (emailError) {
		console.log("Error sending verification email:", emailError);
		return {
			success: false,
			message: "failed to send a verification email",
		};
	}
}
