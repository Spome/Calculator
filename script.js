
let numberInput = document.body.querySelector('#numberInput');

let addButton = document.body.querySelector('#addButton');
let subtractButton = document.body.querySelector('#subtractButton');
let multiplyButton = document.body.querySelector('#multiplyButton');
let divideButton = document.body.querySelector('#divideButton');

let operatorButtons = document.body.querySelectorAll(".operatorButton");

let clearButton = document.body.querySelector('#clearButton');

let operateButton = document.body.querySelector('#operateButton');

let beforeValue;
let afterValue;
let operatorType;
let operatorToggle;



let inputValuesArray;

let displayValue = "";

function addOperatorToDisplay() {
  [...operatorButtons].forEach(function(element) {
    element.addEventListener('click', operatorFunction);
  });
}

function operatorFunction() {

  if (operatorType === undefined) {
    beforeValue = numberInput.value;
    operatorType = this.value;
    numberInput.value += this.textContent;
  }
  else {
    computeAnswer();
    numberInput.value += this.textContent;
    operatorType = undefined;
    operatorType = this.value;
  }
  console.log(operatorType);
}


function computeAnswer() {
    inputValuesArray = numberInput.value.split(/[+÷*-]/);
    let operateFunction = window[operatorType];
    let operateAnswer;
    if (typeof operateFunction === "function") {
      operateAnswer = operateFunction.apply(null, inputValuesArray);
      numberInput.value = operateAnswer;
      operatorType = undefined;
      console.log("test")
    }
}

operateButton.addEventListener("click", computeAnswer);

clearButton.addEventListener("click", clearInput);


function addNumberToDisplay() {
  let buttons = document.querySelectorAll(".numberButton");
  [...buttons].forEach(function(element) {
    element.addEventListener('click', function() {
      displayValue += element.value;
      numberInput.value += element.value;
    });
  });
}

function clearInput() {
  numberInput.value = "";
  displayValue = "";
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
