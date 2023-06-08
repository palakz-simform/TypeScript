const actions = document.querySelector(".actions")!;
let ans = document.getElementById("input")! as HTMLInputElement;
ans.value = "0";
let expression:string = "";
let memory:number = 0;
let eventVal:string


actions.addEventListener("click", (e:Event) => {
    const target = e.target as HTMLInputElement | HTMLButtonElement;
    eventVal = target.value || (target.parentElement as HTMLButtonElement)?.value;
    callFuntion(eventVal)
})

document.addEventListener("keyup",(e:KeyboardEvent)=>{
    console.log(e.key)
    if(e.key == "=" || e.key=="0" || e.key=="1" || e.key=="2" || e.key=="3" || e.key=="4" || e.key=="5" || e.key=="6" || e.key=="7" || e.key=="8" || e.key=="9" || e.key=="+" || e.key=="-" || e.key=="*" || e.key=="/" || e.key=="."|| e.key=="Enter" 
    ||e.key=="Backspace" || e.key=="!" || e.key=="(" || e.key==")" || e.key=="%" || e.key=="^" ){
        callFuntion(e.key)
    }
})
 function callFuntion(value:string){
    if (value !== undefined) {
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
            (document.getElementById("mc") as HTMLButtonElement).disabled = true;
            (document.getElementById("mr") as HTMLButtonElement).disabled = true;
            break;
    
          case "mr":
            let finalans = expression + memory;
            expression = finalans;
            removezero()
            break;
    
          case "ms":
            memory = parseFloat(expression)
            expression = "0";        
            (document.getElementById("mc") as HTMLButtonElement).disabled = false;
            (document.getElementById("mr") as HTMLButtonElement).disabled = false;
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
            if (
              expval === "+" ||
              expval === "*" ||
              expval === "-" ||
              expval === "/" ||
              expval === ""
            ) {
              expression += "3.14159";
            } else {
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
            if (
              exp_val === "+" ||
              exp_val === "*" ||
              exp_val === "-" ||
              exp_val === "/" ||
              exp_val === ""
            ) {
              expression += "2.71828";
            } else {
              expression += "*2.71828";
            }
    
            break;
    
          case "sqrt":
            expression = "√";
            break;
    
          case "*(":
            let expp = expression.toString().slice(-1);
            if (
              expp === "+" ||
              expp === "*" ||
              expp === "-" ||
              expp === "/" ||
              expp === ""
            ) {
              expression += "(";
            } else {
              expression += "*(";
            }
            break;
    
          case "factorial":
          case "!":
            expression += "!"          
            break;
    
          case "numpow":
          case "^":
            expression += "^";
            break;
    
          case "=":
          case "Enter":
            removezero();
            try {
              if (expression.includes("√")) {
                squareroot();
              } else if (expression.includes("log")) {
                logten();
              } else if (expression.includes("ln")) {
                ln();
              } else if (expression.includes("^")) {
                numpower();
              } else if(expression.includes("!")){
                factorialNum()
              } else {
                const answer = eval(expression);
                expression = answer;
              }
            } catch {
              expression = "Syntax Error";
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
            expression = "log";
            break;
    
          case "sin":
            expression = Math.sin(parseFloat(expression)).toString();
            forNaN(expression);
            break;
    
          case "cos":
            expression = Math.cos(parseFloat(expression)).toString();
            forNaN(expression);
            break;
    
          case "tan":
            expression = Math.tan(parseFloat(expression)).toString();
            forNaN(expression);
            break;
    
          case "+/-":
            if (parseFloat(expression) > 0) {
              expression = (parseFloat(expression) * -1).toString();
            } else {
              expression = Math.abs(parseFloat(expression)).toString();
            }
            break;
    
          case "0":
            if (expression === "0") {
              expression = value;
            } else {
              expression += 0;
            }
            break;
    
          default:
            expression += value;
        } 
    
        if (expression == undefined) {
          expression = "";
          ans.value = "0";
        } else {
          ans.value = expression;
        }
      }
 }
 function removezero() {
    if (expression.charAt(0) === "0") {
      expression = expression
        .toString()
        .substring(1, expression.toString().length);
    }
  }

  function factorialNum(){
      let fact = 1;
      if (isNaN(parseFloat(expression))) {
        expression = "Error";
      } else {
        for (let i:number = 1; i <= parseFloat(expression); i++) {
          fact *= i;
        }
        expression = fact.toString();
      }
  }
  // Function to calculate log10       
  function logten() {
     const e:string = expression.substring(3, expression.length);
    expression = Math.log10(parseFloat(e)).toString();
  }

  // function to calculate ln
  function ln() {
    const e:string = expression.substring(2, expression.length);
    expression = Math.log(parseFloat(e)).toString();
  }

  //function to calculate squareroot
  function squareroot() {
    const e:string = expression.substring(1, expression.length);       
    expression = Math.sqrt(parseFloat(e)).toString();
  }

  //function to calculate power
  function numpower() {
    let symbol:number = expression.indexOf("^");
    let exp1:string = expression.slice(0, symbol);
    var exp2:string = expression.slice(symbol + 1, expression.length);
    expression = (parseFloat(exp1) ** parseFloat(exp2)).toString();
  }

  //function to convert radian to degree and degree to radian
  function degrad() {
    let val = document.getElementById("rd")! as HTMLButtonElement;

    if (val.value === "DEG") {
      expression = (parseFloat(expression) * (180 / Math.PI)).toString();
      val.value = "RAD";
    } else {
      expression = (parseFloat(expression) * (Math.PI / 180)).toString();
      val.value = "DEG";
    }
    forNaN(expression);
  }

  //function to check if the value of expression is NaN
  function forNaN(exp:string):void {
    if (isNaN(parseFloat(exp))) {
      expression = "Error";
    } else {
      expression = exp;
    }
  }
  