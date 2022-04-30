/*jshint esversion: 6 */
"use strict";

const playerButton = document.querySelectorAll(".player-button");
const playerScoreDisplay = document.querySelector(".player-score p");
const computerScoreDisplay = document.querySelector(".computer-score p");
const playerChoices = document.querySelector(".player-choices");
const warStatus = document.querySelector(".war-status");
const warCondition = document.querySelector(".war-condition");
const warWin = document.querySelector(".war-win");
const warLose = document.querySelector(".war-lose");
const nextGameButton = document.querySelector(".reset-game-btn");

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

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
	const armyUnits = ["tank", "plane", "antiair"];
	return armyUnits[Math.floor(Math.random() * armyUnits.length)];
}

// determine round winner
function playRound(playerSelection, computerSelection) {
	if (playerSelection === computerSelection) {
		return "draw";
	} else if (
		(playerSelection === "tank" && computerSelection === "plane") ||
		(playerSelection === "plane" && computerSelection === "antiair") ||
		(playerSelection === "antiair" && computerSelection === "tank")
	) {
		computerScore++;
		return "lose";
	} else if (
		(playerSelection === "tank" && computerSelection === "antiair") ||
		(playerSelection === "plane" && computerSelection === "tank") ||
		(playerSelection === "antiair" && computerSelection === "plane")
	) {
		playerScore++;
		return "win";
	} else {
		return "please choose a unit";
	}
}

function playGame() {
	playerButton.forEach((button) => {
		button.addEventListener("click", () => {
			// hide round images at the start of a new round
			roundReset();

			// get the player choice show the image of the chosen unit
			const playerSelection = button.getAttribute("id");
			const playerUnit = document.querySelector(
				`.player-unit .${playerSelection}`
			);
			playerUnit.classList.remove("hide");

			// get the computer choice show the image of the chosen unit
			const computerSelection = getComputerChoice();
			const computerUnit = document.querySelector(
				`.computer-unit .${computerSelection}`
			);
			computerUnit.classList.remove("hide");

			// get the winner of a round and show win, lose or draw image
			const roundWinner = playRound(playerSelection, computerSelection);
			const roundStatus = document.querySelector(
				`.round-status .round-${roundWinner}`
			);
			roundStatus.classList.remove("hide");

			// score update
			playerScoreDisplay.innerHTML = `${playerScore}`;
			computerScoreDisplay.innerHTML = `${computerScore}`;

			// limit game to first to 5 and show win or lose text
			if (playerScore === 5 || computerScore === 5) {
				playerChoices.classList.toggle("hide");
				warStatus.classList.toggle("hide");
				if (playerScore > computerScore) {
					warCondition.textContent = "won";
					warWin.classList.toggle("hide");
				} else {
					warCondition.textContent = "lost";
					warLose.classList.toggle("hide");
				}
				newGame();
			}
		});
	});
}

// hide chosen units from the old round
function roundReset() {
	function hidePlayerUnits() {
		const playerUnitChildren = document.querySelector(".player-unit").children;
		for (let i = 0; i < playerUnitChildren.length; i++) {
			const child = playerUnitChildren[i];
			child.classList.add("hide");
		}
	}
	function hideComputerUnits() {
		const computerUnitChildren =
			document.querySelector(".computer-unit").children;
		for (let i = 0; i < computerUnitChildren.length; i++) {
			const child = computerUnitChildren[i];
			child.classList.add("hide");
		}
	}
	function hideRoundStatus() {
		const roundStatusChildren =
			document.querySelector(".round-status").children;
		for (let i = 0; i < roundStatusChildren.length; i++) {
			const child = roundStatusChildren[i];
			child.classList.add("hide");
		}
	}
	hidePlayerUnits();
	hideComputerUnits();
	hideRoundStatus();
}

// reset values and dom then start a new game
function newGame() {
	playerScore = 0;
	computerScore = 0;
	nextGameButton.addEventListener("click", () => {
		playerScoreDisplay.innerHTML = `${playerScore}`;
		computerScoreDisplay.innerHTML = `${computerScore}`;
		warStatus.classList.add("hide");
		playerChoices.classList.remove("hide");
		warWin.classList.add("hide");
		warLose.classList.add("hide");
	});
}
playGame();
