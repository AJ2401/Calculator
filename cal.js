class cal {
     constructor(pre, cur) {
       this.preT = pre;
       this.curT = cur;
       this.clear();
     }
     clear() {
       this.curop = "";
       this.preop = "";
       this.operation = undefined;
     }
     del() {
       this.curop = this.curop.toString().slice(0, -1);
     }
     append(number) {
       if (number == "." && this.curop.includes(".")) {
         return;
       }
       //this.curop=number;
       this.curop = this.curop.toString() + number.toString();
     }
     operator(operation) {
       if (this.curop == "") {
         return;
       }
       if (this.preop != "") {
         this.compute();
       }
       this.operation = operation;
       this.preop = this.curop;
       this.curop = "";
     }
     compute() {
       let computate;
       const pre = parseFloat(this.preop);
       const cur = parseFloat(this.curop);
       if (isNaN(pre) || isNaN(cur)) {
         return;
       }
       switch (this.operation) {
         case "+":
           computate = pre + cur;
           break;
         case "-":
           computate = per - cur;
           break;
         case "*":
           computate = pre * cur;
           break;
         case "÷":
           computate = pre / cur;
           break;
         default:
           return;
       }
       this.curop = computate;
       this.operation = undefined;
       this.preop = "";
     }
     display_num(number) {
       const strnum = number.toString();
       const intnum = parseFloat(strnum.split(".")[0]);
       const decnum = strnum.split(".")[1];
       const num = parseFloat(number);
   
       let intdisplay;
       if (isNaN(intnum)) {
         intdisplay = "";
       } else {
         intdisplay = intnum.toLocaleString("en",{ maximumFractionDigits:1});
       }
       if (decnum != null) {
         return `${intdisplay}.${decnum}`;
       } else {
         return (intdisplay);
       }
     }
     display() {
       this.curT.innerText = this.display_num(this.curop);
       if (this.operation != null) {
         this.preT.innerText = `${this.display_num(this.preop)}${this.operation}`;
       } else {
         this.preT.innerText = "";
       }
     }
   }
   const num = document.querySelectorAll("[data-number]");
   const op = document.querySelectorAll("[data-operation]");
   const c = document.querySelector("[data-clear]");
   const eq = document.querySelector("[data-equal-operator]");
   const pre = document.querySelector("[data-pre-operand]");
   const cur = document.querySelector("[data-cur-operand]");
   const del = document.querySelector("[data-delete]");
   
   const calculator = new cal(pre, cur);
   
   num.forEach((button) => {
     button.addEventListener("click", () => {
       calculator.append(button.innerText);
       calculator.display();
     });
   });
   
   op.forEach((button) => {
     button.addEventListener("click", () => {
       calculator.operator(button.innerText);
       calculator.display();
     });
   });
   
   eq.addEventListener("click", (button) => {
     calculator.compute();
     calculator.display();
   });
   c.addEventListener("click", (button) => {
     calculator.clear();
     calculator.display();
   });
   del.addEventListener("click", (button) => {
     calculator.del();
     calculator.display();
   });
   