"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Button } from "./ui/button";

export default function ThemeSwitch() {
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted)
		return (
			<Image
				src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
				width={36}
				height={36}
				sizes="36x36"
				alt="Loading Light/Dark Toggle"
				priority={false}
				title="Loading Light/Dark Toggle"
			/>
		);

	if (resolvedTheme === "dark") {
		return <Button onClick={() => setTheme("light")}>Light</Button>
	}

	if (resolvedTheme === "light") {
		return <Button onClick={() => setTheme("dark")} >Dark</Button>
	}
}

// "use client";
// import { useTheme } from "next-themes";

// const ThemeSwitch: React.FC = () => {
// 	const { theme, setTheme } = useTheme();

// 	const toggleTheme = () => {
// 		setTheme(theme === "light" ? "dark" : "light");
// 	};

// 	const isActive = theme === "light";

// 	const switchClasses = `flex items-center justify-center w-6 h-6 text-dark bg-white rounded-full transform ${
// 		isActive ? "translate-x-0" : "translate-x-6"
// 	} transition-transform duration-500 ease-in-out`;

// 	return (
// 		<div
// 			className="relative w-14 h-8 rounded-full p-1 cursor-pointer bg-[#ccc]"
// 			onClick={toggleTheme}
// 		>
// 			<button className={switchClasses}>
// 				{isActive ? "dark" : "light"}
// 			</button>
// 		</div>
// 	);
// };

// export default ThemeSwitch;
