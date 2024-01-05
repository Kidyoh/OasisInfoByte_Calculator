document.addEventListener('DOMContentLoaded', function() {
    let display = document.querySelector('.display');
    let buttons = Array.from(document.querySelectorAll('button'));
    let displayValue = '';
    let pendingVal;
    let evalStringArray = [];

    let updateDisplayVal = (clickObj) => {
        let btnText = clickObj.target.innerText;

        if(btnText === 'C'){
            displayValue = '';
            pendingVal = undefined;
            evalStringArray = [];
        } else if(btnText === '.'){
            if(!displayValue.includes('.'))
                displayValue += '.';
        } else if(btnText === '='){
            evalStringArray.push(displayValue);
            displayValue = eval(evalStringArray.join(' '));
            evalStringArray = [];
        } else {
            if(displayValue[0] === '0' && displayValue.length === 1 && btnText !== '.'){
                displayValue = btnText;
            } else {
                displayValue += btnText;
            }
        }

        display.value = displayValue;
    }

    let performOperation = (clickObj) => {
        let operator = clickObj.target.innerText;

        switch (operator){
            case '+':
            case '-':
            case '*':
            case '/':
                if(displayValue) {
                    pendingVal = displayValue;
                    displayValue = '';
                    display.value = '';
                    evalStringArray.push(pendingVal);
                    evalStringArray.push(operator);
                }
                break;
        }
    }
    
    let convertToPercentage = (clickObj) => {
        if(displayValue) {
            displayValue = (parseFloat(displayValue) / 100).toString();
            display.value = displayValue; 
        }
    }
    document.querySelector('button.sign').addEventListener('click', convertToPercentage);


    buttons.map( button => {
        if(button.innerText === 'C' || button.innerText === '='){
            button.addEventListener('click', updateDisplayVal);
        } else if(button.innerText === '+' || button.innerText === '-' || button.innerText === '*' || button.innerText === '/'){
            button.addEventListener('click', performOperation);
        } else {
            button.addEventListener('click', updateDisplayVal);
        }
    });
});