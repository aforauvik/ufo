"use client";

import {MdScoreboard} from "react-icons/md";
import {IoIosStopwatch} from "react-icons/io";

import React, {useState, useEffect, useRef} from "react";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const moleTypes = [
	{type: "mole10", points: 10, img: "/mole10.webp", sound: "/mole10.mp3"},
	{type: "mole20", points: 20, img: "/mole20.webp", sound: "/mole20.mp3"},
	{type: "bomb", points: -30, img: "/bomb-new.webp", sound: "/bomb.mp3"},
];

const randomMoleType = () => {
	return moleTypes[Math.floor(Math.random() * moleTypes.length)];
};

const Game = () => {
	const [score, setScore] = useState(0);
	const [holes, setHoles] = useState(Array(9).fill(null));
	const [timeLeft, setTimeLeft] = useState(90);
	const [gameOver, setGameOver] = useState(false);
	const [gameStarted, setGameStarted] = useState(false);
	const [difficulty, setDifficulty] = useState("easy");
	const [message, setMessage] = useState("");

	const mole10SoundRef = useRef(null);
	const mole20SoundRef = useRef(null);
	const bombSoundRef = useRef(null);
	const gameOverSoundRef = useRef(null);

	const moleTimerIntervals = {
		easy: 1000,
		medium: 800,
		hard: 500,
		insane: 300,
	};

	useEffect(() => {
		if (gameOver || !gameStarted) return;
		const timer = setInterval(() => {
			if (timeLeft > 0) {
				setTimeLeft(timeLeft - 1);
			} else {
				setGameOver(true);
				gameOverSoundRef.current.play();
				clearInterval(timer);
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [timeLeft, gameOver, gameStarted]);

	useEffect(() => {
		if (gameOver || !gameStarted) return;
		const moleTimer = setInterval(() => {
			setHoles(
				holes.map(() => (Math.random() > 0.5 ? randomMoleType() : null))
			);
		}, moleTimerIntervals[difficulty]);

		return () => clearInterval(moleTimer);
	}, [holes, gameOver, gameStarted, difficulty]);

	const handleMoleClick = (index) => {
		if (holes[index] && !gameOver) {
			setScore(score + holes[index].points);
			const newHoles = [...holes];
			newHoles[index] = null;
			setHoles(newHoles);

			if (holes[index].type === "mole10") {
				mole10SoundRef.current.play();
			} else if (holes[index].type === "mole20") {
				mole20SoundRef.current.play();
			} else if (holes[index].type === "bomb") {
				bombSoundRef.current.play();
			}
		}
	};

	const handleStart = () => {
		setScore(0);
		setHoles(Array(9).fill(null));
		setTimeLeft(90);
		setGameOver(false);
		setGameStarted(true);
	};

	const handleDifficultyChange = (event) => {
		setDifficulty(event.target.value);
	};

	const handleShare = () => {
		const message = `I scored ${score} points on ${difficulty} mode in Rescue-an-Alien! Play Rescue-an-Alien and see if you can score higher than me! Play here - https://ufo.auvik.me/`;
		navigator.clipboard.writeText(message);
		setMessage("Score copied to clipboard!");
	};

	return (
		<div className="flex items-center flex-col justify-center lg:mx-24 sm:px-2 md:px-4">
			<div className="p-4 bg-white bg-opacity-10 rounded-xl shadow-sm dark:bg-neutral-950 dark:border-neutral-900 sm:w-1/2 w-full">
				{message && (
					<div className="message absolute top-4 left-1/2 -translate-x-1/2 flex items-center justify-center text-center transition-all duration-200 focus:ring-2 focus:outline-none text-white bg-emerald-600 px-4 py-2 text-sm font-semibold rounded-md shadow-lg">
						{message}
					</div>
				)}
				<div className="mx-auto md:px-8 lg:px-24 max-w-7xl">
					{/* <h1 className="text-xl leading-tight uppercase tracking-tight sm:text-xl md:text-xl lg:text-xl mt-4 font-semibold">
						whack-a-ufo
					</h1> */}
					<div className="selectlevels mb-4">
						<label
							htmlFor="difficulty"
							className="block text-sm font-semibold mb-1 dark:text-white"
						>
							Difficulty Level{" "}
						</label>
						<select
							className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-white bg-opacity-90 dark:border-neutral-700 text-zinc-950 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
							id="difficulty"
							value={difficulty}
							onChange={handleDifficultyChange}
							disabled={gameStarted && !gameOver}
						>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
							<option value="insane">Insane</option>
						</select>
					</div>
					<hr className="border-white border-opacity-10 my-2"></hr>
					<div className="flex justify-between rounded-xm">
						<div className="flex flex-row items-center justify-center gap-2">
							<p className="text-2xl leading-normal font-bold uppercase text-white dark:text-indigo-500">
								<MdScoreboard />
							</p>
							<h2 className="lg:text-base text-right leading-normal sm:text-base md:text-base font-semibold">
								{score}
							</h2>
						</div>
						<div className="flex flex-row items-center justify-center gap-2">
							<p className="text-2xl leading-normal font-bold uppercase text-white dark:text-indigo-500">
								<IoIosStopwatch />
							</p>
							<h2 className="lg:text-base text-right leading-normal sm:text-base md:text-base font-semibold">
								{timeLeft} Seconds Left
							</h2>
						</div>
					</div>
					<hr className="border-white border-opacity-10 my-2"></hr>

					<div className="flex justify-between">
						<div className="flex flex-row items-center justify-center">
							<img className="h-10" src="/mole20.webp"></img>
							<p className="text-xs leading-normal font-bold uppercase text-emerald-500 dark:text-emerald-500">
								= +20 Points
							</p>
						</div>
						<div className="flex flex-row items-center justify-center">
							<img className="h-10" src="/mole10.webp"></img>
							<p className="text-xs leading-normal font-bold uppercase text-orange-500 dark:text-orange-500">
								= +10 Points
							</p>
						</div>
						<div className="flex flex-row items-center justify-center">
							<img className="h-10" src="/bomb.webp"></img>
							<p className="text-xs leading-normal font-bold uppercase text-red-500 dark:text-red-500">
								= -30 Points
							</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center mt-4">
					<div className="grid grid-cols-3 gap-1">
						{holes.map((hole, index) => (
							<div
								key={index}
								className={`lg:w-32 lg:h-32 h-28 w-28 bg-slate-50 dark:bg-white bg-opacity-5 rounded-xm ${
									gameOver ? "disabled" : ""
								}`}
								onClick={() => handleMoleClick(index)}
							>
								{hole && (
									<img src={hole.img} alt={hole.type} className="mole" />
								)}
							</div>
						))}
					</div>
					{!gameStarted ? (
						<button
							onClick={handleStart}
							className="flex items-center justify-center transition-all duration-200 focus:ring-2 focus:outline-none text-white bg-indigo-600 w-1/2 hover:bg-indigo-700 focus:ring-indigo-500/50 h-9 px-4 py-2 text-sm font-semibold rounded-md mt-4"
						>
							Start Game
						</button>
					) : gameOver ? (
						<div className="w-full px-8 mx-auto md:px-12 lg:px-24">
							<h2 className="text-center text-base lg:text-xl leading-normal font-semibold text-white dark:text-white my-2">
								Game Over! Final Score: {score}
							</h2>
							<div className="flex flex-row justify-center items-center gap-2">
								<button
									onClick={handleStart}
									className="flex items-center justify-center transition-all duration-200 focus:ring-2 focus:outline-none text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500/50 h-9 px-4 py-2 text-sm font-semibold rounded-md w-full"
								>
									Restart Game
								</button>
								<button
									onClick={handleShare}
									className="flex items-center justify-center transition-all duration-200 focus:ring-2 focus:outline-none text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500/50 h-9 px-4 py-2 text-sm font-semibold rounded-md w-full"
								>
									Share Score
								</button>
							</div>
						</div>
					) : null}

					<audio ref={mole10SoundRef} src="/mole10.mp3" />
					<audio ref={mole20SoundRef} src="/mole20.mp3" />
					<audio ref={bombSoundRef} src="/bomb.mp3" />
					<audio ref={gameOverSoundRef} src="/game-over.mp3" />
				</div>
				<div className="flex flex-col items-center justify-center">
					<p className="text-xs leading-normal text-white mt-2 font-medium">
						© {currentYear} | Developed By{" "}
						<a target="blank" href="https://www.auvik.me/">
							Auvik Mir
						</a>
						, North Carolina
					</p>
				</div>
			</div>
		</div>
	);
};

export default Game;
