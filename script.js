const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const newGameBtn = document.querySelector("#newGame");
const heading = document.querySelector("#heading");
const buttons = document.querySelectorAll(".btn");

// Tracking number of wins, losses, and draws for both players
const trackO = document.querySelector(".O");
const trackX = document.querySelector(".X");

// For draw
let count = 0;

// PlayerO and playerX
let turnO = true;

// To track win count
let winO = 0;
let winX = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Box click function
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent === "") { // Check if the box is empty
      if (turnO) {
        box.style.color = "#90D26D";
        box.textContent = "O";
        heading.innerText = "X Player turn";
      } else {
        box.style.color = "#2C7865";
        box.textContent = "X";
        heading.innerText = "O Player turn";
      }
      turnO = !turnO;
      count++;
      checkWinner();
      checkDraw();
    }
  });
});

const checkDraw = () => {
  if (count === 9) {
    heading.innerText = "It's a Draw";
    newGameBtn.classList.remove("hide");
    resetBtn.classList.add("hide");
  }
};

const checkWinner = () => {
  for (const arr of winPatterns) {
    const [a, b, c] = arr;
    const val1 = boxes[a].textContent;
    const val2 = boxes[b].textContent;
    const val3 = boxes[c].textContent;

    // Checking win or not
    if (val1 !== "" && val1 === val2 && val2 === val3) {
      heading.innerText = `Winner is Player ${val1}`;
      newGameBtn.classList.remove("hide");
      resetBtn.classList.add("hide");

      // To update the win and loss count
      if (val1 === "O") {
        winO++;
        trackO.children[1].innerHTML = `Wins: ${winO}`;
        trackX.children[2].innerHTML = `Losses: ${winO}`;
      } else if (val1 === "X") {
        winX++;
        trackX.children[1].innerHTML = `Wins: ${winX}`;
        trackO.children[2].innerHTML = `Losses: ${winX}`;
      }
      return; // Exit the function after a win is found
    }
  }
};

const resetGame = () => {
  boxes.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
    box.style.color = ""; // Reset box color
  });
  heading.innerText = "Tic Tac Toe";
  count = 0;
  turnO = true;
  newGameBtn.classList.add("hide");
  resetBtn.classList.remove("hide");
};

const newGame = () => {
  resetGame();
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", newGame);
