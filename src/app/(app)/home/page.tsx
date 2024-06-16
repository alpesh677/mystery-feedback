"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade"
import messaages from "@/messages.json";
import { Mail } from "lucide-react";

export default function page() {
	return (
		<>
			<main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
				<section className="text-center mb-8 md:mb-12">
					<h1 className="text-3xl md:text-5xl font-bold">
						Dive Into the World of Anonymous Feedback
					</h1>
					<p className="mt-3 md:mt-3 text-base md:text-lg">
						True Feedback- Where your Indentity remains a secret.
					</p>
				</section>
				<Carousel
					plugins={
						[
						Autoplay({
							delay: 2000,
							stopOnMouseEnter: true,
						}),
					]}
					opts={{
						align: "center",
						containScroll: false
					}}
					className="w-full max-w-lg md:max-w-xl"
				>
					<CarouselContent>
						{messaages.map((message, index) => (
							<CarouselItem key={index} className="p-4">
								<Card>
									<CardHeader>
										<CardTitle>{message.title}</CardTitle>
									</CardHeader>
									<CardContent className="flex flex-col md:flex-row items-start space-y-0 md:space-x-4">
										<Mail className="flex-shrink-0" />
										<div>
											<p>{message.content}</p>
											<p className="text-xs text-muted-foreground">
												{message.received}
											</p>
										</div>
									</CardContent>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</main>
			<footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
				&copy; 2024 True Feedback. All rights reserved.
			</footer>
		</>
	);
}



// "use client";

// import Link from "next/link";
// import {
// 	Carousel,
// 	CarouselContent,
// 	CarouselItem,
// 	CarouselPrevious,
// 	CarouselNext,
// } from "@/components/ui/carousel";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import connectedWorld from "../../../../public/Connected world.svg";
// import websiteCreator from "../../../../public/Website Creator.svg";
// import innovation from "../../../../public/Innovation-pana.svg";
// import Autoplay from "embla-carousel-autoplay";
// import Image from "next/image";
// import Footer from "@/components/Footer";
// import { Code } from "lucide-react";

// export default function Home() {
// 	const year = new Date().getFullYear();
// 	return (
// 		<>
// 			<div className="flex flex-col min-h-[80dvh]">
// 				<section className="flex items-center justify-center px-4 py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
// 					<div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
// 						<div className="space-y-4">
// 							<h1 className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
// 								Mystery Feedback
// 							</h1>
// 							<p className="text-gray-700 dark:text-gray-400 text-lg md:text-xl">
// 								Voice Your Thoughts, Maintain the Mystery.
// 							</p>
// 							<br />
// 							<br />
// 							<br />
// 							<div>
// 								<p className="text-center text-3xl font-semibold mb-4">
// 									Get Started Today!
// 								</p>
// 								<p className="font-light text-base m-3">
// 									Empower yourself with candid feedback and
// 									genuine messages. With Mystery Feedback,
// 									generate a unique link, share it with
// 									anyone, and receive honest, anonymous
// 									responses without revealing your identity.
// 								</p>
// 							</div>
// 							<div className="flex flex-col gap-2 sm:flex-row justify-center items-center">
// 								<Link
// 									href={"/sign-up"}
// 									className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
// 									prefetch={false}
// 								>
// 									Sign Up
// 								</Link>
// 								<Link
// 									href={"/sign-in"}
// 									className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
// 									prefetch={false}
// 								>
// 									Log In
// 								</Link>
// 							</div>
// 						</div>
// 						<Image
// 							src={connectedWorld}
// 							width={550}
// 							height={550}
// 							alt="Illustration"
// 							className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
// 						/>
// 					</div>
// 				</section>
// 				<section className="flex items-center justify-center px-4 py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
// 					<div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
// 						<Image
// 							src={websiteCreator}
// 							width={450}
// 							height={450}
// 							alt="Illustration"
// 							className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
// 						/>
// 						<div className="space-y-4">
// 							<h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
// 								How it Works
// 							</h2>
// 							<p className="text-base tracking-tight">
// 								Follow these steps to create your first feedback
// 								link.
// 							</p>
// 							<div className="grid gap-6">
// 								<div className="grid gap-2">
// 									<div className="text-gray-900 dark:text-gray-50 text-2xl font-bold">
// 										1. Create an Account or Login
// 									</div>
// 									<p className="text-gray-500 dark:text-gray-400">
// 										Set up your profile quickly to get
// 										started.
// 									</p>
// 								</div>
// 								<div className="grid gap-2">
// 									<div className="text-gray-900 dark:text-gray-50 text-2xl font-bold">
// 										2. Set up your profile quickly to get
// 										started.
// 									</div>
// 									<p className="text-gray-500 dark:text-gray-400">
// 										Navigate to your personalized dashboard.
// 									</p>
// 								</div>
// 								<div className="grid gap-2">
// 									<div className="text-gray-900 dark:text-gray-50 text-2xl font-bold">
// 										3. Generate Your Feedback Link
// 									</div>
// 									<p className="text-gray-500 dark:text-gray-400">
// 										Copy the generated 'public link' from
// 										your dashboard.
// 									</p>
// 								</div>
// 								<div className="grid gap-2">
// 									<div className="text-gray-900 dark:text-gray-50 text-2xl font-bold">
// 										4. Enable Feedback Reception
// 									</div>
// 									<p className="text-gray-500 dark:text-gray-400">
// 										Turn on 'Accepting messages' to start
// 										receiving feedback.
// 									</p>
// 								</div>
// 								<div className="grid gap-2">
// 									<div className="text-gray-900 dark:text-gray-50 text-2xl font-bold">
// 										5. Share Your Link
// 									</div>
// 									<p className="text-gray-500 dark:text-gray-400">
// 										Distribute the link to your audience to
// 										collect messages.
// 									</p>
// 								</div>
// 								<div className="grid gap-2">
// 									<div className="text-gray-900 dark:text-gray-50 text-2xl font-bold">
// 										6. Receive and Review Feedback
// 									</div>
// 									<p className="text-gray-500 dark:text-gray-400">
// 										View all incoming messages directly on
// 										your dashboard.
// 									</p>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</section>
// 				<section className="flex flex-col md:flex-row items-center justify-center h-[60vh] bg-gray-100 dark:bg-gray-900">
// 					<div className="md:w-1/2 flex justify-center">
// 						<Image
// 							src={innovation}
// 							width={400}
// 							height={400}
// 							alt="Illustration"
// 							className="max-w-full h-auto"
// 						/>
// 					</div>
// 					<div className="md:w-1/2 px-8 md:px-12 lg:px-16 space-y-6">
// 						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50">
// 							Key Features
// 						</h2>
// 						<Carousel
// 							plugins={[
// 								Autoplay({
// 									delay: 2000,
// 									stopOnMouseEnter: true,
// 								}),
// 							]}
// 							opts={{
// 								align: "center",
// 								containScroll: false,
// 							}}
// 							className="w-full max-w-md"
// 						>
// 							<CarouselContent>
// 								<CarouselItem>
// 									<div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
// 										<CardHeader className="text-2xl font-bold text-gray-900 dark:text-gray-50">
// 											Complete Anonymity
// 										</CardHeader>
// 										<CardContent className="text-gray-600 dark:text-gray-400">
// 											Ensure privacy and honest feedback
// 											with fully anonymous messaging.
// 											Users can share their thoughts
// 											without revealing their identities.
// 										</CardContent>
// 									</div>
// 								</CarouselItem>
// 								<CarouselItem>
// 									<div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
// 										<CardHeader className="text-2xl font-bold text-gray-900 dark:text-gray-50">
// 											User-Friendly Dashboard
// 										</CardHeader>
// 										<CardContent className="text-gray-600 dark:text-gray-400">
// 											Manage and view all your feedback in
// 											one place with an intuitive and
// 											easy-to-navigate
// 										</CardContent>
// 									</div>
// 								</CarouselItem>
// 								<CarouselItem>
// 									<div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
// 										<CardHeader className="text-2xl font-bold text-gray-900 dark:text-gray-50">
// 											Secure and Private
// 										</CardHeader>
// 										<CardContent className="text-gray-600 dark:text-gray-400">
// 											Your data is safe with us. We
// 											prioritize your privacy and security
// 											at every step.
// 										</CardContent>
// 									</div>
// 								</CarouselItem>
// 								<CarouselItem>
// 									<div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
// 										<CardHeader className="text-2xl font-bold text-gray-900 dark:text-gray-50">
// 											100% Anonymous
// 										</CardHeader>
// 										<CardContent className="text-gray-600 dark:text-gray-400">
// 											Rest assured that all feedback is
// 											completely anonymous, encouraging
// 											honest and open communication.
// 										</CardContent>
// 									</div>
// 								</CarouselItem>
// 							</CarouselContent>
// 							<CarouselPrevious />
// 							<CarouselNext />
// 						</Carousel>
// 					</div>
// 				</section>
// 				<footer className="bg-black text-white dark:bg-gray-800 py-6 px-4 md:px-6">
// 					<div className="container flex flex-col md:flex-row justify-between items-center">
// 						<p className="text-white dark:text-gray-400 text-sm">
// 							&copy; {year} Mystery Feedback. All rights reserved.
// 						</p>
// 						<nav className="flex gap-4 md:gap-6 text-sm">
// 							<Link
// 								href="#"
// 								className="text-white dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors"
// 								prefetch={false}
// 							>
// 								Contact Me
// 							</Link>
// 							<Link
// 								href="https://github.com/alpesh677"
//                                 target="_blank"
// 								className="text-white dark:text-gray-400  dark:hover:text-gray-50 transition-colors"
// 							>
// 								<svg
// 									xmlns="http://www.w3.org/2000/svg"
// 									width="24"
// 									height="24"
// 									fill="currentColor"
// 									className="mr-2"
// 									viewBox="0 0 1792 1792"
// 								>
// 									<path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
// 								</svg>
// 							</Link>
// 							<Link
//                             target="_blank"
// 								href="https://x.com/alpesh_baria677"
// 								className="text-white dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors"
// 								prefetch={false}
// 							>
// 								<svg
// 									xmlns="http://www.w3.org/2000/svg"
// 									width="20"
// 									height="20"
// 									viewBox="0 0 24 24"
// 								>
// 									<path
// 										fill="currentColor"
// 										d="M8 2H1l8.26 11.015L1.45 22H4.1l6.388-7.349L16 22h7l-8.608-11.478L21.8 2h-2.65l-5.986 6.886zm9 18L5 4h2l12 16z"
// 									/>
// 								</svg>
// 							</Link>
// 						</nav>
// 					</div>
// 				</footer>
// 			</div>
// 		</>
// 	);
// }
