var inputTxt;
var outputWordsTxt;
var scientificSpan;


var calcMemory = 0.0;
var result = 0.0;
var curOperator = "+";
var hasJustCalculated = false;

function setup() {
  inputTxt = document.getElementById("userInput");
  outputWordsTxt = document.getElementById("resultInWords");
  scientificLine = document.getElementById("scientificLine");
}

function addToInput(button) {
  if (hasJustCalculated) {
    inputTxt.value = "";
    hasJustCalculated = false;
  }
  if(button.value != "."){
    if (inputTxt.value.includes(".")) {
        if (inputTxt.value.split('.')[1].length < 2) {
          inputTxt.value += button.value;
        }
    }
    else {
      inputTxt.value += button.value;
    }

  }
  else {
    if (!inputTxt.value.includes(".")) {
      inputTxt.value += ".";
    }
  }
}

function addToInputFromKeyboard() {
  var valueToAdd = "";
  if (event.keyCode == 48 || event.keyCode == 96) {
    valueToAdd = "0";
  }
  else if (event.keyCode == 49 || event.keyCode == 97) {
    valueToAdd = "1";
  }
  else if (event.keyCode == 50 || event.keyCode == 98) {
    valueToAdd = "2";
  }
  else if (event.keyCode == 51 || event.keyCode == 99) {
    valueToAdd = "3";
  }
  else if (event.keyCode == 52 || event.keyCode == 100) {
    valueToAdd = "4";
  }
  else if (event.keyCode == 53 || event.keyCode == 101) {
    valueToAdd = "5";
  }
  else if (event.keyCode == 54 || event.keyCode == 102) {
    valueToAdd = "6";
  }
  else if (event.keyCode == 55 || event.keyCode == 103) {
    valueToAdd = "7";
  }
  else if (event.keyCode == 56 || event.keyCode == 104) {
    valueToAdd = "8";
  }
  else if (event.keyCode == 57 || event.keyCode == 105) {
    valueToAdd = "9";
  }
  else if (event.keyCode == 110 || event.keyCode == 190) {
    if (!inputTxt.value.includes(".")) {
      valueToAdd = ".";
    }
  }
  if (inputTxt.value.includes(".")) {
      if (inputTxt.value.split('.')[1].length < 2) {
        inputTxt.value += valueToAdd;
      }
  }
  else {
    inputTxt.value += valueToAdd;
  }
}

function clearUserInput() {
  inputTxt.value = "";
  result = 0.0;
}


function selectChange(select) {
  console.log(select.options[select.selectedIndex].value);
  if (select.options[select.selectedIndex].value == "st") {
    scientificHide();
  }
  else {
    scientificShow();
  }
}

function scientificShow() {
  console.log("hello");
  scientificLine.style.visibility = "visible";
}

function scientificHide() {
  scientificLine.style.visibility = "hidden";
}

function memoryAdd() {
  calcMemory += parseFloat(inputTxt.value);
}

function memorySubtract() {
  calcMemory -= parseFloat(inputTxt.value);
}

function memoryRecall() {
  if (calcMemory!=null) {
    inputTxt.value = calcMemory.toString();
  }
  else {
    inputTxt.value = 0;
  }

}

function memoryClear() {
  calcMemory = null;
}

function changeOperator(button) {
  curOperator = button.value;
  if (result == 0.0) {
    result = parseFloat(inputTxt.value);
    inputTxt.value = "";
  }
}

function calculate() {
  if (inputTxt.value != null) {
    switch (curOperator) {
      case "+":
        result = result + parseFloat(inputTxt.value);
        inputTxt.value = result;
        break;
      case "-":
        result = result - parseFloat(inputTxt.value);
        inputTxt.value = result;;
        break;
      case "x":
        result = result * parseFloat(inputTxt.value);
        inputTxt.value = result;
        break;
      case "÷":
        result = result / parseFloat(inputTxt.value);
        inputTxt.value = result;
        break;
    }
    hasJustCalculated = true;
    numWordsOut(result);
  }
}

function calcSinCosTan(button) {
  if (button.value== "sin()") {
    result = Math.sin(parseFloat(inputTxt.value));
    inputTxt.value = result;
    hasJustCalculated = true;
  }
  else if (button.value== "cos()") {
    result = Math.cos(parseFloat(inputTxt.value));
    inputTxt.value = result;
    hasJustCalculated = true;
  }
  else if (button.value== "tan()") {
    result = Math.tan(parseFloat(inputTxt.value));
    inputTxt.value = result;
    hasJustCalculated = true;
  }
}


function numWordsOut(result){
    var out ="";

    if(result<0){
      result -= result*2;
      out += "Minus ";
    }
    if (result >= 1000 & result<10000){
      out +=  ones(parseInt(result/1000)) + " Thousand " ;
      result=result-(parseInt(result/1000)*1000)
      if (result != 0) {
        out += "and "
      }
    }

    if (result >= 100 & result<1000){
      out +=  ones(parseInt(result/100)) + " Hundred " ;
      result=result-(parseInt(result/100)*100)
      if (result != 0) {
        out += "and "
      }
    }
    if(result>=20 & result<100){
      out += tens(parseInt(result/10)*10);
      result=result-parseInt(result/10)*10
    }
    if (result <20){
      out += ones(parseInt(result));
    }
    if(result.toString().includes(".")) {
      out += " Point "
      numbersAfterPoint = inputTxt.value.split('.')[1];
      console.log(inputTxt.value.split('.')[1]);
      for (var i = 0;  i < numbersAfterPoint.length; i++) {
        out += ones(parseInt(numbersAfterPoint.charAt(i))) + " ";
      }
    }
  outputWordsTxt.value = out;

  }

  function tens(number){
    var tens = "";
    switch (number){
      case 20:  tens="Twenty ";break;
      case 30:  tens="Thirty ";break;
      case 40: tens="Fourty ";break;
      case 50: tens="Fifty ";break;
      case 60: tens="Sixty ";break;
      case 70: tens="Seventy ";break;
      case 80: tens="Eighty ";break;
      case 90: tens="Ninety ";break;
    }
    return tens;
}

function ones(number){
    var letters = "";
    switch (number){
       case 1: letters="One";break;
       case 2: letters="Two";break;
        case 3: letters="Three";break;
   			case 4: letters="Four";break;
   			case 5: letters="Five";break;
   			case 6: letters="Six";break;
   			case 7: letters="Seven";break;
   			case 8: letters="Eight";break;
   			case 9: letters="Nine";break;
   			case 10: letters="Ten";break;
   			case 11: letters="Eleven";break;
   			case 12: letters="Twelve";break;
   			case 13: letters="Thirteen";break;
   			case 14: letters="Fourteen";break;
   			case 15: letters="Fifteen";break;
   			case 16: letters="Sixteen";break;
   			case 17: letters="Seventeen";break;
   			case 18: letters="Eighteen";break;
   			case 19: letters="Nineteen";break;
     }

     return letters;

  }
