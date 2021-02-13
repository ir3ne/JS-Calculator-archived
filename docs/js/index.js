"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var calcInputs = document.querySelectorAll('.calc-inputs');
var number = null;
var operator = null;
var numbers = [];
var operators = [];
var actions = [];
var initialOutput = 0;
var result = null;
var output = null;
var outputValue = null;
var operationContext = {
  isOperationStart: false,
  num_1: null,
  num_2: null,
  operation: null,
  isActionStart: false,
  renderResult: false
};
var themeMode = document.getElementById('theme-mode');
Object.defineProperty(window, 'localStorage', {
  value: 'theme'
});
var localStorage = window.localStorage;
themeMode.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.clear();
  }
});

var renderTheme = function renderTheme() {
  localStorage.getItem('theme') === 'dark' && document.body.classList.add('dark-theme');
};

var calcScreenOutput = document.querySelector('.calc-screen-output');

var inputsAssignment = function inputsAssignment(allInputs) {
  _toConsumableArray(allInputs).forEach(function (i) {
    switch (i.dataset.type) {
      case 'number':
        numbers.push(i);
        break;

      case 'operator':
        operators.push(i);
        break;

      case 'action':
        actions.push(i);
        break;
    }
  });
};

var getOutput = function getOutput() {
  return parseFloat(calcScreenOutput.textContent);
};

var renderInitialOutput = function renderInitialOutput() {
  var outputNode = document.createTextNode(initialOutput);
  calcScreenOutput.appendChild(outputNode);
};

var resetOutput = function resetOutput() {
  output = 0;
};

var keyNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var keyActions = ['%', 'c'];
var keyOperators = ['+', '-', '*', '/'];
var keyEqual = 'Enter';

var keydownSupport = function keydownSupport() {
  document.addEventListener('keydown', function (e) {
    if (keyNumbers.includes(parseInt(e.key))) {
      renderOutput(parseInt(e.key));
    } else if (keyActions.includes(e.key)) {
      if (e.key === '%') {
        percentOutput();
      } else if (e.key.toLowerCase() === 'c') {
        clearOutput();
      }
    } else if (keyOperators.includes(e.key)) {
      useOperator(e.key);
    } else if (e.key === keyEqual) {
      renderResult();
    }
  });
};

renderTheme();
inputsAssignment(calcInputs);
renderInitialOutput();
keydownSupport();
console.table(operationContext);

var hightlightOutput = function hightlightOutput() {
  calcScreenOutput.classList.remove('is-highlight');
  setTimeout(function () {
    return calcScreenOutput.classList.add('is-highlight');
  }, 0);
};

var isFloat = function isFloat() {
  return calcScreenOutput.textContent.toString().includes('.');
};

var renderOutput = function renderOutput(e) {
  if (!e.target) {
    number = e;
  } else {
    number = e.target.textContent;
  }

  if (operationContext.renderResult) {
    calcScreenOutput.innerHTML = '';
    operationContext.renderResult = false;
  }

  if (number === calcScreenOutput.textContent) {
    hightlightOutput();
  }

  if (number === '.') {
    if (!isFloat()) {
      outputValue = number;
    } else {
      return;
    }
  } else {
    outputValue = parseFloat(number);

    if (parseFloat(calcScreenOutput.textContent) === 0 || operationContext.isOperationStart || operationContext.isActionStart) {
      calcScreenOutput.innerHTML = '';

      if (operationContext.isActionStart) {
        operationContext.isActionStart = false;
      }
    }
  }

  output = document.createTextNode(outputValue);
  calcScreenOutput.appendChild(output);
};

var clearOutput = function clearOutput() {
  calcScreenOutput.textContent = '';
  renderInitialOutput();
  operationContext.num_1 = null;
  operationContext.num_2 = null;
  operationContext.operation = null;
};

var percentOutput = function percentOutput() {
  calcScreenOutput.textContent = getOutput() / 100;
  operationContext.isOperationStart = true;
};

var negativePositiveOutput = function negativePositiveOutput() {
  hightlightOutput();
  calcScreenOutput.textContent = -getOutput();
};

var renderAction = function renderAction() {
  switch (this.dataset.action) {
    case 'clear':
      clearOutput();
      break;

    case 'percent':
      percentOutput();
      break;

    case 'equal':
      renderResult();
      break;

    case 'negativePositive':
      negativePositiveOutput();
      break;
  }
};

var renderResult = function renderResult() {
  if (operationContext.operation && operationContext.num_1 || operationContext.num_1 === 0) {
    hightlightOutput();
    operationContext.num_2 = getOutput();
    result = runOperation(operationContext.operation, operationContext.num_1, operationContext.num_2);
    calcScreenOutput.textContent = parseFloat(result);
  } else {
    hightlightOutput();
    calcScreenOutput.textContent = getOutput();
  }

  operationContext.isOperationStart = false;
  operationContext.renderResult = true;
  console.table(operationContext);
};

var sum = function sum(num_1, num_2) {
  return num_1 + num_2;
};

var subtraction = function subtraction(num_1, num_2) {
  return num_1 - num_2;
};

var multiplication = function multiplication(num_1, num_2) {
  return num_1 * num_2;
};

var division = function division(num_1, num_2) {
  return num_1 / num_2;
};

var runOperation = function runOperation(operationType, num_1, num_2) {
  switch (operationType) {
    case 'sum':
      operationType = sum;
      break;

    case 'subtraction':
      operationType = subtraction;
      break;

    case 'multiplication':
      operationType = multiplication;
      break;

    case 'division':
      operationType = division;
      break;
  }

  return operationType(num_1, num_2);
};

numbers.forEach(function (n) {
  n.addEventListener('click', renderOutput);
});
actions.forEach(function (a) {
  a.addEventListener('click', renderAction);
});

var useOperator = function useOperator(e) {
  if (keyOperators.includes(e)) {
    operator = e;
  } else {
    operator = this.dataset.operation;
  }

  hightlightOutput();

  if (operationContext.isOperationStart) {
    renderResult();
  }

  operationContext.num_1 = getOutput();
  resetOutput();
  operationContext.isOperationStart = true;

  switch (operator) {
    case 'sum':
    case '+':
      operationContext.operation = 'sum';
      break;

    case 'subtraction':
    case '-':
      operationContext.operation = 'subtraction';
      break;

    case 'multiplication':
    case '*':
      operationContext.operation = 'multiplication';
      break;

    case 'division':
    case '/':
      operationContext.operation = 'division';
      break;
  }

  console.table(operationContext);
};

operators.forEach(function (o) {
  o.addEventListener('click', useOperator);
});