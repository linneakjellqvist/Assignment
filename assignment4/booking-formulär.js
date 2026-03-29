

import { Booking } from "./booking.js";
console.log(Booking);


const errorEl = document.getElementById("error");
const section = document.getElementById("section");
const formDiv = document.getElementById("form");


function scareLevelText(level) {
    const levl = { 
        1: "Mysigt", 
        2: "Lite läskigt", 
        3: "Obehaglig", 
        4: "Skräckinjagande", 
        5: "Ren terror" };
    return levl[level] ?? "Okänd skräcknivå";
}

const extraTillägg = { //göra en array med tilläggen och deras priser för att kunna använda i koden 
    frukost: 400,
    parkering: 200,
    spökvandring: 600
}

let data;

try {
    const response = await fetch("houses.json");
    if (!response.ok) {//if satsen kollar om svaret från fetchen är ok annars kastas fel meddelandet
        throw new Error("Något gick fel, försök igen senare");
    }
    data = await response.json();

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    const hus = data.find(d => d.id === id);
    console.log(data);
    if (!hus) {//if satsen kollar ifall det huset som matchar id t finns annars kastas fel meddelandet 
        errorEl.innerHTML = `<p>Detta huset finns inte, förösk igen senare</p><a href="main.html" class="home">Gå tillbaka till startsidan</a>`;
    } else {
        skapaKort(hus);
        karta(hus);
    }
} catch (error) {
    errorEl.textContent = "Ett fel har uppstått: " + error.message;
    errorEl.classList.add("error");
}


function skapaKort(hus) {
    const card = document.createElement("div");
    card.classList.add("card");

    const home = document.createElement("a");
    home.textContent = "< Tillbaka till startsidan";
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



    card.append(home, img, idName, plats, beskrivning, nivå, sökTyper, wifi);
    section.append(card);

    const iadag = new Date().toISOString().split("T")[0];// denna sätter minsta datumet till dagens datum, ISOstring konverterar datumet så att det blir rätt format, split T delar strängen i två delar och tar rätt del genom att sätta indexen till 0



    const form = document.createElement("form");
    form.id = "bookingForm";

    form.innerHTML = `  <label for="datum">Vilket datum vill du boka:</label>
            <input type="date" id="datum" name="datum" min="${iadag}" required>
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
            <button type="submit" class="submit">Boka</button>
            <p id="totalPris">Total: 0 kr</p>
            <div id="bokningsBekräftelse"></div>`;

    formDiv.append(form);


    const datumInput = document.getElementById("datum");
    const nätterInput = document.getElementById("nätter");
    const tillägg1Input = form.querySelectorAll('input[type="checkbox"]');
    const kampanjInput = document.getElementById("kampanj");
    const totalPris = document.getElementById("totalPris");
    const bekräftelseEl = document.getElementById("bokningsBekräftelse");



    function getIputs() {

        const extras = [];// sidan börjar med en tom array som fylls i med checkade tillägg
        for (const tillägg of tillägg1Input) {//loopar igenom alla tillägg och kollar vilka som är checkade
            if (tillägg.checked) {
                extras.push({//ifall tillägget är checkat så pushas det till den tomma arrayen 
                    name: tillägg.value,
                    price: extraTillägg[tillägg.value]
                });
            }
        }
        return {//denna funktion hämatar alla inputs och retunerar dem i ett objekt 
            date: datumInput.value,
            nights: Number(nätterInput.value),
            extras: extras,
            discount: kampanjInput.value

        };
    }

    function uppdateraPris() {

        const booking = new Booking(hus, getIputs());//skapar en ny bokning varje gång en ipnut ändras 
        if (booking.antalNätter() >= 1) {
            totalPris.textContent = `Total: ${booking.Total()} kr`;
        }
    }
    datumInput.addEventListener("change", uppdateraPris);
    nätterInput.addEventListener("input", uppdateraPris);
    kampanjInput.addEventListener("input", uppdateraPris);
    for (const tillägg of tillägg1Input) {
        tillägg.addEventListener("change", uppdateraPris);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const booking = new Booking(hus, getIputs());
        const fel = booking.validera();

        bekräftelseEl.innerHTML = booking.bekräftelse();
    });

}

function karta(hus) {
    const koordinater = [hus.coordinates.lat, hus.coordinates.lng];

    const map = L.map('map').setView(koordinater, 13);

    L.tileLayer('https:{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker(koordinater).addTo(map)
        .bindPopup(hus.name)
        .openPopup();
}


