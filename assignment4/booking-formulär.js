

import { Booking } from "./booking.js";
console.log(Booking);


const errorEl = document.getElementById("error");
const section = document.getElementById("section");
const formDiv = document.getElementById("form");

function scareLevelText(level) {
    const levl = { 1: "Mysigt", 2: "Lite läskigt", 3: "Obehaglig", 4: "Skräckinjagande", 5: "Ren terror" };
    return levl[level] ?? "Okänd skräcknivå";
}

let data;

try {
    const response = await fetch("houses.json");
    data = await response.json();
    console.log(data);
} catch (error) {
    errorEl.textContent = "Ett fel har uppstått: " + error.message;
    errorEl.classList.add("error");
}

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const hus = data?.find(d => d.id === id);

if (!hus) {
    errorEl.innerHTML = "Något gick fel, försök igen senare";
}else {
    skapaKort(hus);
}

function skapaKort(hus) {
    const card = document.createElement("div");
    card.classList.add("card");

    const home = document.createElement("a");
    home.textContent = "Tillbaka till startsidan";
    home.href = "main.html";
    home.classList.add("knapp");


    const img = document.createElement("img");
    img.src = `hus/${hus.image}`;
    img.alt = hus.name;

    const idName = document.createElement("h2");
    idName.textContent = hus.name;

    const plats = document.createElement("p");
    plats.textContent = `Plats: ${hus.location} - ${hus.pricePerNight} kr per natt`;

    const beskrivning = document.createElement("p");
    beskrivning.textContent = hus.description;

    const nivå = document.createElement("p");
    nivå.textContent = `Skräcknivå: ${scareLevelText(hus.scareLevel)}`;

    const sökTyper = document.createElement("p");
    sökTyper.textContent = `Spöken i huset: ${hus.ghostTypes.join(", ")}`;

    const wifi = document.createElement("p");
    if (hus.hasWifi) {
        wifi.textContent = "Huset har wifi";
    } else {
        wifi.textContent = "Huset har inte wifi";
    }



    card.append(img, idName, plats, beskrivning, nivå, sökTyper, wifi, home);
    section.append(card);

    const extras =[
        {id: "tillägg1", name: "Frukost", price: 400},
        {id: "tillägg2", name: "Parkering", price: 200},
        {id: "tillägg3", name: "Spökvandring", price: 600}
    ];

    const väljaDatum = new Date().toISOString().split("T")[0];



     const form = document.createElement("form");
     form.id = "bookingForm";

    form.innerHTML = `  <label for="datum">Vilket datum vill du boka:</label>
            <input type="date" id="datum" name="datum" min="2026-04-01" required>
            <label for="nätter">Hur många nätter vill du stanna?</label>
            <input type="number" id="nätter" name="nätter" min="1" required>
            <fieldset>
                <legend>Tillägg:</legend>
                <label for="tillägg1">Frukost, 400kr</label>
                <input type="checkbox" id="tillägg1" name="tillägg1" value="frukost">
                <label for="tillägg2">Parkering, 200kr</label>
                <input type="checkbox" id="tillägg2" name="tillägg2" value="parkering">
                <label for="tillägg3">Spökvandring, 600kr<span></span></label>
                <input type="checkbox" id="tillägg3" name="tillägg3" value="spökvandring">
            </fieldset>
            <label for="kampanj">Har du en kampanjkod?</label>
            <input type="text" id="kampanj" name="kampanj" placeholder="Ex. GHOST20">           
            <button type="submit" class="knapp">Boka</button>
            <p id="totalPris">Total: 0 kr</p>
            <div id="bokningsBekräftelse"></div>`;

    formDiv.append(form);

    const datumInput = document.getElementById("datum");
    const nätterInput = document.getElementById("nätter");
    const tillägg1Input = form.querySelectorAll('input[type="checkbox"]');
    const kampanjInput = document.getElementById("kampanj");
    const totalPris = document.getElementById("totalPris");

    function getIputs(){
        const valdaExtras = checkboxar
        .filter(c=> c.checked)
        .map(c=> ({ name: c.value, price: Number(c.dataset.price) }));
        
    }



}

skapaKort(rättSida);


