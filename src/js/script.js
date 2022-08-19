const cartas = [
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

const cartasContadas = [];
let firstcard = null;
let jogadas = 0;
let jogadasTotais = 0;
let acertos = 0;

let numCartas = prompt("Com quantas cartas quer jogar? (entre 4 e 40, números pares)");

while (numCartas < 4 || numCartas > 40 || numCartas % 2 !== 0) {
	numCartas = prompt("Com quantas cartas quer jogar?");
}

function suffleCards() {
	for (let i = 0; i < numCartas / 2; i++) {
		cartasContadas.push(cartas[i]);
		cartasContadas.push(cartas[i]);
	}

	cartasContadas.sort(randomCard);
}

function randomCard() {
	return Math.random() - 0.5;
}

suffleCards();

function distributeCards() {
	const cards = document.querySelector(".cards");

	for (let i = 0; i < numCartas; i++) {
		cards.innerHTML += `
		<div class="card" onclick="checkCard(this)">
			<div class="face front-face"><img src="src/images/front.png"></div>
			<div class="face back-face"><img src="${cartasContadas[i]}"></div>
		</div>
		`;
	}
}

distributeCards();

function checkCard(card) {
	if (card.querySelector(".front-face").classList.contains("front-click") === false) {
		if (jogadas < 1) {
			turnCard(card);
			jogadas++;
			firstcard = card;
		} else if (jogadas === 1) {
			turnCard(card);
			compareCard(firstcard, card);
			jogadas = 0;
			jogadasTotais++;
		}
	}
}

function compareCard(card1, card2) {
	if (card1.querySelector(".back-face").querySelector("img").getAttribute("src") === card2.querySelector(".back-face").querySelector("img").getAttribute("src")) {
		acertos++;
		setTimeout(checkWinner, 500);
	} else {
		setTimeout(turnCard, 1000, card1);
		setTimeout(turnCard, 1000, card2);
	}
}

function turnCard(card) {
	card.querySelector(".front-face").classList.toggle("front-click");
	card.querySelector(".back-face").classList.toggle("back-click");
}

function checkWinner() {
	if (acertos === numCartas / 2) {
		alert("Parabéns, você venceu em " + jogadasTotais + " jogadas!");
	}
}