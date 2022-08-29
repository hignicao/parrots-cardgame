const cards = [
	"3parrots",
	"birthdayparrot",
	"brazilparrot",
	"detectiveparrot",
	"devilparrot",
	"dogeparrot",
	"drinkingparrot",
	"footballparrot",
	"headbangingparrot",
	"lsdparrot",
	"mustacheparrot",
	"negativeparrot",
	"pirateparrot",
	"policeparrot",
	"popcornparrot",
	"scientistparrot",
	"soccerparrot",
	"sunglassparrot",
	"tenisparrot",
	"unicornparrot",
];

const suffledCards = [];

let firstCard = null;
let moves = 0, totalMoves = 0, wins = 0, id = 0, seconds = 0;

let cardsCount = Number(prompt("Com quantas cartas quer jogar? (Números pares entre 4 e 40)"));

while (cardsCount < 4 || cardsCount > 40 || cardsCount % 2 !== 0) {
	cardsCount = prompt("Com quantas cartas quer jogar? (Números pares entre 4 e 14)");
}

function suffleCards() {
	for (let i = 0; i < cardsCount / 2; i++) {
		suffledCards.push(cards[i]);
		suffledCards.push(cards[i]);
	}

	suffledCards.sort(randomCard);
}

function randomCard() {
	return Math.random() - 0.75;
}

suffleCards();

function setTimer() {
	seconds++;
	document.querySelector(".time").innerHTML = seconds;
}

function distributeCards() {
	const distributedCards = document.querySelector(".cards");
	distributedCards.innerHTML = "";

	for (let i = 0; i < cardsCount; i++) {
		distributedCards.innerHTML += `
		<div class="card" onclick="checkCard(this)">
			<div class="face front-face">
				<img src="src/images/front.png">
			</div>
			<div class="face back-face">
				<img class="gif-parrot" src="src/images/${suffledCards[i]}.gif">
			</div>
		</div>
		`;
	}

	id = setInterval(setTimer, 1000);
}

distributeCards();

function checkCard(card) {
	if (card.classList.contains("flipped") === false && card.parentElement.classList.contains("block") === false) {
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
	if (card1.querySelector(".gif-parrot").getAttribute("src") === card2.querySelector(".gif-parrot").getAttribute("src")) {
		wins++;
		setTimeout(checkWinner, 500);
	} else {
		document.querySelector(".cards").classList.add("block");
		setTimeout(turnCard, 1000, card1);
		setTimeout(turnCard, 1000, card2);
	}
}

function turnCard(card) {
	card.classList.toggle("flipped");
	document.querySelector(".cards").classList.remove("block");
}

function checkWinner() {
	if (wins === cardsCount / 2) {
		clearInterval(id);
		alert(`Parabéns, você venceu em ${totalMoves} jogadas! e levou ${seconds} segundos!`);

		let playAgain = confirm(`Você deseja joga novamente?`);		
		if (playAgain) {
			window.location.reload();
		} else {
			alert("Obrigado por jogar!");
		}
	}
}
