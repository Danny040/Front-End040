// gathering all necessary html elments
const gameField = document.getElementById("game-field");
const betsBtns = document.getElementById("bets-btns");
const optionsBtns = document.getElementById("options-btns");
const bank = document.getElementById("bank");
const startSection = document.getElementById("start-section");
const showCards = document.getElementById("show-card");

let conclusion = document.getElementById("game-result");

let dealer = document.getElementById("dealer");
let player = document.getElementById("player");

const cardDeck = new Map([
  ["2", 2],
  ["3", 3],
  ["4", 4],
  ["5", 5],
  ["6", 6],
  ["7", 7],
  ["8", 8],
  ["9", 9],
  ["10", 10],
  ["J", 10],
  ["Q", 10],
  ["K", 10],
  ["A", 11],
]);

const arr1 = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]; // card's values

const minV = 0;
const maxV = arr1.length;

let yourBank = 50;
let bet = 0;
let totalBet = 0;

let dCardSum = 0; // dealers card sum
let pCardSum = 0; // players card sum

// showing and hiding html elements
const startFunction = () => {
  startSection.classList.add("start-section-off");
  showCards.classList.add("show-cards-off");
  gameField.classList.remove("game-field-off");
  betsBtns.classList.remove("bets-off");
  optionsBtns.classList.remove("options-off");
  bank.classList.remove("bank-off");
  bankFunction(bet);
};

const endFunction = () => {
  gameField.classList.add("game-field-off");
  betsBtns.classList.add("bets-off");
  optionsBtns.classList.add("options-off");
  bank.classList.add("bank-off");
  startSection.classList.remove("start-section-off");
  resetFunction();
};
// resets values and game in general
const resetFunction = () => {
  yourBank = 50;
  bet = 0;
  totalBet = 0;
  dCardSum = 0;
  pCardSum = 0;
  dCard = [];
  pCard = [];
  dealer.textContent = "Dealers cards:";
  player.textContent = "Players cards:";
  conclusion.textContent = "";
};

function getRandomCard() {
  return arr1[Math.floor(Math.random() * (maxV - minV))];
}

let dCard = []; // dealers cards
let pCard = []; // players cards

function cardDealer() {
  while (true) {
    if (pCard.length != 2) {
      addOneMoreCard();
    } else {
      alert('If you want add more card, press "ADD CARD" button.');
      break;
    }
  }
}

function addOneMoreCard() {
  const randomCard = getRandomCard();
  if (dCard.length == 2 || dCard.length > pCard.length) {
    pCard.push(randomCard);
    pCardSum += cardDeck.get(randomCard);
    showCardsPlayer(randomCard);
  } else {
    dCard.push(randomCard);
    dCardSum += cardDeck.get(randomCard);
    showCardsDealer();
  }
}

function showCardsDealer() {
  if (dCard.length == 2) {
    dealer.textContent += " hidden";
  } else {
    dealer.textContent += ` ${dCard[0]}`;
  }
}

function showCardsPlayer(rc) {
  player.textContent += `${rc} `;
}

function betMoney(b) {
  console.log(yourBank);
  if (yourBank >= b) {
    bet = b;
    bankFunction(bet);
    changeBtns();
    cardDealer();
  } else {
    alert("Not enough money!");
  }
}

function showResult() {
  console.log(1);
  if (
    (dCardSum == 21 && pCardSum != 21) ||
    (dCardSum > pCardSum && dCardSum < 21) ||
    pCardSum > 21
  ) {
    conclusion.textContent = "You lost!";
    const showHidden = dealer.textContent;
    dealer.textContent = showHidden.replace("hidden", `${dCard[1]}`);
  } else {
    conclusion.textContent = "You won!";
    const showHidden = dealer.textContent;
    dealer.textContent = showHidden.replace("hidden", `${dCard[1]}`);
    addMoneyBank(totalBet * 2);
  }
}

function startNewGame() {
  dealer.textContent = "Dealers cards:";
  player.textContent = "Players cards:";
  conclusion.textContent = "";
  betsBtns.classList.remove("bets-off");
  showCards.classList.add("show-cards-off");
  totalBet = 0;
  dCardSum = 0;
  pCardSum = 0;
  dCard = [];
  pCard = [];
}

function changeBtns() {
  betsBtns.classList.add("bets-off");
  showCards.classList.remove("show-cards-off");
}
// players balance increases when won
function addMoneyBank(yourBet) {
  yourBank += yourBet;
  bank.textContent = `Your bank: ${yourBank} $`;
}
// players balance decreases when bet is made
function bankFunction(yourBet) {
  totalBet += yourBet;
  yourBank -= yourBet;
  bank.textContent = `Your bank: ${yourBank} $`;
}
