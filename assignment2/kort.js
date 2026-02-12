import {kläder} from "./uppgift2.js";
import {skapaKundvagn} from "./kundvagn.js";


export function skapaKort(){
    //hämtar id kort från html, lägger till css stil
const section = document.getElementById("kort");
section.classList.add("kort");

for (const plagg of kläder){
const div = document.createElement("div");
div.classList.add("produkt");
//sätter id attribut på div elementet
div.id = plagg.id;

//skapar hmtl kod till diven, detta kommer vara infromationen som dyker upp i korten och är tagen utifrån arrayen, samt skapar en knapp 
div.innerHTML = `<img class="bild" src="${plagg.bild}"> <h3>${plagg.namn}</h3> <div class="beskrivning"><p>${plagg.beskrivning}</p> <p>Pris: ${plagg.pris} kr</p> <button class="cart-btn">Lägg i kundvagn</button>
<p>${plagg.kategori.kategori1} | ${plagg.kategori.kategori2}</p></div>`;
section.append(div);

//hämtar knappen 
const btn = div.querySelector(".cart-btn");

//används för att lägga till css när musen är över en viss produkt, mer specifikt den som aktivt musen är över 
div.addEventListener("mouseover", function(){
    div.classList.add("active");
});
div.addEventListener("mouseout", function(){
    div.classList.remove("active");
});

//läger till produkten som trycks på till kundvagnen 
btn.addEventListener("click", function(){
    //denna funktionen händer när knappen trycks på 
    skapaKundvagn(plagg);
    //bara för att kolla ifall knappen fungera
    console.log("hej");
});
}
};

