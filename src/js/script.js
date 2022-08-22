const cards = [
	"src/images/3parrots.gif",
	"src/images/birthdayparrot.gif",
	"src/images/brazilparrot.gif",
	"src/images/detectiveparrot.gif",
	"src/images/devilparrot.gif",
	"src/images/dogeparrot.gif",
	"src/images/drinkingparrot.gif",
	"src/images/footballparrot.gif",
	"src/images/headbangingparrot.gif",
	"src/images/lsdparrot.gif",
	"src/images/mustacheparrot.gif",
	"src/images/negativeparrot.gif",
	"src/images/pirateparrot.gif",
	"src/images/policeparrot.gif",
	"src/images/popcornparrot.gif",
	"src/images/scientistparrot.gif",
	"src/images/soccerparrot.gif",
	"src/images/sunglassparrot.gif",
	"src/images/tenisparrot.gif",
	"src/images/unicornparrot.gif",
];

const suffledCards = [];

let firstCard = null;
let moves = 0,
	totalMoves = 0,
	wins = 0,
	id = 0;
seconds = 0;

let cardsCount = prompt("Com quantas cartas quer jogar? (Números pares entre 4 e 40)");

while (cardsCount < 4 || cardsCount > 40 || cardsCount % 2 !== 0) {
	cardsCount = prompt("Com quantas cartas quer jogar?");
}

function suffleCards() {
	for (let i = 0; i < cardsCount / 2; i++) {
		suffledCards.push(cards[i]);
		suffledCards.push(cards[i]);
	}

	suffledCards.sort(randomCard);
}

function randomCard() {
	return Math.random() - 0.5;
}

suffleCards();

function Timer() {
	seconds++;
	document.querySelector(".time").innerHTML = seconds;
}

function distributeCards() {
	const cards = document.querySelector(".cards");
	cards.innerHTML = "";

	for (let i = 0; i < cardsCount; i++) {
		cards.innerHTML += `
		<div class="card" onclick="checkCard(this)">
		<div class="face front-face"><img src="src/images/front.png"></div>
		<div class="face back-face"><img src="${suffledCards[i]}"></div>
		</div>
		`;
	}

	id = setInterval(Timer, 1000);
}

distributeCards();

function blockGame() {
	document.querySelector(".cards").classList.add("block");
}

function checkCard(card) {
	if (card.querySelector(".front-face").classList.contains("front-click") === false && document.querySelector(".cards").classList.contains("block") === false) {
		console.log(document.querySelector(".cards").classList.contains("block"));
		if (moves < 1) {
			turnCard(card);
			moves++;
			totalMoves++;
			firstCard = card;
		} else if (moves === 1) {
			turnCard(card);
			compareCard(firstCard, card);
			moves = 0;
			totalMoves++;
		}
	}
}

function compareCard(card1, card2) {
	if (card1.querySelector(".back-face").querySelector("img").getAttribute("src") === card2.querySelector(".back-face").querySelector("img").getAttribute("src")) {
		wins++;
		setTimeout(checkWinner, 500);
	} else {
		blockGame();
		setTimeout(turnCard, 1000, card1);
		setTimeout(turnCard, 1000, card2);
	}
}

function turnCard(card) {
	card.querySelector(".front-face").classList.toggle("front-click");
	card.querySelector(".back-face").classList.toggle("back-click");
	document.querySelector(".cards").classList.remove("block");
}

function checkWinner() {
	if (wins === cardsCount / 2) {
		clearInterval(id);
		alert(`Parabéns, você venceu em ${totalMoves} jogadas! e levou ${seconds} segundos!`);

		let playAgain = prompt(`Você deseja joga novamente? sim ou não?`);
		while (playAgain !== "sim" && playAgain !== "não") {
			playAgain = prompt(`Você deseja joga novamente? sim ou não?`);
		}
		if (playAgain === "sim") {
			window.location.reload();
		} else if (playAgain === "não") {
			alert("Obrigado por jogar!");
		}
	}
}
