// Variable declaration
let button = document.getElementById("button");
let input = document.getElementById("input");
let engInput = "";
let translation = document.getElementById("translation");
let heading = document.getElementById("heading");
let images = document.getElementById("images");
let copyBtn = document.getElementById("copy");
let answerbox = document.getElementById("answer-box");
let newtrans = document.getElementById("newtrans");
let reverseBtn = document.getElementById("reverse");

let p = document.createElement("p");
p.id = "answer";
answerbox.insertBefore(p, answerbox.firstChild);;
let answer = document.getElementById("answer");



function translatePigLatin(str) {
  let result = [];
  let index = 0;
  let arr = str.split(" ");
  let vowels = /^((\W*)([aeiou]+))(\w*)(\W*)/i;
  let cons = /(\W*)([bcdfghjklmnpqrstvwxyz]+)('*"*)([bcdfghjklmnpqrstvwxyz]*)([aeiou]*)(\w*)(\W*)/i;
  
    // Test each word for vowels, consonatnts or symbols and handle them accordingly
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
    // Handle capitalisation of words that include capital letters
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

// Determine if text has been iputted, store value if yes, alert user if no
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

// Reverse translate (Pig Latin to English)
function reverse(){
  if(p.innerHTML == translatePigLatin(engInput)){
    p.innerHTML = engInput;
  } else {
    p.innerHTML = translatePigLatin(engInput);
  }
}

// Copy text to user's clipboard
function copyText () {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = answer.textContent;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

// Charcode 13 = Enter key
// Let user pushing enter key submit value
function storeEnter(e){
	if(e.charCode === 13){
		storeValue();
	}
}

// Reset for new translation
function newTrans(){
    input.style.display = 'initial';
    button.style.display = 'initial';
    answerbox.style.display = 'none';
}

// Event Listeners
button.addEventListener("click", storeValue, false);
document.addEventListener("keypress", storeEnter, false);
newtrans.addEventListener("click", newTrans, false);
reverseBtn.addEventListener("click", reverse, false);
copyBtn.addEventListener("click", copyText, false);
