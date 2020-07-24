var button = document.getElementById("button");
var input = document.getElementById("input");
var engInput = "";
var translation = document.getElementById("translation");
var heading = document.getElementById("heading");
var images = document.getElementById("images");
var copyBtn = document.getElementById("copy");
var answerbox = document.getElementById("answer-box");
var newtrans = document.getElementById("newtrans");
var reverseBtn = document.getElementById("reverse");

var p = document.createElement("p");
p.id = "answer";
answerbox.insertBefore(p, answerbox.firstChild);;
var answer = document.getElementById("answer");



function translatePigLatin(str) {
  let result = [];
  let index = 0;
  let arr = str.split(" ");
  let vowels = /^((\W*)([aeiou]+))(\w*)(\W*)/i;
  let cons = /(\W*)([bcdfghjklmnpqrstvwxyz]+)('*"*)([bcdfghjklmnpqrstvwxyz]*)([aeiou]*)(\w*)(\W*)/i;

    arr.forEach((word) => {
      if(vowels.test(word)){
        result.push(word.replace(vowels, "$2$3$4way$5"));
      } else if(!/\w+/gi.test(word)){
        result.push(word);
      } else {
        result.push(word.replace(cons, "$1$5$6$2$4$3ay$7"));
      }
    })

    let finalClone = [...result];
    result.forEach(word => {
      let capitalReg = /[A-Z]/.test(word);
      if(capitalReg && /^\W+/.test(word)){
        let capAfter = /[\w]/.exec(word).index;
        finalClone.splice(index, 1, word.toLowerCase())
        let thisOtherWord = finalClone[index].slice(0, capAfter)
                          + [finalClone[index][capAfter].toUpperCase()]
                          + finalClone[index].slice(capAfter+1);
        finalClone.splice(index, 1, thisOtherWord);
      } else if (capitalReg){      
        finalClone.splice(index, 1, word.toLowerCase())
        let thisWord = [finalClone[index][0].toUpperCase()]
                       + finalClone[index].slice(1);
        finalClone.splice(index, 1, thisWord);       
      }
      index++;
    })
    
    return finalClone.join(" ");
  }
// }

function storeValue(){
	if (input.value.length > 0){
		engInput = input.value;
		input.value = "";		
		p.innerHTML = translatePigLatin(engInput);
    input.style.display = 'none';
    button.style.display = 'none';
    answerbox.style.display = 'flex';
	} else {
		alert("Please enter text to translate.");
	}
}

function reverse(){
  if(p.innerHTML == translatePigLatin(engInput)){
    p.innerHTML = engInput;
  } else {
    p.innerHTML = translatePigLatin(engInput);
  }
}


function copyText () {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = answer.textContent;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function storeEnter(e){
	if(e.charCode === 13){
		storeValue();
	}
}

function titleTranslate(){
  if(heading.textContent == "PIG LATIN TRANSLATOR"){
    heading.textContent = "IGPAY ATINLAY ANSLATORTRAY";
  } else {
    heading.textContent = "PIG LATIN TRANSLATOR";
  }}

function newTrans(){
    input.style.display = 'initial';
    button.style.display = 'initial';
    answerbox.style.display = 'none';
}

button.addEventListener("click", storeValue, false);
document.addEventListener("keypress", storeEnter, false);
newtrans.addEventListener("click", newTrans, false);
images.addEventListener("click", titleTranslate, false);
reverseBtn.addEventListener("click", reverse, false);
// answer.addEventListener("mousedown", function(e){e.preventDefault();}, false);
// heading.addEventListener("mousedown", function(e){e.preventDefault();}, false);
copyBtn.addEventListener("click", copyText, false);