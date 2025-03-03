"use client";

import React from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

function Landing() {
	const router = useRouter();

	function handleClick() {
		router.push("/game");
	}

	return (
		<div className="p-4 flex flex-col items-center justify-center mx-auto size-full sm:w-1/2 w-full">
			<h1 className="lg:text-5xl text-3xl text-center uppercase font-semibold my-2">
				Whack A UFO
			</h1>
			<p className="text-base leading-normal font-medium">
				Rescue the good ones, whack the bad ones!
			</p>
			<Image
				width={500}
				height={500}
				alt="astronut chasing a UFO"
				src="/landing.webp"
			></Image>
			<button
				onClick={handleClick}
				className="flex items-center justify-center transition-all duration-200 focus:ring-2 focus:outline-none text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500/50 h-9 px-4 py-2 text-sm font-semibold rounded-md sm:w-1/2 w-full"
			>
				Play{" "}
			</button>
		</div>
	);
}

export default Landing;
