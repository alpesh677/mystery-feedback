import nodemailer from "nodemailer";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/VerificationEmail";

interface VerificationEmailProps {
	username: string;
	otp: string;
}
function generateVerificationEmail({
	username,
	otp,
}: VerificationEmailProps): string {
	return `
	  <!DOCTYPE html>
	  <html lang="en">
		<head>
		  <meta charset="UTF-8" />
		  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		  <title>Verification Code</title>
		  <style>
			body {
			  font-family: 'Poppins', sans-serif;
			  margin: 0;
			  background: #ffffff;
			  font-size: 14px;
			}
			.container {
			  max-width: 680px;
			  margin: 0 auto;
			  padding: 45px 30px 60px;
			  background: #f4f7ff;
			  background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
			  background-repeat: no-repeat;
			  background-size: 800px 452px;
			  background-position: top center;
			  color: #1f1f1f;
			}
			header h1 {
			  font-size: 28px;
			  margin-bottom: 0;
			}
			main {
			  margin-top: 70px;
			  padding: 92px 30px 115px;
			  background: #ffffff;
			  border-radius: 30px;
			  text-align: center;
			}
			h1 {
			  font-size: 24px;
			  font-weight: 500;
			  color: #1f1f1f;
			  margin-top: 0;
			}
			p {
			  font-size: 16px;
			  font-weight: 500;
			  margin-top: 17px;
			  letter-spacing: 0.56px;
			  color:#1f1f1f;
			}
			.otp {
			  font-size: 40px;
			  font-weight: 600;
			  letter-spacing: 25px;
			  color: #ba3d4f;
			  margin-top: 60px;
			}
			footer {
			  width: 100%;
			  max-width: 490px;
			  margin: 20px auto 0;
			  text-align: center;
			  border-top: 1px solid #e6ebf1;
			}
			footer p {
			  font-size: 16px;
			  font-weight: 600;
			  color: #434343;
			  margin-top: 40px;
			}
			footer p:last-child {
			  margin-top: 16px;
			}
		  </style>
		</head>
		<body>
		  <div class="container">
			<header>
			  <h1>Mystery Feedback</h1>
			</header>
			<main>
			  <div>
				<h1>Your OTP</h1>
				<p>Hey ${username},</p>
				<p>
				  Thank you for registering. Please use the following verification code to complete your registration.
				  OTP is valid for <span style="font-weight: 600; color: #1f1f1f">5 minutes</span>. Do not share this code with others.
				</p>
				<p class="otp">${otp}</p>
			  </div>
			</main>
			<footer>
			  <p>Mystery feedback</p>
			  <p>Copyright © 2024 Company. All rights reserved.</p>
			</footer>
		  </div>
		</body>
	  </html>
	`;
}



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

		const emailContent = generateVerificationEmail({
			username,
			otp: verifyCode,
		});
		const info = await transporter.sendMail({
			from: "mysteryfeedback4@gmail.com",
			to: email,
			subject: "Mystery feedback Verification Code",
			html: emailContent,
		});

		return {
			success: true,
			message: "Verification email sent successfully",
		};
	} catch (emailError) {
		console.log("Error sending verification email:", emailError);
		return {
			success: false,
			message: "Failed to send verification email",
		};
	}
}

// import VerificationEmail from "../../emails/VerificationEmail";
// import { ApiResponse } from "@/types/ApiResponse";
// import Mailjet from "node-mailjet";
// import mailjet from "node-mailjet";

// const mailjetClient = mailjet.apiConnect(
// 	process.env.MAILJET_API!,
// 	process.env.MAILJET_SECRET!,
// );

// export async function sendEmailVerificationEmail(
// 	username: string,
// 	email: string,
// 	verifyCode: string,
// ): Promise<ApiResponse> {
// 	try {
// 		console.log("this is properties : ", username, email, verifyCode);

// 		const emailContent = VerificationEmail({ username, otp: verifyCode });

// 		const request = mailjetClient
// 			.post("send", { version: "v3.1" })
// 			.request({
// 				Messages: [
// 					{
// 						From: {
// 							Email: "onboarding@resend.dev",
// 							Name: "Your Name",
// 						},
// 						To: [
// 							{
// 								Email: email,
// 								Name: username,
// 							},
// 						],
// 						Subject: "Mystry Message Verification Code",
// 						HTMLPart: emailContent,
// 						CustomID: "VerificationEmail",
// 					},
// 				],
// 			});

// 		const result = await request;
// 		console.log(result.body);

// 		return {
// 			success: true,
// 			message: "Verification email sent successfully",
// 		};
// 	} catch (emailError) {
// 		console.log("Error sending verification email:", emailError);
// 		return {
// 			success: false,
// 			message: "Failed to send verification email",
// 		};
// 	}
// }

// import { resend } from "@/lib/resend";
// import VerificationEmail from "../../emails/VerificationEmail";
// import { ApiResponse } from "@/types/ApiResponse";

// export async function sendEmailVerificationEmail(
// 	username: string,
// 	email: string,
// 	verifyCode: string,
// ): Promise<ApiResponse> {
// 	try {
// 		console.log("this is properties : ",username, email,verifyCode)
// 		await resend.emails.send({
// 			from: "onboarding@resend.dev",
// 			to: email,
// 			subject: "Mystry Message Verification Code",
// 			react: VerificationEmail({username, otp:verifyCode}),
// 		});

//         return {
//             success : true,
//             message : "Verification email sent successfully"
//         };
// 	} catch (emailError) {
// 		console.log("Error sending verification email:", emailError);
// 		return {
// 			success: false,
// 			message: "failed to send a verification email",
// 		};
// 	}
// }
