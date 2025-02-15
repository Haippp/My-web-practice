const startGameContainer = document.querySelector(".start-game"),
  startGameCards = document.querySelectorAll(".start-game .card"),
  startGameButton = document.querySelector(".start-game button"),
  playgroundContainer = document.querySelector(".playground"),
  faRepeat = document.querySelector(".fa-repeat");

let levels = 2,
  rows = 2,
  column = 2,
  cardOne,
  cardTwo,
  matched = 0,
  isPreventClick = true;

startGameCards.forEach((element) => {
  element.addEventListener("click", (e) => {
    startGameCards.forEach((el) => {
      el.classList.remove("active");
    });
    e.target.parentElement.classList.add("active");

    levels = e.target.parentElement.getAttribute("level");
    column = e.target.parentElement.getAttribute("column");
    rows = e.target.parentElement.getAttribute("row");

    console.log(levels, column, rows);
  });
});

startGameButton.addEventListener("click", (e) => {
  startGameContainer.style.display = "none";
  playgroundContainer.style.display = "grid";
  playgroundContainer.style.gridTemplateColumns = `repeat(${column}, 100px)`;
  playgroundContainer.style.gridTemplateRows = `repeat(${rows}, 100px)`;

  createCards();
});

function createCards() {
  const cardArr = [
    "hippo",
    "dog",
    "otter",
    "dragon",
    "worm",
    "spider",
    "shrimp",
    "cow",
    "mosquito",
    "dove",
  ];
  shuffleArr(cardArr);
  shuffleCards([...cardArr.slice(0, levels), ...cardArr.slice(0, levels)]);
}

const shuffleArr = (cardArr) => {
  for (let i = cardArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cardArr[i];
    cardArr[i] = cardArr[j];
    cardArr[j] = temp;
  }
};

function shuffleCards(cards) {
  shuffleArr(cards);
  playgroundContainer.innerHTML = "";

  for (let i = 0; i < cards.length; i++) {
    playgroundContainer.innerHTML += `
        <div class="card" onclick="flipCard(this)">
            <div class="front"><i class="fa-solid fa-question"></i></div>
            <div class="back"><i class="fa-solid fa-${cards[i]}"></i></div>
        </div>`;
  }

  faRepeat.style.display = "block";
}

function flipCard(card) {
  if (cardOne != card && isPreventClick) {
    card.classList.add("flip");
    if (!cardOne) {
      cardOne = card;
      return;
    }
    cardTwo = card;
    isPreventClick = false;

    let cardOneValue = cardOne.querySelector(".back").innerHTML,
      cardTwoValue = cardTwo.querySelector(".back").innerHTML;
    matchedCard(cardOneValue, cardTwoValue);
  }
}

function matchedCard(cardOneValue, cardTwoValue) {
  if (cardOneValue === cardTwoValue) {
    matched++;
    if (matched == levels) {
      winSFX();
      setTimeout(() => {
        alert("Selamat kamu menang!");
        startGameContainer.style.display = "grid";
        playgroundContainer.style.display = "none";
        faRepeat.style.display = "none";
      }, 500);
    }
    rightSFX();
    cardOne.classList.add("match");
    cardTwo.classList.add("match");

    cardOne.removeAttribute("onclick");
    cardTwo.removeAttribute("onclick");

    (cardOne = ""), (cardTwo = "");
    isPreventClick = true;
    return;
  }

  setTimeout(() => {
    wrongSFX();
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 500);
  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    (cardOne = ""), (cardTwo = "");
    isPreventClick = true;
  }, 1200);
}

faRepeat.addEventListener("click", () => {
  startGameContainer.style.display = "grid";
  playgroundContainer.style.display = "none";
  faRepeat.style.display = "none";

  (cardOne = ""), (cardTwo = ""), (matched = 0), (isPreventClick = true);
});

function wrongSFX() {
  let wrongSFX = new Audio("src/sfx/wrong-47985.mp3")
  wrongSFX.play();
}

function rightSFX() {
  let rightSFX = new Audio("src/sfx/correct-156911.mp3")
  rightSFX.play();
}

function winSFX() {
  let winSFX = new Audio("src/sfx/violin-win-5-185128.mp3")
  winSFX.play();
}