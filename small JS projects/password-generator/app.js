// password options
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";
// necessary html elements
const passwordField = document.getElementById("password");
const copyBtn = document.getElementById("copy-btn");
const uppercaseBox = document.getElementById("uppercase");
const lowercaseBox = document.getElementById("lowercase");
const numberBox = document.getElementById("number");
const symbolBox = document.getElementById("symbol");
const passwordLength = document.getElementById("password-length");
const generateBtn = document.getElementById("generate-btn");

copyBtn.addEventListener("click", () => {
  copyFunction();
});

generateBtn.addEventListener("click", () => {
  generatePassword();
});

function randomUpperLetter() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function randomLowerLetter() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function randomNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

async function copyFunction() {
  const textArea = document.createElement("textarea");
  document.body.appendChild(textArea);
  textArea.value = passwordField.textContent;
  textArea.select();

  await navigator.clipboard.writeText(textArea.value);
  textArea.remove();
  alert(`The password has been copied!`);
}

function generatePassword() {
  let password = "";
  const checkedBoxes = checkOptions();
  if (uppercaseBox.checked) {
    password += randomUpperLetter();
  }

  if (lowercaseBox.checked) {
    password += randomLowerLetter();
  }

  if (numberBox.checked) {
    password += randomNumber();
  }

  if (symbolBox.checked) {
    password += randomSymbol();
  }
  if (checkedBoxes.length == 0) {
    return;
  }
  for (let i = password.length; i < passwordLength.value; i++) {
    let character =
      checkedBoxes[Math.floor(Math.random() * checkedBoxes.length)]();
    password += character;
  }
  passwordField.textContent = password;
}
// if none boxes are checked, nothing will happen
function checkOptions() {
  const arr = [];
  if (uppercaseBox.checked) {
    arr.push(randomUpperLetter);
  }

  if (lowercaseBox.checked) {
    arr.push(randomLowerLetter);
  }

  if (numberBox.checked) {
    arr.push(randomNumber);
  }

  if (symbolBox.checked) {
    arr.push(randomSymbol);
  }

  return arr;
}
