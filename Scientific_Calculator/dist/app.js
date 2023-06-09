"use strict";
const actions = document.querySelector(".actions");
let ans = document.getElementById("input");
ans.value = "0";
let expression = "";
let memory = 0;
let eventVal;
actions.addEventListener("click", (e) => {
    var _a;
    const target = e.target;
    eventVal = target.value || ((_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.value);
    callFuntion(eventVal);
});
document.addEventListener("keyup", (e) => {
    if (e.key == "=" || e.key == "0" || e.key == "1" || e.key == "2" || e.key == "3" || e.key == "4" || e.key == "5" || e.key == "6" || e.key == "7" || e.key == "8" || e.key == "9" || e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/" || e.key == "." || e.key == "Enter"
        || e.key == "Backspace" || e.key == "!" || e.key == "(" || e.key == ")" || e.key == "%" || e.key == "^") {
        callFuntion(e.key);
    }
});
function callFuntion(value) {
    if (value !== undefined) {
        removezero();
        ans.value = "";
        switch (value) {
            case "DEG":
            case "RAD":
                degrad();
                break;
            case "fe":
                expression = parseFloat(expression).toExponential();
                forNaN(expression);
                break;
            case "mc":
                memory = 0;
                expression = memory.toString();
                document.getElementById("mc").disabled = true;
                document.getElementById("mr").disabled = true;
                break;
            case "mr":
                let finalans = expression + memory;
                expression = finalans;
                removezero();
                break;
            case "ms":
                memory = parseFloat(expression);
                expression = "0";
                document.getElementById("mc").disabled = false;
                document.getElementById("mr").disabled = false;
                break;
            case "m+":
                memory = memory + parseFloat(expression);
                expression = "0";
                break;
            case "m-":
                memory = (memory - parseFloat(expression));
                expression = "0";
                break;
            case "log2":
                expression = Math.log2(parseFloat(expression)).toString();
                forNaN(expression);
                break;
            case "rnd":
                expression = Math.random().toString();
                break;
            case "log1p":
                expression = Math.log1p(parseFloat(expression)).toString();
                forNaN(expression);
                break;
            case "2^n":
                expression = Math.pow(2, parseFloat(expression)).toString();
                forNaN(expression);
                break;
            case "3^n":
                expression = Math.pow(3, parseFloat(expression)).toString();
                forNaN(expression);
                break;
            case "n^3":
                expression = Math.pow(parseFloat(expression), 3).toString();
                forNaN(expression);
                break;
            case "3root":
                expression = Math.cbrt(parseFloat(expression)).toString();
                forNaN(expression);
                break;
            case "pi":
                let expval = expression.toString().slice(-1);
                if (expval === "+" ||
                    expval === "*" ||
                    expval === "-" ||
                    expval === "/" ||
                    expval === "") {
                    expression += "3.14159";
                }
                else {
                    expression += "*3.14159";
                }
                break;
            case "ce":
                expression = "";
                ans.value = "0";
                break;
            case "clear":
            case "Backspace":
                expression = expression
                    .toString()
                    .substring(0, expression.toString().length - 1);
                break;
            case "square":
                expression = Math.pow(parseFloat(expression), 2).toString();
                forNaN(expression);
                break;
            case "1/x":
                expression = "1/";
                break;
            case "|x|":
                expression = Math.abs(parseFloat(expression)).toString();
                forNaN(expression);
                break;
            case "exp":
                let exp_val = expression.toString().slice(-1);
                if (exp_val === "+" ||
                    exp_val === "*" ||
                    exp_val === "-" ||
                    exp_val === "/" ||
                    exp_val === "") {
                    expression += "2.71828";
                }
                else {
                    expression += "*2.71828";
                }
                break;
            case "sqrt":
                expression = "√";
                break;
            case "*(":
                let expp = expression.toString().slice(-1);
                if (expp === "+" ||
                    expp === "*" ||
                    expp === "-" ||
                    expp === "/" ||
                    expp === "") {
                    expression += "(";
                }
                else {
                    expression += "*(";
                }
                break;
            case "factorial":
            case "!":
                expression += "!";
                break;
            case "numpow":
            case "^":
                expression += "^";
                break;
            case "=":
            case "Enter":
                removezero();
                if (expression.toString().includes("√")) {
                    squareroot();
                }
                else if (expression.toString().includes("log")) {
                    logten();
                }
                else if (expression.toString().includes("ln")) {
                    ln();
                }
                else if (expression.toString().includes("^")) {
                    numpower();
                }
                else if (expression.toString().includes("!")) {
                    factorialNum();
                }
                else if (expression.toString().includes("sin") || expression.toString().includes("cos") || expression.toString().includes("tan")) {
                    trignoCalc();
                }
                else {
                    try {
                        const answer = eval(expression);
                        expression = answer;
                    }
                    catch (_a) {
                        expression = "Syntax Error";
                    }
                }
                forNaN(expression);
                break;
            case "10power":
                expression = "10^";
                break;
            case "ln":
                expression = "ln";
                break;
            case "log10":
                expression += "log";
                break;
            case "sin":
                expression += 'sin(';
                break;
            case "cos":
                expression += 'cos(';
                break;
            case "tan":
                expression += 'tan(';
                break;
            case "+/-":
                if (parseFloat(expression) > 0) {
                    expression = (parseFloat(expression) * -1).toString();
                }
                else {
                    expression = Math.abs(parseFloat(expression)).toString();
                }
                break;
            case "0":
                if (expression === "0") {
                    expression = value.toString();
                }
                else {
                    expression += 0;
                }
                break;
            default:
                let exp = expression + value;
                let lastChar = exp.charAt(exp.length - 1) == "/" || exp.charAt(exp.length - 1) == "+" || exp.charAt(exp.length - 1) == "-" || exp.charAt(exp.length - 1) == "*";
                if (expression) {
                    let secLastChar = expression.charAt(expression.length - 1) == "/" || expression.charAt(expression.length - 1) == "+" || expression.charAt(expression.length - 1) == "-" || expression.charAt(expression.length - 1) == "*";
                    if (lastChar && secLastChar) {
                        expression = expression;
                    }
                    else {
                        expression += value;
                    }
                }
                else {
                    expression += value;
                }
        }
        if (expression == undefined) {
            expression = "";
            ans.value = "0";
        }
        else {
            ans.value = expression;
        }
    }
}
function removezero() {
    if (expression.toString().charAt(0) === '0') {
        expression = expression.toString().substring(1, expression.toString().length);
    }
}
// Function for Trignometric function
function trignoCalc() {
    if (expression.includes(')')) {
        const num = expression.substring(4, expression.length - 1);
        if (expression.includes('sin')) {
            expression = Math.sin(parseFloat(num)).toString();
        }
        else if (expression.includes('cos')) {
            expression = Math.cos(parseFloat(num)).toString();
        }
        else if (expression.includes('tan')) {
            expression = Math.tan(parseFloat(num)).toString();
        }
    }
    else {
        const num = expression.substring(4, expression.length);
        if (expression.includes('sin')) {
            expression = Math.sin(parseFloat(num)).toString();
        }
        else if (expression.includes('cos')) {
            expression = Math.cos(parseFloat(num)).toString();
        }
        else if (expression.includes('tan')) {
            expression = Math.tan(parseFloat(num)).toString();
        }
    }
}
// Function for factorial of number 
function factorialNum() {
    let fact = 1;
    if (isNaN(parseFloat(expression))) {
        expression = "Error";
    }
    else {
        for (let i = 1; i <= parseFloat(expression); i++) {
            fact *= i;
        }
        expression = fact.toString();
    }
}
// Function to calculate log10       
function logten() {
    const num = expression.substring(3, expression.length);
    expression = Math.log10(parseFloat(num)).toString();
}
// function to calculate ln
function ln() {
    const num = expression.substring(2, expression.length);
    expression = Math.log(parseFloat(num)).toString();
}
//function to calculate squareroot
function squareroot() {
    const num = expression.substring(1, expression.length);
    expression = Math.sqrt(parseFloat(num)).toString();
}
//function to calculate power
function numpower() {
    let symbol = expression.indexOf("^");
    let exp1 = expression.slice(0, symbol);
    var exp2 = expression.slice(symbol + 1, expression.length);
    expression = (parseFloat(exp1) ** parseFloat(exp2)).toString();
}
//function to convert radian to degree and degree to radian
function degrad() {
    let val = document.getElementById("rd");
    if (val.value === "DEG") {
        expression = (parseFloat(expression) * (180 / Math.PI)).toString();
        val.value = "RAD";
    }
    else {
        expression = (parseFloat(expression) * (Math.PI / 180)).toString();
        val.value = "DEG";
    }
    forNaN(expression);
}
const forNaN = (exp) => {
    if (isNaN(parseFloat(exp))) {
        expression = "Error";
    }
    else {
        expression = exp;
    }
};
