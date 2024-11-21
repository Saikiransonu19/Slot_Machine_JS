
const ROWS = 3;
const COLS = 3;
const SYMBOL_COUNT = {
  "A": 2,
  "B": 4,
  "C": 6,
  "D": 8,
}

const SYMBOL_VALUES = {
  "A": 5,
  "B": 4,
  "C": 3,
  "D": 2,
}


const prompt = require("prompt-sync")();
const deposit = () => {
  while(true){    
  const depositAmount = prompt("Enter the amount you want to deposit: ");
  const numberDepositAmount = parseFloat(depositAmount);

  if (isNaN(numberDepositAmount) || depositAmount <=0){
    console.log("Please enter a valid amount");
  }
  else {
    return numberDepositAmount;
}
}
}

const GetNumberOfLines = () => {
  while(true){    
    const lines = prompt("Enter number of lines to bet (1-3): ");
    const enteredLines = parseFloat(lines);
  
    if (isNaN(enteredLines) || enteredLines <=0 || enteredLines > 3){
      console.log("Please enter valid number, try again");
    }
    else {
      return enteredLines;
  }
  }
}

const getBet = (balance, lines) => {
  while(true){
    const bet = prompt("Enter the bet amount per line: ");
    const enteredBet = parseFloat(bet);
    if (isNaN(enteredBet) || enteredBet <=0 || enteredBet > balance/lines){
      console.log("Please check the avialble amount,try again");
    }
    else {
      return enteredBet;
  }
}
}

const spin = () => {
 const SYMBOLS = [];
 for ( const[symbol, count] of Object.entries(SYMBOL_COUNT)){
    for (let i = 0; i < count; i++){
      SYMBOLS.push(symbol);
    }
}
const reels = [];
for (let i = 0; i < COLS; i++) {
      reels.push([]);
  const reelSymbols = [...SYMBOLS];
  for (let j = 0; j < ROWS; j++) {
    const randomIndex = Math.floor(Math.random() * reelSymbols.length);
    const selectedSymbol = reelSymbols[randomIndex];
    reels[i].push(selectedSymbol);
    reelSymbols.splice(randomIndex, 1);
  }
}
return reels;
};

const transpose = (reels) => {
  const transposedReels = [];
  for (let i = 0; i < ROWS; i++) {
    transposedReels.push([]);
    for (let j = 0; j < COLS; j++) {
      transposedReels[i].push(reels[j][i])
    }
  }
      return transposedReels;
};

const printReels = (transposeReels) => {
  for (let i = 0; i < ROWS; i++) {
    const row = transposeReels[i].join(" | ");
    console.log(row);
  }
};


const getWinnings = (transposeReels, bet, lines) => {
   let winnings = 0;
   for (let row = 0; row <lines; row++){
    const symbols = transposeReels[row];
    let allSame = true;

    for (let symbol of symbols){
      if (symbol !== symbols[0]){
        allSame = false;
        break;
      }
    }
    if (allSame){
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
}

 const game = () =>{

let depositAmount = deposit();

while(true){
  console.log(`Your balance is $${depositAmount}`);
const lines = GetNumberOfLines();
const bet = getBet(depositAmount, lines);
depositAmount -= bet * lines;
const reels = spin();
const transposeReels = transpose(reels) ;
// console.log(reels);
// console.log(transposeReels);
printReels(transposeReels);
const winnings = getWinnings(transposeReels, bet, lines);
depositAmount += winnings;
console.log(`You won $${winnings}`); 

if (depositAmount <= 0){
  console.log("Game over");
  console.log("please deposit money to play again !");
  break;
 }
 const playAgain = prompt("Do you want to play again? (yes or no): ");
  if (playAgain !== "y"){
    console.log("Thanks for playing!");
    break;
}
 }
}
 game();