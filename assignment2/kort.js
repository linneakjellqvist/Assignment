import {kläder} from "./uppgift2.js";
import {skapaKundvagn} from "./kundvagn.js";


export function skapaKort(){
const section = document.getElementById("kort");
section.classList.add("kort");

for (const plagg of kläder){
const div = document.createElement("div");
div.classList.add("produkt");
div.id = plagg.id;

div.innerHTML = `<img class="bild" src="${plagg.bild}"> <h3>${plagg.namn}</h3> <div class="beskrivning"><p>${plagg.beskrivning}</p> <p>Pris: ${plagg.pris} kr</p> <button class="cart-btn">Lägg i kundvagn</button>
<p>${plagg.kategori.kategori1} | ${plagg.kategori.kategori2}</p></div>`;
section.append(div);

const btn = div.querySelector(".cart-btn");


div.addEventListener("mouseover", function(){
    div.classList.add("active");
});
div.addEventListener("mouseout", function(){
    div.classList.remove("active");
});

btn.addEventListener("click", function(){
    skapaKundvagn(plagg);
    console.log("hej");
});
}
};

