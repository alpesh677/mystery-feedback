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
		<nav className="p-2 md:p-2 shadow-md bg-gray-900 dark:bg-black text-white transition duration-500 ease-in-out">
			<div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
				<Link href="/" className="text-xl font-bold mb-4 md:mb-0 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
					Mystery Feedback
				</Link>
				<div className="flex flex-col md:flex-row space-y-3 items-center space-x-2">
					{session ? (
						<>
							<span className="md:mr-56 text-center">
								Welcome, {user?.username || user?.email}
							</span>
							<div className="sm:space-x-1">
								<Button
									onClick={() => signOut()}
									className="w-full md:w-auto bg-red-400 font-semibold hover:bg-red-600 text-black dark:bg-red-600 dark:text-white dark:hover:bg-red-700 transition duration-500 ease-in-out"
									variant={"default"}
								>
									Logout
								</Button>
								<Link href="/dashboard">
									<Button
										className="w-full md:w-auto text-black m-3 font-semibold bg-[#6f2cf5] hover:bg-[#6f2cf5e7] dark:bg-[#6f2cf5] dark:text-white transition duration-500 ease-in-out"
										variant={"default"}
									>
										Dashboard
									</Button>
								</Link>
							</div>
						</>
					) : (
						<div className="sm:space-x-1 space-y-5">
							<Link href="/sign-in">
								<Button
									className="w-full md:w-auto text-black m-3 dark:bg-sky-600 dark:text-white dark:hover:bg-sky-700 transition duration-500 ease-in-out"
									variant={"outline"}
								>
									Login
								</Button>
							</Link>
							<Link href="/sign-up">
								<Button
									className="w-full md:w-auto text-black m-3 dark:bg-green-600 dark:text-white dark:hover:bg-green-700 transition duration-500 ease-in-out"
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
