"use client";

import { signOut, useSession } from "next-auth/react";
import ThemeSwitch from "./ThemeSwitch";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
	const { data: session } = useSession();
	const user = session?.user;

	return (
		<nav className="p-2 md:p-2 shadow-md bg-gray-900 dark:bg-[#111111] text-white">
			<div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
				<Link href="/" className="text-xl font-bold mb-4 md:mb-0">
					Mystery Feedback
				</Link>
				<div className="flex flex-col md:flex-row items-center space-x-2">
					{session ? (
						<>
							<span className="mr-4">
								Welcome, {user?.username || user?.email}
							</span>
							<div className="flex sm:space-x-1 space-y-5">
								<Button
									onClick={() => signOut()}
									className="w-full md:w-auto bg-slate-100 text-black"
									variant={"outline"}
								>
									Logout
								</Button>
								<Link href="/dashboard">
									<Button
										className="w-full md:w-auto text-black m-3"
										variant={"outline"}
									>
										Dashboard
									</Button>
								</Link>
							</div>
						</>
					) : (
						<div className="sm:space-x-3 space-y-5">
							<Link href="/sign-in">
								<Button
									className="w-full md:w-auto text-black m-3 dark:bg-gray-200 dark:text-black"
									variant={"outline"}
								>
									Login
								</Button>
							</Link>
							<Link href="/sign-up">
								<Button
									className="w-full md:w-auto text-black m-3 dark:bg-gray-200 dark:text-black"
									variant={"outline"}
								>
									Signup
								</Button>
							</Link>
						</div>
					)}
					<ThemeSwitch/>
				</div>
				
			</div>
		</nav>
	);
};

export default Navbar;
