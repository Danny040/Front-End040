class Calculator {
  constructor() {
    this.currentNumber = document.querySelector("[data-current-number]");
    this.previousNumber = document.querySelector("[data-previous-number]");
    this.result = 0;
    this.flag = true;
  }

  clearAll() {
    this.currentNumber.textContent = "";
    this.previousNumber.textContent = "";
  }

  removeLastNumber() {
    this.currentNumber.textContent = this.currentNumber.textContent.slice(
      0,
      -1
    );
  }

  mathOperations(operation) {
    switch (operation) {
      case "+":
        this.result =
          parseFloat(this.currentNumber.textContent) +
          parseFloat(this.previousNumber.textContent);
        break;
      case "-":
        this.result =
          parseFloat(this.previousNumber.textContent) -
          parseFloat(this.currentNumber.textContent);
        break;
      case "x":
        this.result =
          parseFloat(this.previousNumber.textContent) *
          parseFloat(this.currentNumber.textContent);
        break;
      case "÷":
        this.result = (
          parseFloat(this.previousNumber.textContent) /
          parseFloat(this.currentNumber.textContent)
        ).toFixed(2);
        break;
    }
  }

  chooseOperation(operation) {
    let sign = this.previousNumber.textContent.substr(-2, 1);
    if (
      this.previousNumber.textContent != 0 &&
      this.currentNumber.textContent != 0
    ) {
      this.mathOperations(sign);
      this.previousNumber.textContent = this.result + ` ${operation} `;
      this.currentNumber.textContent = "";
    } else if (
      this.previousNumber.textContent == 0 &&
      this.currentNumber.textContent != 0
    ) {
      this.previousNumber.textContent =
        this.currentNumber.textContent + ` ${operation} `;
      this.currentNumber.textContent = "";
    } else if (
      this.previousNumber.textContent != 0 &&
      this.currentNumber.textContent == 0
    ) {
      this.previousNumber.textContent = this.previousNumber.textContent.replace(
        sign,
        operation
      );
    }
  }

  updateDisplay(item) {
    if (this.flag) {
      if (item == "." && this.currentNumber.textContent.includes(".")) {
        console.log(`ok`);
        return;
      } else {
        this.currentNumber.textContent += item;
      }
    } else {
      this.currentNumber.textContent = "";
      this.flag = true;
      this.currentNumber.textContent += item;
    }
  }

  equalFunction() {
    this.mathOperations(this.previousNumber.textContent.substr(-2, 1));
    this.previousNumber.textContent = "";
    this.currentNumber.textContent = this.result;
    this.flag = false;
  }
}

const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const clearAll = document.querySelector("[data-clear-all]");
const removeLastNumber = document.querySelector("[data-remove-last-number]");
const equalSign = document.querySelector("[data-equal]");

let calculator = new Calculator();

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    calculator.updateDisplay(number.textContent);
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", () => {
    calculator.chooseOperation(operation.textContent);
  });
});

clearAll.addEventListener("click", () => {
  calculator.clearAll();
});

removeLastNumber.addEventListener("click", () => {
  calculator.removeLastNumber();
});

equalSign.addEventListener("click", () => {
  calculator.equalFunction();
});
