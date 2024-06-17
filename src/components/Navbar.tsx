"use client";

import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
	const { data: session } = useSession();
	const user = session?.user;

	return (
		<nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
				<Link href="/" className="text-xl font-bold mb-4 md:mb-0">
					Mystery Feedback
				</Link>
				{session ? (
					<>
						<span className="mr-4">
							Welcome, {user?.username || user?.email}
						</span>
						<div className="sm:space-x-1 space-y-5">
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
								className="w-full md:w-auto text-black m-3"
								variant={"outline"}
							>
								Login
							</Button>
						</Link>
						<Link href="/sign-up">
							<Button
								className="w-full md:w-auto text-black m-3"
								variant={"outline"}
							>
								Signup
							</Button>
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
