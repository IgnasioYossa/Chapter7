let player1ChoiceImage = null;
let player2ChoiceImage = null;

function playAgainstPlayer(player1Choice, player2Choice) {
  const result = determineWinner(player1Choice, player2Choice);
  const resultElement = document.querySelector(".vs");
  resultElement.innerHTML = result;
  resultElement.classList.remove("win", "lose", "tie");

  if (result === "PLAYER 1<br>WIN") {
    resultElement.classList.add("win");
  } else if (result === "PLAYER 2<br>WIN") {
    resultElement.classList.add("lose");
  } else {
    resultElement.classList.add("tie");
  }

  if (player1ChoiceImage !== null) {
    player1ChoiceImage.classList.remove("selected");
  }

  player1ChoiceImage = document.getElementById(player1Choice);
  player1ChoiceImage.classList.add("selected");

  if (player2ChoiceImage !== null) {
    player2ChoiceImage.classList.remove("selected");
  }

  player2ChoiceImage = document.getElementById(player2Choice);
  player2ChoiceImage.classList.add("selected");
}

function determineWinner(player1Choice, player2Choice) {
  if (player1Choice === player2Choice) {
    return "DRAW";
  } else if (
    (player1Choice === "Rock" && player2Choice === "Scissor") ||
    (player1Choice === "Paper" && player2Choice === "Rock") ||
    (player1Choice === "Scissor" && player2Choice === "Paper")
  ) {
    return "PLAYER 1<br>WIN";
  } else {
    return "PLAYER 2<br>WIN";
  }
}
