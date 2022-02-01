
let addButton = document.body.querySelector('#addButton');
let subtractButton = document.body.querySelector('#subtractButton');
let multiplyButton = document.body.querySelector('#multiplyButton');
let divideButton = document.body.querySelector('#divideButton');

let operatorButtons = document.body.querySelectorAll(".operatorButton");

let clearButton = document.body.querySelector('#clearButton');

let operateButton = document.body.querySelector('#operateButton');

let operatorType;
let operatorToggle;

let currentDisplay = document.body.querySelector('#currentDisplay');
let historyDisplay = document.body.querySelector('#historyDisplay');

let firstValue;
let secondValue;


let inputValuesArray;

let displayValue = "";

function addOperatorToDisplay() {
  [...operatorButtons].forEach(function(element) {
    element.addEventListener('click', operatorFunction);
  });
}

function operatorFunction() {

  if (operatorType !== undefined) {
    console.log("tes ttdst ")
    computeAnswer();
    operatorType = this.value;
    firstValue = currentDisplay.textContent;
    historyDisplay.textContent = `${firstValue} ${this.textContent}`
    currentDisplay.textContent = "";
    console.log(operatorType);
    //operatorType = undefined;
    //operatorFunction();
    //operatorType = this.value;
  }
  else {
    operatorType = this.value;
    firstValue = currentDisplay.textContent;
    historyDisplay.textContent = `${firstValue} ${this.textContent}`
    currentDisplay.textContent = "";
  }
}


function computeAnswer() {
  if (operatorType !== undefined) {
    secondValue = currentDisplay.textContent;
    firstValue = +firstValue; // firstValue from string to number
    secondValue = +secondValue; // secondValue from string to number
    let finalAnswer;
    switch(operatorType) {
      case "add":
        finalAnswer = operate(add, firstValue, secondValue);
        break;
      case "subtract":
        finalAnswer = operate(subtract, firstValue, secondValue);
        break;
      case "multiply":
        finalAnswer = operate(multiply, firstValue, secondValue);
        break;
      case "divide":
        finalAnswer = operate(divide, firstValue, secondValue);
    }
    historyDisplay.textContent += ` ${currentDisplay.textContent}`
    currentDisplay.textContent = finalAnswer;
    operatorType = undefined;
    }
    // If operatorType is undefined, then do nothing.
  
  }


operateButton.addEventListener("click", computeAnswer);

clearButton.addEventListener("click", clearInput);


function addNumberToDisplay() {
  let buttons = document.querySelectorAll(".numberButton");
  [...buttons].forEach(function(element) {
    element.addEventListener('click', function() {
      currentDisplay.textContent += element.value;
    });
  });
}

function clearInput() {
  historyDisplay.textContent = "";
  currentDisplay.textContent = "";
  firstValue = "";
  secondValue = "";
  operatorType = undefined;
}

function calculator() {
  addNumberToDisplay();
  addOperatorToDisplay();
  computeAnswer();
}

calculator();

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
