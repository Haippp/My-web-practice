const inputs = document.querySelector(".input"),
  resetButton = document.querySelector(".reset-btn"),
  enterButton = document.querySelector(".enter-btn"),
  hints = document.querySelector(".hint span");

let word; // Menyimpan kata yang dipilih
let incorrect = []; // Menyimpan huruf yang salah
let remainingGuesses = 10; // Menyimpan jumlah tebakan tersisa

function randomWord() {
  let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranObj.word; // Menyimpan kata yang dipilih
  console.log(word);

  hints.innerText = ranObj.hint;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input class="input${i}" type="text" maxlength="1" autofocus/>`;
  }
  inputs.innerHTML = html;
}

function initGame(e) {
  let key = e.target.value;
  if (key.match(/^[A-Za-z]+$/)) {
    console.log(key);
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          inputs.querySelector("input")[i].value = key;
        }
      }
    } else {
      incorrect.push(key);
      remainingGuesses--; // Mengurangi tebakan tersisa
    }
  }
}

randomWord();

resetButton.addEventListener("click", randomWord);
enterButton.addEventListener("click", () => {
  const inputValues = Array.from(inputs.querySelectorAll("input")).map(input => input.value);
  if (inputValues.includes('')) {
    alert("Masukkan teks terlebih dahulu");
  } else {
    inputValues.forEach((value, index) => {
      if (value === word[index]) {
        inputs.querySelector(`.input${index}`).value = value; // Menjaga huruf yang benar tetap di input
      }
    });
  }
});

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("keyup", function () {
    if (this.value.length === this.maxLength) {
      let nextInput = this.nextElementSibling;
      while (nextInput && nextInput.tagName !== "INPUT") {
        nextInput = nextInput.nextElementSibling;
      }
      if (nextInput) {
        nextInput.focus();
      }
    }
  });
});
