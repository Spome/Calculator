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
  return a / b;
}

function operate(operator, a, b) {
  return operator(a,b);
}

console.log(add(16,4));
console.log(subtract(16,4));
console.log(multiply(16,4));
console.log(divide(16,4));

console.log(operate(multiply, 6, 7));

