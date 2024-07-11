const cards = document.querySelectorAll(".memory-card");
const refresh = document.querySelector(".refresh img");
const final = document.querySelector(".final");
const congrats = document.querySelector("#congratsSection");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
const again = document.querySelector(".again");
const totalTime = document.querySelector("#totalTime");

var audio = new Audio('https://github.com/AlakbarovaLeyli/MINECRAFT_MATCH/blob/main/assets/aria-math.mp3');
audio.volume=0.2;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false; 
let totalSeconds = 0;
let interval;
let finalTime;
let click = -1;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    startTime();
    return;
  }
  //second click
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.id === secondCard.dataset.id;
  isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
  //eşleştiğinde
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  gameWon();
}

function unFlipCards() {
  lockBoard = true;
  //not match
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 700);
}

function resetBoard() {
  // card döndüğünde tekrar tıklayabilmemizi sağlar
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//refresh butonuna basildiginda
refresh.addEventListener("click", function () {
  confirm("Are you sure that?");
  location.reload();
});

//zaman göstergesi
function startTime() {
  if (click === -1) {
    interval = setInterval(function () {
      //interval belirli araliklarla sürekli çalişmasini saglar.
      final.innerHTML = "You won in " + finalTime + " time!";
      finalTime = minute.innerHTML + ":" + second.innerHTML;
      totalSeconds++;
      second.innerHTML = pad(totalSeconds % 60);
      minute.innerHTML = pad(parseInt(totalSeconds / 60));
    }, 1000);
    audio.play();
  }
  click = 1;
}

function pad(val) {
  // 00:00 şeklinde ilerlesin zaman.
  const valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

//game won
function gameWon() {
  if (click < 1) {
    firstCard = e.target;
  }

  if (document.getElementsByClassName("flip").length === 16) {
    congratsSection.classList.replace("hidden", "show");
    clearInterval(interval);
    finalTime = minute.innerHTML + ":" + second.innerHTML;
    final.innerHTML = "You won in " + finalTime + " time!";
    totalTime.innerHTML = finalTime;
    audio.pause();
    audio.currentTime=0;
  }
  click = 0;
}


again.addEventListener("click", function () {
  congratsSection.classList.replace("show", "hidden");
  location.reload();
});

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
