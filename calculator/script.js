let displayValue = '0';
let operator = '';
let operand1 = '';
let operand2 = '';
let memory = '';

function updateDisplay() {
    document.getElementById('display').innerText = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    operand1 = '';
    operand2 = '';
    operator = '';
    updateDisplay();
}

function appendNumber(number) {
    if (displayValue === '0' || displayValue === '-0') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (op === '√' || op === '%') {
        // Handle special operators directly
        handleSpecialOperator(op);
    } else {
        // Handle standard operators
        if (operator === '') {
            operand1 = displayValue;
            operator = op;
            displayValue = '0';
        } else {
            operand2 = displayValue;
            calculate();
            operator = op;
            displayValue = '0';
            updateDisplay(); // Update display after calculation
        }
    }
}

function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function handleSpecialOperator(op) {
    operand1 = displayValue;

    switch (op) {
        case '√':
            if (operand1 >= 0) {
                displayValue = Math.sqrt(operand1).toString();
            } else {
                displayValue = 'Error';
            }
            break;
        case '%':
            displayValue = (operand1 / 100).toString();
            break;
        default:
            displayValue = 'Error';
    }

    operator = '';
    operand1 = displayValue;
    operand2 = '';
    updateDisplay();
}

function calculate() {
    if (operand1 !== '' && operator !== '' && displayValue !== '') {
        operand2 = displayValue;
        operand1 = parseFloat(operand1);
        operand2 = parseFloat(operand2);

        switch (operator) {
            case '+':
                displayValue = (operand1 + operand2).toString();
                break;
            case '-':
                displayValue = (operand1 - operand2).toString();
                break;
            case '*':
                displayValue = (operand1 * operand2).toString();
                break;
            case '/':
                if (operand2 !== 0) {
                    displayValue = (operand1 / operand2).toString();
                } else {
                    displayValue = 'Error';
                }
                break;
            default:
                displayValue = 'Error';
        }

        memory = displayValue; // Save the result in memory
        operator = '';
        operand1 = displayValue;
        operand2 = '';
        updateDisplay();
    }
}


updateDisplay();
