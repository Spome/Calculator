
let numberButtons = document.querySelectorAll(".numberButton");
let operatorButtons = document.body.querySelectorAll(".operatorButton");
let clearButton = document.body.querySelector('#clearButton');
let operateButton = document.body.querySelector('#operateButton');

let currentDisplay = document.body.querySelector('#currentDisplay');
let historyDisplay = document.body.querySelector('#historyDisplay');

let operatorType;
let operatorToggle;

let firstValue;
let secondValue;

numberButtons.forEach(function(element) {
  element.addEventListener('click', addNumberToDisplay);
});

operatorButtons.forEach(function(element) {
  element.addEventListener('click', operatorFunction);
});

clearButton.addEventListener("click", clearInput);

operateButton.addEventListener("click", computeAnswer);

function addNumberToDisplay() {
  currentDisplay.textContent += this.value;
}

function operatorFunction() {
  if (operatorType !== undefined) computeAnswer();
  operatorType = this.value;
  firstValue = currentDisplay.textContent;
  historyDisplay.textContent = `${firstValue} ${this.textContent}`
  currentDisplay.textContent = "";
}

function clearInput() {
  historyDisplay.textContent = "";
  currentDisplay.textContent = "";
  firstValue = "";
  secondValue = "";
  operatorType = undefined;
}

function computeAnswer() {
  if (operatorType !== undefined) {
    secondValue = currentDisplay.textContent;
    firstValue = +firstValue; // firstValue from string to number
    secondValue = +secondValue; // secondValue from string to number
    let answer;
    let finalAnswer;

    switch(operatorType) {
      case "add":
        answer = operate(add, firstValue, secondValue);
        break;
      case "subtract":
        answer = operate(subtract, firstValue, secondValue);
        break;
      case "multiply":
        answer = operate(multiply, firstValue, secondValue);
        break;
      case "divide":
        answer = operate(divide, firstValue, secondValue);
    }

    historyDisplay.textContent += ` ${currentDisplay.textContent}`

    if (countDecimals(answer) > 5) {
      finalAnswer = answer.toFixed(5);
      currentDisplay.textContent = finalAnswer
    }
    else {
      currentDisplay.textContent = answer;
    }

    operatorType = undefined;
    }

    // If operatorType is undefined, then do nothing.
  }

function countDecimals(value) {
  if (Math.floor(value) !== value) {
    return value.toString().split(".")[1].length || 0;
  }
}

function add(a,b) {
  return +a + +b;
}

function subtract(a,b) {
  return +a - +b;
}

function multiply(a,b) {
  return +a * +b;
}

function divide(a,b) {
  return +a / +b;
}

function operate(operator, a, b) {
  return operator(a,b);
}
