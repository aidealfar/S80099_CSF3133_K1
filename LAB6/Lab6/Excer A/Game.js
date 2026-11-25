// starting variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// validating the name
function startGame() {
  let nameInput = document.getElementById("playerName").value.trim();

  if (nameInput === "") {
    alert("Please enter your name.");
    return;
  }

  gameStarted = true;
  document.getElementById("welcomeMsg").innerHTML = "Welcome, " + nameInput + "!";
  document.getElementById("startTime").innerHTML = "Game started: " + new Date();
}

// Returns a random choice for the computer using an array and Math.random()
function getComputerChoice() {
  let choices = ["rock", "paper", "scissors"];
  let randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Plays one round of Rock, Paper, Scissors
function playRound(playerChoice) {
  if (!gameStarted) {
    alert("Click Start Game first.");
    return;
  }

  let computerChoice = getComputerChoice();
  roundCount++;

  // Update both choice images
  document.getElementById("playerImg").src = playerChoice + ".jpg";
  document.getElementById("computerImg").src = computerChoice + ".jpg";

  let outcomeText = "";
  let outcomeLabel = "";
  let resultElement = document.getElementById("result");

  // Decide winner with if...else
  if (playerChoice === computerChoice) {
    draws++;
    outcomeLabel = "Draw";
    outcomeText = "Round " + roundCount + ": Draw! Both chose " + playerChoice + ".";
    resultElement.style.color = "grey";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    wins++;
    outcomeLabel = "Win";
    outcomeText = "Round " + roundCount + ": You Win! " + playerChoice + " beats " + computerChoice + ".";
    resultElement.style.color = "green";
  } else {
    losses++;
    outcomeLabel = "Lose";
    outcomeText = "Round " + roundCount + ": You Lose! " + computerChoice + " beats " + playerChoice + ".";
    resultElement.style.color = "red";
  }

  // Update result 
  resultElement.innerHTML = outcomeText;
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("losses").innerHTML = losses;
  document.getElementById("draws").innerHTML = draws;

  results.push(outcomeLabel);

  document.getElementById("history").innerHTML +=
    "<tr>" +
      "<td>" + roundCount + "</td>" +
      "<td>" + playerChoice.toUpperCase() + "</td>" +
      "<td>" + computerChoice.toUpperCase() + "</td>" +
      "<td>" + outcomeLabel + "</td>" +
    "</tr>";
}

// Loops through results array 
function showSummary() {
  let totalRounds = results.length;

  if (totalRounds === 0) {
    document.getElementById("summary").innerHTML = "You have not played any rounds yet.";
    return;
  }

  let winCount = 0;
  for (let i = 0; i < results.length; i++) {
    if (results[i] === "Win") {
      winCount++;
    }
  }

  let winPercentage = Math.round((winCount / totalRounds) * 100);
  document.getElementById("summary").innerHTML =
    "You played " + totalRounds + " rounds and won " + winPercentage + "%.";
}

// Resets
function resetGame() {
  wins = 0;
  losses = 0;
  draws = 0;
  roundCount = 0;
  results = [];

  document.getElementById("wins").innerHTML = 0;
  document.getElementById("losses").innerHTML = 0;
  document.getElementById("draws").innerHTML = 0;
  document.getElementById("history").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("summary").innerHTML = "";
}