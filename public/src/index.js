let calcInputs = document.querySelectorAll('.calc-inputs');
let calcScreenOutput = document.querySelector('.calc-screen-output');
let output = null;

const isNumber = function(element) {
  return element.target.dataset.type === 'number' ? true : false;
};

const isAction = function (element) {
  return element.target.dataset.type === 'clear' ? true : false;
}

const isOperator = function (element) {
  return element.target.dataset.type === 'operator' ? true : false;
}

const isEqual = function (element) {
  return element.target.dataset.type === 'equal' ? true : false;
}

const renderOutput = function (e) {
  if (isNumber(e)) {
    output = document.createTextNode(parseInt(e.target.textContent));
    calcScreenOutput.appendChild(output);
  } else if (isAction(e)) {
    e.target.addEventListener('click', clearOutput);
  } else if(isEqual(e)) {
    console.log('equal');
  } else {
    output = document.createTextNode(e.target.textContent);
    calcScreenOutput.appendChild(output);
  }
}

const clearOutput = function() {
  calcScreenOutput.textContent = '';
}

calcInputs.forEach(i => {
  i.addEventListener('click', renderOutput);
});

calcActionClear.addEventListener('click', clearOutput);