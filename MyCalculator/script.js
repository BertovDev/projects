class Calculator {
    constructor(before, now) {
        this.before = before;
        this.now = now;
        this.defaultCalc();
    }
    defaultCalc() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operator = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
        // this.now.innerHTML = this.now.innerHTML.slice(0,this.now.innerHTML.length - 1);
    }
    selectNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand + number;
        if(this.currentOperand[0] === "0" && this.currentOperand.length > 1 && this.currentOperand[1] !== "."){
            this.currentOperand = this.currentOperand.slice(1);
        }
    }
    selectOperation(operand) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operator = operand;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "0";
    }
    compute() {
        let res = 0;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operator){
            case "+":
                res = prev + current;
                this.currentOperand = res;
                this.previousOperand = "";
            break;
            case "-":
                res = prev - current;
                this.currentOperand = res;
                this.previousOperand = "";
            break;
            case "x":
                res = prev * current;
                this.currentOperand = res;
                this.previousOperand = "";
            break;
            case "/":
                res = prev / current;
                this.currentOperand = res;
                this.previousOperand = "";
            break;
            default:
                return;
        }
    }
    updateDisplay() {
        if(this.operator !== undefined && this.previousOperand !== ""){
            this.before.innerHTML = `${this.previousOperand} ${this.operator}`;
        } else {
            this.before.innerHTML = this.previousOperand;
        }
        this.now.innerHTML = this.currentOperand;
    }
}

const btns = document.querySelectorAll("[data-btn-num]");
const displayBefore = document.querySelector("[data-display-before]");
const displayNow = document.querySelector("[data-display-now]");
const btOperand = document.querySelectorAll("[data-btn-operand]");
const btnDelete = document.querySelector("[data-btn-del]");
const btnClear = document.querySelector("[data-btn-ac]");
const btnEqual = document.querySelector("[data-btn-equals]");
const calc = new Calculator(displayBefore, displayNow);

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        calc.selectNumber(btn.innerHTML);
        calc.updateDisplay();
    })
})

btnDelete.addEventListener("click", () => {
    calc.delete();
    calc.updateDisplay();
})

btnClear.addEventListener("click", () => {
    calc.defaultCalc();
    calc.updateDisplay();
})

btOperand.forEach(btn => {
    btn.addEventListener("click", () => {
        calc.selectOperation(btn.innerHTML);
        calc.updateDisplay();
    })
})

btnEqual.addEventListener("click",() => {
    calc.compute();
    calc.updateDisplay();
})