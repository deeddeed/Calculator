// Calc Object
const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

//function to show the digits the user clicked
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    //Overwrite "displayValue" if the current value is "0" otherwise append it
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
  console.log(calculator);
}

//function for the decimal
function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }
  //If the "displayValue" prop does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    //Append the decimal point
    calculator.displayValue += dot;
  }
}

//function for the Operators
function handleOperators(nextOperator) {
  //destructure the props on the calc object
  const { firstOperand, displayValue, operator } = calculator;
  //parseFloat converts the string contents of "displayValue" to a floating point
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  //verify that "firstOperand" is null and that the "inputValue" is not a "NaN" value
  if (firstOperand === null && !isNaN(inputValue)) {
    //update the first operand
    calculator.firstOperand = inputValue;
    console.log("fisryt");
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
    console.log("Test");
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

//Caclulate the inputs from the user
function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

//reset the calculator
function resetCalulator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

//funtion to update the display
function updateDisplay() {
  //select the element in html to display
  const display = document.querySelector(".calcDisplay");
  //update the value of the element with the content of "displayValue"
  display.value = calculator.displayValue;
}
updateDisplay();

//Check what calc key is pressed
const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
  //Access the clicked element
  const { target } = event;
  const { value } = target;

  //Check if the clicked element is a button,
  //if not exit the function
  if (!target.matches("button")) {
    return;
  }
  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperators(value);
      break;
    case ".":
      inputDecimal(value);
      break;
    case "all-clear":
      resetCalulator();
      break;
    default:
      // check if the key is an integer
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});
