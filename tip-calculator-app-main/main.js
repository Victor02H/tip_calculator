const calculatorButtons = document.querySelectorAll('.calculator-buttons');
const resetCalculatorButton = document.querySelector('.reset-calculator');

let billInput = document.querySelector('.bill-input');
let customInput = document.querySelector('.custom-input');
let numberPeopleInput = document.querySelector('.number-people-input');

calculatorButtons.forEach(item => {
  item.addEventListener("click", () => {
    if (customInput.value) {
      customInput.value = '';
    }

    let buttonValue = item.value;
    getInputValues(buttonValue);
  })
})

function getInputValues(buttonValue) {
  let values = {
    bill: parseFloat(billInput.value),
    custom: parseFloat(customInput.value),
    people: parseFloat(numberPeopleInput.value)
  };
  
  if ((values.bill > 0) && (values.people > 0)) {
    return calculate(values, buttonValue);
  }

  inputsValidation();
  numberPeopleInputKeyUp(buttonValue);
}

function calculate(values, buttonValue) {
  if (values.custom) {
    let tipValue = values.bill * values.custom / 100;
    let totalToPay = values.bill + tipValue;
    let tipPerPerson = tipValue / values.people;
    let totalPerPerson = totalToPay / values.people;

    return showResults(tipPerPerson, totalPerPerson);
  } else {
    let tipValue = values.bill * buttonValue / 100;
    let totalToPay = values.bill + tipValue;
    let tipPerPerson = tipValue / values.people;
    let totalPerPerson = totalToPay / values.people;

    return showResults(tipPerPerson, totalPerPerson);
  }
}

function showResults(tipPerPerson, totalPerPerson) {
  let tipResult = document.querySelector('.tip-result');
  let totalPerPersonResult = document.querySelector('.total-per-person-result');

  tipResult.innerHTML = `$${tipPerPerson.toFixed(2)}`;
  totalPerPersonResult.innerHTML = `$${totalPerPerson.toFixed(2)}`;

  return resetCalculator(tipResult, totalPerPersonResult);
};

function resetCalculator(tipResult, totalPerPersonResult) {
  if (resetCalculatorButton.hasAttribute('disabled')) {
    resetCalculatorButton.removeAttribute('disabled');
  }

  resetCalculatorButton.addEventListener("click", () => {
    billInput.value = '';
    customInput.value = '';
    numberPeopleInput.value = '';
    
    tipResult.innerHTML = '$0.00';
    totalPerPersonResult.innerHTML = '$0.00';
    resetCalculatorButton.setAttribute('disabled', true);
  })
}

customInput.addEventListener("keyup", () => {
  if (customInput.value) {
    getInputValues();
  }
})

function numberPeopleInputKeyUp(buttonValue) {
  numberPeopleInput.addEventListener("keyup", () => {
    if (numberPeopleInput.value) {
      getInputValues(buttonValue);
    }
  });
}

function inputsValidation() {
  let allInputs = [ billInput, numberPeopleInput ];

  for (const input of allInputs) {
    if (input.value == '') {
      input.classList.add('invalid');

      input.addEventListener("click", () => {
        input.classList.remove('invalid');
      })
    }
  }
}
