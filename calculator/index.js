class Calculator {
    constructor(previousText,currentText){
        this.previousText = previousText;
        this.currentText = currentText;
        this.clear();
    }
    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    
    chooseOperation(operation){
        if(this.currentOperand === "") return;
        if(this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case "+":
                computation = prev + current;
            break;
            case "-":
                computation = prev - current;
            break;
            case "*":
                computation = prev * current;
            break;
            case "/":
                computation = prev / current;
            break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number){
        const floatNumber = parseFloat(number);
        if(isNaN(floatNumber)) return "";
        return floatNumber.toLocaleString('en');
    }

    updateDisplay(){
        this.currentText.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousText.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
    }
}

const numberButtons = document.querySelectorAll("[data-numbers]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousText = document.querySelector("[data-previous-operand]")
const currentText = document.querySelector("[data-current-operand]")

const calculator = new Calculator(previousText,currentText);

numberButtons.forEach(button => {
    button.addEventListener("click",() => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click",() => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click",() => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click",() => {
    calculator.clear()
    calculator.updateDisplay();
})

deleteButton.addEventListener("click",() => {
    calculator.delete();
    calculator.updateDisplay();
})