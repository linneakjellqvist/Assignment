import { skapaNav } from "../main.js";

//Hämtar json objekten 
import { Match } from "./match.js";

skapaNav(true);
let spelaMatch = [];
let vinnare = [];

async function game() {
    const spelplan = document.querySelector(".spelplanen");
    const round = document.createElement("div");
    round.classList.add("round");
    const response = await fetch("contestants.json");
    const players = await response.json();
    for (let i = 0; i < players.length; i += 2) {

        const player1 = players[i];

        const player2 = players[i + 1];


        const match = new Match(player1, player2);
        const element = match.render();
        round.appendChild(element);
        spelaMatch.push(match);

        //main.append(match.skapaKort());

    }
    spelplan.append(round);

}
game();


const final = document.createElement("div");

const section = document.getElementById("buttons");
const btn1 = document.createElement("button");
btn1.textContent = "starta kvartsfinal"; //${final}
const btn2 = document.createElement("button");
btn2.textContent = "Starta om spel";

section.append(btn1, btn2);

btn1.addEventListener("click", () => {
    for (const match of spelaMatch) {
        match.compete();
    }
    const vinnareLista = spelaMatch.map(match => match.vinnare);
    if (vinnareLista.length === 1) {
        btn1.hidden = true;
        return;
    }
    const round = document.createElement("div");
    round.classList.add("round");
    const spelplan = document.querySelector(".spelplanen")
    spelplan.append(round);

    if (spelaMatch.length === 4) {
        btn1.textContent = "Starta semifinal";
    }
    if (spelaMatch.length === 2) {
        btn1.textContent = "Starta Final";
    }


    const nyaMatcher = [];
    for (let i = 0; i < vinnareLista.length; i += 2) {
        if (!vinnareLista[i + 1]) break;
        const match = new Match(vinnareLista[i], vinnareLista[i + 1]);
        const element = match.render();


        round.appendChild(element);
        nyaMatcher.push(match);
    }
    spelaMatch = nyaMatcher;
});

btn2.addEventListener("click", () => {
    const spelplan = document.querySelector(".spelplanen");

    spelplan.innerHTML = "";
    spelaMatch = [];
    btn1.hidden = false;
    btn1.textContent = "Starta kvartsfinal";
    game();



})

console.log(btn1);












