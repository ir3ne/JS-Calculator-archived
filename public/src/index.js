let calcInputs = document.querySelectorAll('.calc-inputs');
let numbers = [];
let operators = [];
let actions = [];
let initialOutput = 0;
let output = null;
let outputValue = null;

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
      default: 
        break;
    }
  });
}

const renderInitialOutput = function () {
  const outputNode = document.createTextNode(initialOutput);
  calcScreenOutput.appendChild(outputNode);
}

inputsAssignment(calcInputs);
renderInitialOutput();

const renderOutput = function (e) {
  if(e.target.textContent === '.') {
    outputValue = e.target.textContent;
  } else {
    outputValue = parseInt(e.target.textContent);
    if (parseInt(calcScreenOutput.textContent) === 0) {
      calcScreenOutput.innerHTML = '';  
    }
  }
  output = document.createTextNode(outputValue);
  calcScreenOutput.appendChild(output);
}

const clearOutput = function () {
  calcScreenOutput.textContent = '';
  renderInitialOutput();
}

const renderResult = function () {
  calcScreenOutput.textContent = parseInt(calcScreenOutput.textContent);
}

const hightlightOutput = function () {
  calcScreenOutput.classList.remove('is-highlight');
  setTimeout(() => calcScreenOutput.classList.add('is-highlight'), 100);
}

numbers.forEach(n => {
  n.addEventListener('click', renderOutput);
});

actions.forEach(a => {
  if (a.classList.contains('is-clear')) {
    a.addEventListener('click', clearOutput);
  } else if (a.classList.contains('is-equal')) {
    a.addEventListener('click', renderResult);
  }
});

operators.forEach(o => {
  o.addEventListener('click', hightlightOutput);
})

// calcActionClear.addEventListener('click', clearOutput);