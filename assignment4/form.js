
import { renderKort } from "./kort.js";

function scareLevelText(level) {
    const levl = { //lägger till text till skräcknivån
        1: "Mysigt", 
        2: "Lite läskigt", 
        3: "Obehaglig", 
        4: "Skräckinjagande", 
        5: "Ren terror" };
    return levl[level] ?? "Okänd skräcknivå";
}

const prisInput = document.getElementById("maxPris");
const wifiInput = document.getElementById("wifi");
const scareInput = document.getElementById("scareRange");
const ghostInput = document.getElementById("ghost");
const scareValue = document.getElementById("skräck-span");

let scareChanges = false;
function filtrera(data) {
    
    const maxPris = prisInput.value ? Number(prisInput.value) : Infinity;// infinity används för att inte bergänsa de andra filtrena från att inte fylla i priset
    const kräverWifi = wifiInput.checked;
    const valdaSpöken = ghostInput.value;
    const minSkräck = Number(scareInput.value);//number för att kunna jämföra nummer och string 

    //array.filter matchar kritierierna och returnerar en ny array med de som matchar
    return data.filter(hus => {// detta är till för att filterar ut husen som inte matchar inputen 
        if (hus.pricePerNight > maxPris) return false;
        if (kräverWifi && !hus.hasWifi) return false;
        if (valdaSpöken && !hus.ghostTypes.includes(valdaSpöken)) return false;
        if (scareChanges && hus.scareLevel !== minSkräck) return false;

        return true;
    });
}

export function inputs(data) {


    prisInput.addEventListener("input", () => {
        renderKort(filtrera(data));
    });

    wifiInput.addEventListener("change", () => {
        renderKort(filtrera(data));
    });

    ghostInput.addEventListener("change", () => {
        renderKort(filtrera(data));
    });

    scareInput.addEventListener("input", () => {
        scareChanges = true;
        scareValue.textContent = scareLevelText(Number(scareInput.value));
        renderKort(filtrera(data));
    });

    prisInput.value = "";
    wifiInput.checked = false;
    ghostInput.value = "";

    scareValue.textContent = scareLevelText(Number(scareInput.value));
    renderKort(filtrera(data));
}
