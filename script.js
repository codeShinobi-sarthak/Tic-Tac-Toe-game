const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const newGameBtn = document.querySelector("#newGame");
const heading = document.querySelector("#heading");
const buttons = document.querySelectorAll(".btn");

// tracking no of wins, looses and draws for bpth the players 
const trackO = document.querySelector(".O");
const trackX = document.querySelector(".X");

// for draw
let count = 0;

// playerO and playerX
let turnO = true;

// to track win count
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

// box click function
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO == true) {
      box.style.color = "#90D26D";
      box.textContent = "O";
      turnO = false;
      heading.innerText = "X Player turn";
      count++;
    } else{
      box.style.color = "#2C7865";
      box.textContent = "X";
      turnO = true;
      heading.innerText = "O Player turn";
      count++;
    }
    box.disabled = true;
    checkWinner();
    checkDraw();
  });
});

const checkDraw = () => {
    if (count == 9){
        heading.innerText = "Its a Draw";
    }
} 

const checkWinner = () => {
  winPatterns.forEach((arr) => {
    let val1 = boxes[arr[0]].innerText;
    let val2 = boxes[arr[1]].innerText;
    let val3 = boxes[arr[2]].innerText;

// checking win or not
    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 == val2 && val2 == val3) {
        heading.innerText = "winner is  player " + val1;
        boxes.forEach((box) => {
          box
        })
        newGameBtn.classList.remove("hide");
        resetBtn.classList.add("hide");

        // to update the win and loose count
        if(val1 == "O"){
          winO++;
          trackO.children[1].innerHTML = "Wins : " + winO; 
          trackX.children[2].innerHTML = "looses : " + winO; 
        }else if (val1 == "X"){
          winX++;
          trackX.children[1].innerHTML = "Wins : " + winX;
          trackO.children[2].innerHTML = "looses : " + winX; 
        }
      }
    }
  });
};

// reset button and new game button funtions
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].innerText = "";
      boxes[i].disabled = false;
      heading.innerText = "Tic Tac Toe";
    }
  });
});





