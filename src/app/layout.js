import {Open_Sans} from "next/font/google";
import "./globals.css";
import PrelineScript from "@/components/PrelineScript";
// import {ThemeProvider} from "next-themes";

// const bgColor = "bg-white dark:bg-zinc-950";

const openSans = Open_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "600", "700"],
	variable: "--font-open-sans", // Optional: define a CSS variable
});

export const metadata = {
	title: "Whack A UFO",
	description: "Rescue the good ones, whack the bad ones!",
};

export default function RootLayout({children}) {
	return (
		<html lang="en">
			<body className={`${openSans.variable} antialiased`}>{children}</body>
			<PrelineScript />
		</html>
	);
}
