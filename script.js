
let numberButtons = document.querySelectorAll(".numberButton");
let operatorButtons = document.body.querySelectorAll(".operatorButton");

let clearButton = document.body.querySelector('#clearButton');
let undoButton = document.body.querySelector('#undo');
let operateButton = document.body.querySelector('#operateButton');
let dotButton = document.body.querySelector('#dot');

let currentDisplay = document.body.querySelector('#currentDisplay');
let historyDisplay = document.body.querySelector('#historyDisplay');

let operatorType;
let operatorToggle;

let firstValue;
let secondValue;

let dotToggle = false;

dotButton.addEventListener("click", addDotButton);

numberButtons.forEach(function(element) {
  element.addEventListener('click', addNumberToDisplay);
});

operatorButtons.forEach(function(element) {
  element.addEventListener('click', function() {
    operatorFunction(element.textContent);
  });
});

clearButton.addEventListener("click", clearInput);

operateButton.addEventListener("click", computeAnswer);

undoButton.addEventListener("click", undo);

document.addEventListener('keydown', keyboardInput);

function addNumberToDisplay() {
  currentDisplay.textContent += this.value;
}

function addDotButton() {
  if(dotToggle === false) {
    currentDisplay.textContent += ".";
    dotToggle = true;
  }
}

function operatorFunction(operator) {
  if (operatorType !== undefined) computeAnswer();

  firstValue = currentDisplay.textContent;
  operatorType = operator;
  historyDisplay.textContent = `${firstValue} ${operator}`
  currentDisplay.textContent = "";
  dotToggle = false;
}

function clearInput() {
  historyDisplay.textContent = "";
  currentDisplay.textContent = "";
  firstValue = "";
  secondValue = "";
  operatorType = undefined;
  dotToggle = false;
}

function undo() {
  if (currentDisplay !== "") {
    let length = currentDisplay.textContent.length;
    let newString = currentDisplay.textContent.substring(0,length-1);
    currentDisplay.textContent = newString;
  }
}

function computeAnswer() {
  if (operatorType !== undefined) {
    secondValue = currentDisplay.textContent;
    firstValue = +firstValue; // firstValue from string to number
    secondValue = +secondValue; // secondValue from string to number
    let answer;
    let finalAnswer;


    switch(operatorType) {
      case "+":
        answer = operate(add, firstValue, secondValue);
        break;
      case "-":
        answer = operate(subtract, firstValue, secondValue);
        break;
      case "*":
        answer = operate(multiply, firstValue, secondValue);
        break;
      case "÷":
        answer = operate(divide, firstValue, secondValue);
    }

    if(answer === "ERROR") {
      alert("Error! Can't divide by 0")
      clearInput();
    }
    else {
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
    }
    // If operatorType is undefined, then do nothing.
  }

  function keyboardInput(event) {
    const keyName = event.key;
    console.log(keyName);
    if (+keyName >= 0 && +keyName < 10) {
      currentDisplay.textContent += keyName;
    }
  
    if(keyName === "+" || keyName === "-" || keyName === "÷" ||
    keyName === "*") {
      operatorFunction(keyName);
    }
  
    if(keyName === "Escape") {
      clearInput();
    }
  
    if(keyName === "Backspace") {
      undo();
    }

    if(keyName === ".") {
      addDotButton();
    }

    if(keyName === "Enter" || keyName === "=" || keyName === "k") {
      computeAnswer();
    }

  }
  
function countDecimals(value) {
  if (Math.floor(value) !== value) {
    return value.toString().split(".")[1].length || 0;
  }
}


function add(a,b) {
  return a + b;
}

function subtract(a,b) {
  return a - b;
}

function multiply(a,b) {
  return a * b;
}

function divide(a,b) {
  if(b === 0) {
    return "ERROR";
  }
  else {
    return a / b;
  }
}

function operate(operator, a, b) {
  /*
  if (operator === "+") return add(a,b);
  if (operator === "-") return subtract(a,b);
  if (operator === "*") return multiply(a,b);
  if (operator === "÷") return divide(a,b);
*/
  return operator(a,b);
}
