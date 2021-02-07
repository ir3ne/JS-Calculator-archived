let calcInputs = document.querySelectorAll('.calc-inputs');
let numbers = [];
let operators = [];
let actions = [];
let initialOutput = 0;
let output = null;

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
  let outputValue = parseInt(e.target.textContent);
  if (parseInt(calcScreenOutput.textContent) === 0) {
    calcScreenOutput.innerHTML = '';  
  }
  output = document.createTextNode(outputValue);
  calcScreenOutput.appendChild(output);
}

const clearOutput = function() {
  calcScreenOutput.textContent = '';
  renderInitialOutput();
}

const renderResult = function() {
  calcScreenOutput.textContent = parseInt(calcScreenOutput.textContent);
}

numbers.forEach(i => {
  i.addEventListener('click', renderOutput);
});

actions.forEach(i => {
  if (i.classList.contains('is-clear')) {
    i.addEventListener('click', clearOutput);
  } else if (i.classList.contains('is-equal')) {
    i.addEventListener('click', renderResult);
  }
});



// calcActionClear.addEventListener('click', clearOutput);