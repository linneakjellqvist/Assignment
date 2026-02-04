import {uppgift} from "../assignment.js";

import {skapaNav} from "../main.js";
console.log(skapaNav);
skapaNav();



const uppgifter = uppgift.find (up => up.id === "assignment1");
const info = document.getElementById("uppgift");

const h1 = document.createElement("h1");
h1.textContent = uppgifter.titel; 

const p = document.createElement("p");
p.textContent = uppgifter.beskrivning;

const link = document.createElement("a");
link.href = "../index.html";
link.textContent = "Tillbaka till startsidan";

info.append(h1, p, link);
console.log(h1, p, link);