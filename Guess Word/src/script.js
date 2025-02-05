const inputs = document.querySelector(".input"),
  resetButton = document.querySelector(".reset-btn"),
  typingInput = document.querySelector(".typing-input"),
  hints = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess-left  span"),
  wrongLetter = document.querySelector(".wrong-letter span");

let word, maxGuess, incorrects = [], corrects = [];

function randomWord() {
  let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranObj.word; // Menyimpan kata yang dipilih
  maxGuess = 8, incorrects = [], corrects = [];
  console.log(word);

  hints.innerText = ranObj.hint;
  wrongLetter.innerHTML = incorrects;
  guessLeft.innerText = maxGuess;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled/>`;
  }
  inputs.innerHTML = html;
}

randomWord();

function initGame(e) {
  let key = e.target.value;
  if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)) {
    console.log(key);
    if (word.includes(key)) { //if user letter found in the word
      for (let i = 0; i < word.length; i++) {
        //showing matched letter in the input value
        if (word[i] ===  key) {
          corrects.push(key);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxGuess--;
      incorrects.push(` ${key}`);
    }
    guessLeft.innerText = maxGuess;
    wrongLetter.innerHTML = incorrects;
  }
  typingInput.value = "";

  setTimeout(() => {
    if(corrects.length === word.length){
      alert("Selamat kamu menang!");
      randomWord();
    }
    else if(maxGuess < 1){
      alert("Game Over! Jawaban sebenarnya adalah :");
      for(let i = 0 ; i < word.length ; i++){
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  })
}

resetButton.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
