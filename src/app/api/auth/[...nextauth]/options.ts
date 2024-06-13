import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "abc@gmail.com",
				},
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials: any): Promise<any> {
				await dbConnect();
				try {
					const user = await UserModel.findOne({
						$or: [
							{ email: credentials.identifier },
							{ username: credentials.identifier },
						],
					});

					if (!user) {
						throw new Error("No user found with this email");
					}

					if (!user.isVerified) {
						throw new Error("Please verify your account first");
					}

					const isPasswordCorrect = await bcrypt.compare(
						credentials.password,
						user.password,
					);
					if (isPasswordCorrect) {
						return user;
					} else {
						throw new Error("Incorrect password");
					}
				} catch (error: any) {
					throw new Error(error);
				}
			},
		}),

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),

		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
		TwitterProvider({
			clientId: process.env.X_CLIENT_ID!,
			clientSecret: process.env.X_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async jwt({ token, user, account, profile }) {
			if (user) {
				token._id = user._id?.toString();
				token.isVerified = user.isVerified;
				token.isAcceptingMessages = user.isAcceptingMessages;
				token.username = user.username;
			}

			if (
				(account?.provider === "google" ||
					account?.provider === "github" || account?.provider === "twitter") &&
				profile
			) {
				const { email } = profile;

				if (email?.endsWith("@gmail.com")) {
					try {
						await dbConnect();
						const foundUser = await UserModel.findOne({ email });

						token._id = foundUser?.id.toString();
						token.username = foundUser?.username;
						token.isVerified = foundUser?.isVerified;
						token.isAcceptingMessages =
							foundUser?.isAcceptingMessage;
					} catch (error) {
						console.error("Error signing in with Google", error);
						throw new Error("Error signing with Google");
					}
				}
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user._id = token._id;
				session.user.isVerified = token.isVerified;
				session.user.isAcceptingMessages = token.isAcceptingMessages;
				session.user.username = token.username;
			}
			return session;
		},
		async signIn({ account, profile }) {
			if (
				(account?.provider === "google" ||
					account?.provider === "github" ||  account?.provider === "twitter") &&
				profile
			) {
				const { email, name } = profile;
				// console.log("Github profile : ", profile);
				if (email?.endsWith("@gmail.com")) {
					try {
						await dbConnect();
						let foundUser = await UserModel.findOne({ email });

						if (foundUser) {
							console.error(
								"User already exists with email:",
								email,
							);
							return false;
						}

						if (!foundUser) {
							const random = Math.floor(
								100 + Math.random() * 900,
							).toString();
							const username = name
								?.split(" ")[0]
								.concat(random)
								.toLowerCase();
							const new_user = new UserModel({
								username,
								email,
								isVerified: true,
								isAcceptingMessages: true,
								verifyCodeExpiry: Date.now(),
								verifyCode: random,
								password: random,
							});

							await new_user.save({ validateBeforeSave: false });
							return true;
						}
						return true;
					} catch (error) {
						console.error("Error signing in with Google", error);
						throw new Error("Error signing in with Google");
					}
				}
				return false;
			}
			return true;
		},
		async redirect({ baseUrl }) {
			return baseUrl;
		},
	},
	pages: {
		signIn: "/sign-in",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
