let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
	const armyUnits = ["Tank", "Plane", "Anti-Air"];
	return armyUnits[Math.floor(Math.random() * armyUnits.length)];
}

function playRound(playerSelection, computerSelection) {
	computerSelection = getComputerChoice().toLowerCase();
	playerSelection = playerSelection.toLowerCase();
    
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
    let roundCount = 1
    const maxScore = 2;
	for (let i = 0; i < roundCount; i++) {
		if (playerScore < maxScore && computerScore < maxScore) {
			playerSelection = prompt("Choose a unit: Tank , plane or anti-air");
			const computerSelection = getComputerChoice();
			console.log(playRound(playerSelection, computerSelection));
			roundCount++;
			console.log("Player score = " + playerScore);
			console.log("Computer score = " + computerScore);
		} else {
			roundCount = 1;
		}
	}
	return getWinner();
}

alert(playGame());
