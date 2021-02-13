const calcInputs = document.querySelectorAll('.calc-inputs');
let number = null;
let operator = null;
const numbers = [];
const operators = [];
const actions = [];
const initialOutput = 0;
let result = null;
let output = null;
let outputValue = null;
let operationContext = {
  isOperationStart: false,
  num_1: null,
  num_2: null,
  operation: null,
  isActionStart: false
}

const themeMode = document.getElementById('theme-mode');
let localStorage = window.localStorage;

themeMode.addEventListener('click', function() {
  document.body.classList.toggle('dark-theme');
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.clear();
  }
});

const renderTheme = function () {
  (localStorage.getItem('theme') === 'dark') && document.body.classList.add('dark-theme');
}

const calcScreenOutput = document.querySelector('.calc-screen-output');

const inputsAssignment = function (allInputs) {
  [...allInputs].forEach(i =>  {
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
}

const getOutput = function () {
  return parseFloat(calcScreenOutput.textContent);
}

const renderInitialOutput = function () {
  const outputNode = document.createTextNode(initialOutput);
  calcScreenOutput.appendChild(outputNode);
}

const resetOutput = function () {
  output = 0;
}

const keyNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const keyActions = ['%', 'c'];
const keyOperators = ['+', '-', '*', '/'];
const keyEqual = 'Enter';

const keydownSupport = function () {
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
}

renderTheme();
inputsAssignment(calcInputs);
renderInitialOutput();
keydownSupport()
console.table(operationContext);

const hightlightOutput = function () {
  calcScreenOutput.classList.remove('is-highlight');
  setTimeout(() => calcScreenOutput.classList.add('is-highlight'), 0);
}

const isFloat = function () {
  return getOutput().toString().includes('.');
};

const renderOutput = function (e) {
  if (!e.target) {
    number = e;
  } 
  else {
    number = e.target.textContent;
  }

  if(number === calcScreenOutput.textContent) {
    hightlightOutput();
  }
  if(number === '.') {
    if(!isFloat()) {
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
}

const clearOutput = function () {
  calcScreenOutput.textContent = '';
  renderInitialOutput();
  operationContext.num_1 = null;
  operationContext.num_2 = null;
  operationContext.operation = null;
}

const percentOutput = function () {
  calcScreenOutput.textContent = getOutput() / 100;
  operationContext.isOperationStart = true;
}

const negativePositiveOutput = function () {
  hightlightOutput();
  calcScreenOutput.textContent = - getOutput();
} 

const renderAction = function () {
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
}

const renderResult = function () {
  if (operationContext.operation && operationContext.num_1) {
    hightlightOutput();
    operationContext.num_2 = getOutput();
    result = runOperation(operationContext.operation, operationContext.num_1, operationContext.num_2);
    calcScreenOutput.textContent = parseFloat(result);
  } else {
    hightlightOutput();
    calcScreenOutput.textContent = getOutput();
  }
  operationContext.isOperationStart = false;
  console.table(operationContext);
}

const sum = function (num_1, num_2) {
  return num_1 + num_2;
}

const subtraction = function (num_1, num_2) {
  return num_1 - num_2;
}

const multiplication = function (num_1, num_2) {
  return num_1 * num_2;
}

const division = function (num_1, num_2) {
  return num_1 / num_2;
}

const runOperation = function (operationType, num_1, num_2) {
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
}

numbers.forEach(n => {
  n.addEventListener('click', renderOutput);
});

actions.forEach(a => {
  a.addEventListener('click', renderAction);
});

const useOperator = function (e) {
  if(keyOperators.includes(e)) {
    operator = e;
  } else {
    operator = this.dataset.operation;
  }

  hightlightOutput();

  if(operationContext.isOperationStart) {
    renderResult();
  }

  operationContext.num_1 = getOutput();
  resetOutput();
  operationContext.isOperationStart = true;
  switch (operator) {
    case 'sum', '+':
      operationContext.operation = 'sum';
      break;
    case 'subtraction', '-':
      operationContext.operation = 'subtraction';
      break;
    case 'multiplication', '*':
      operationContext.operation = 'multiplication';
      break;
    case 'division', '/':
      operationContext.operation = 'division';
      break;
  }
  console.table(operationContext);
}

operators.forEach(o => {
  o.addEventListener('click', useOperator);
});
