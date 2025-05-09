const containerCartellone = document.getElementById("container-cartellone");
const currentNumber = document.getElementById("current-number");
const formaggio = document.getElementById("form");
const numeroCartelle = document.getElementById("numero-cartelle");
const containerCartelle = document.getElementById("container-cartelle");
const win = document.getElementById("win");
const sort = document.getElementById("sort")
const buy = document.getElementById("buy");

let cartellone;
let sortedNumber = 0;
let allSortedNumbers = [];
let allNumbers = [];
let cartelle = [];
let cartella = [];
let conteggio = [];

window.addEventListener("load", init());

function init() {
    bingo();
}

function bingo() {
    for (let i = 1; i <= 90; i++) {
        allNumbers.push(i);
        const numberContainer = document.createElement("div");
        const numero = document.createElement("p");
        numero.innerText = i;
        numberContainer.appendChild(numero);
        containerCartellone.appendChild(numberContainer);
    }
}

sort.addEventListener("click", function () {
    if (cartelle.length > 0) {
        createBoard(allSortedNumbers);
        currentNumber.innerText = "Ultimo numero uscito: " + sortedNumber;
        cartellone[sortedNumber - 1].style.backgroundColor = "red";
        for (let i = 0; i < cartelle.length; i++)
            if (cartelle[i].includes(sortedNumber)) {
                containerCartelle.children[i].children[cartelle[i].indexOf(sortedNumber)].style.backgroundColor = "red";
                containerCartelle.children[i].children[cartelle[i].indexOf(sortedNumber)].classList.add("checked");
                checkWinner();
                formaggio.reset();
            }
    } else
        alert("Devi acquistare almeno una cartella per poter giocare!")
});

buy.addEventListener("click", function (e) {
    e.preventDefault();
    const n = numeroCartelle.value;
    for (let i = 0; i < n; i++) {
        cartella = [];
        for (let j = 0; j < 15; j++)
            createBoard(cartella);
        cartelle.push(cartella);
    }
    printBoards();
    buy.style.display = "none";
    buy.setAttribute("disabled", "true");
});

function createBoard(arr) {
    sortedNumber = Math.floor((Math.random() * 90) + 1);
    let flag = false;
    while (!flag) {
        if (!arr.includes(sortedNumber)) {
            arr.push(sortedNumber);
            flag = true;
        } else {
            sortedNumber = Math.floor((Math.random() * 90) + 1);
        }
    }
}

function printBoards() {
    for (let i = 0; i < cartelle.length; i++) {
        const card = document.createElement("div");
        for (let j = 0; j < cartelle[0].length; j++) {
            const cardContent = document.createElement("div");
            const contentNumber = document.createElement("p");
            contentNumber.innerText = cartelle[i][j];
            cardContent.appendChild(contentNumber);
            card.appendChild(cardContent);
        }
        containerCartelle.appendChild(card);
    }
    cartellone = document.querySelectorAll("#container-cartellone div");
}

function checkWinner() {
    for (let i = 0; i < cartelle.length; i++) {
        let x = 0;
        for (let j = 0; j < cartelle[i].length; j++)
            if (containerCartelle.children[i].children[j].classList.contains("checked"))
                x++;
        if (x == 15) {
            win.innerText = "Ha vinto la cartella numero: " + (i + 1);
            sort.setAttribute("disabled", "true");
        }
    }
}