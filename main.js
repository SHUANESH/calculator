
class Calculator {
   constructor(PREVIOUS_OPERATOR_AND_TEXT_ELEMENT,CURRENT_OPERATOR_AND_TEXT_ELEMENT){

       this.PREVIOUS_OPERATOR_AND_TEXT_ELEMENT = PREVIOUS_OPERATOR_AND_TEXT_ELEMENT;
       this.CURRENT_OPERATOR_AND_TEXT_ELEMENT = CURRENT_OPERATOR_AND_TEXT_ELEMENT;
       this.clear();
   };

   clear(){
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;

   };

   delete(){
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
       
  };


   appendNumber(number){
   if (number === '.' && this.currentOperand.includes('.')) return; 
   this.currentOperand = this.currentOperand.toString() + number.toString()
       
  };


  chooseOperation(operation){
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
          this.compute()
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
       
  };

  compute(){
       let computation 
       const prev = parseFloat(this.previousOperand);
       const current = parseFloat(this.currentOperand);
       if (isNaN(prev) || isNaN(current)) return;
       switch(this.operation){
        case '+':
            computation = prev + current;
            break
        case '-':
            computation = prev - current;
            break
        case '/':
            computation = prev / current;
            break
        case '*':
            computation = prev * current;
            break
        default:
            return;
       }

       this.currentOperand = computation;
       this.operation = undefined;
       this.previousOperand = '';

  };


   getDisplayNumber(number){
       const stringNumber = number.toString()
       const integerDigits = parseFloat(stringNumber.split('.')[0]);
       const decimalDigits = stringNumber.split('.')[1];
       let integerDisplay;
       if (isNaN(integerDigits)) {
        integerDisplay = '';
       }
       else{
        integerDisplay = integerDigits.toLocaleString('en' , {
            maximumFractionDigits: 0
        });

       }
       if (decimalDigits != null) {
           return `${integerDisplay}.${decimalDigits}`
       }
       else{
           return integerDisplay;
       }

 }

  updateDisplay(){
      this.CURRENT_OPERATOR_AND_TEXT_ELEMENT.innerText = this.getDisplayNumber(this.currentOperand);
      if (this.operation != null) {
        this.PREVIOUS_OPERATOR_AND_TEXT_ELEMENT.innerText = `${this.getDisplayNumber(this.previousOperand)}  ${this.operation}`
      }
      else{
        this.PREVIOUS_OPERATOR_AND_TEXT_ELEMENT.innerText = ''
      }
      
       
 };

};





const NUMBER_BUTTONS = document.querySelectorAll("[data-number]");
const OPERATIONS_BUTTONS = document.querySelectorAll("[data-operation]");
const EQUALS_BUTTONS = document.querySelector("[data-equals]");
const ALL_CLEAR_BUTTONS = document.querySelector("[data-all-clear]");
const DELETE_BUTTONS = document.querySelector("[data-delete]");
const PREVIOUS_OPERATOR_AND_TEXT_ELEMENT = document.querySelector("[data-previous-operator]");
const CURRENT_OPERATOR_AND_TEXT_ELEMENT = document.querySelector("[data-current-operator]");




const calculator = new Calculator(PREVIOUS_OPERATOR_AND_TEXT_ELEMENT , CURRENT_OPERATOR_AND_TEXT_ELEMENT);

NUMBER_BUTTONS.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();

    });

});


OPERATIONS_BUTTONS.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();

    });

});


EQUALS_BUTTONS.addEventListener('click' , button => {
    calculator.compute();
    calculator.updateDisplay();
});

ALL_CLEAR_BUTTONS.addEventListener('click' , button => {
    calculator.clear();
    calculator.updateDisplay();
})

DELETE_BUTTONS.addEventListener('click' , button => {
    calculator.delete();
    calculator.updateDisplay();
})