/*jshint esversion: 6 */
"use strict";
// game logic start
let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
	const armyUnits = ["Tank", "Plane", "Anti-Air"];
	return armyUnits[Math.floor(Math.random() * armyUnits.length)];
}

function playRound(playerSelection, computerSelection) {
	computerSelection = getComputerChoice().toLowerCase();
	playerSelection = playerSelection.toLowerCase();

	// console.log(computerSelection);

	if (playerSelection === computerSelection) {
		return "Draw!";
	} else if (
		(playerSelection === "tank" && computerSelection === "plane") ||
		(playerSelection === "plane" && computerSelection === "anti-air") ||
		(playerSelection === "anti-air" && computerSelection === "tank")
	) {
		computerScore++;
		return "Player lost";
	} else if (
		(playerSelection === "tank" && computerSelection === "anti-air") ||
		(playerSelection === "plane" && computerSelection === "tank") ||
		(playerSelection === "anti-air" && computerSelection === "plane")
	) {
		playerScore++;
		return "Player won";
	} else {
		return "please choose a unit";
	}
}

function getWinner() {
	return playerScore > computerScore
		? "Player won the game"
		: "Player lost the game";
}

function playGame() {
	while (playerScore < 5 && computerScore < 5) {
		const playerSelection = prompt("Choose a unit: Tank , plane or anti-air");
		// const playerSelection = "Tank"; //for quick testing purposes
		console.log(playRound(playerSelection, getComputerChoice()));
		console.log("Player score = " + playerScore);
		console.log("Computer score = " + computerScore);
	}
	return getWinner();
}
// playGame();

// game logic end

// DOM start
function crossFadeAnim() {
	const animTrigger = document.querySelector(".btn-trigger");
	animTrigger.addEventListener("click", crossFade);
	function crossFade() {
		const introContainer = document.querySelector(".intro-container");
		const gameContainer = document.querySelector(".game-container");
		introContainer.classList.add("fade-out");
		setTimeout(() => {
			introContainer.classList.toggle("hide");
		}, 500);
		setTimeout(() => {
			gameContainer.classList.toggle("hide");
		}, 500);
		gameContainer.classList.add("fade-in");
	}
}
crossFadeAnim();
function test() {
  const tankList = document.querySelector(".choices-container .tank")
  tankList.addEventListener("click", () => {
    alert("tank");
  })
}
test()
// DOM end