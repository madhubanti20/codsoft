let displayElement = document.getElementById('display');
let displayValue = '0';
let pendingValue = null;
let operator = null;
let shouldResetDisplay = false;

function clearDisplay() {
    displayValue = '0';
    pendingValue = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        displayValue = number;
        shouldResetDisplay = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    pendingValue = displayValue;
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || shouldResetDisplay) return;
    let result;
    const currentValue = parseFloat(displayValue);
    const previousValue = parseFloat(pendingValue);
    switch (operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '*':
            result = previousValue * currentValue;
            break;
        case '/':
            result = previousValue / currentValue;
            break;
        default:
            return;
    }
    displayValue = result.toString();
    operator = null;
    pendingValue = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function updateDisplay() {
    displayElement.textContent = displayValue;
}
