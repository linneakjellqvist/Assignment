
import { renderKort } from "./kort.js";

const prisInput = document.getElementById("maxPris");
const wifiInput = document.getElementById("wifi");
const scareInput = document.getElementById("scareRange");
const ghostInput = document.getElementById("ghost");
const scareValue = document.getElementById("skräck-span");


function filtrera(data) {
    const maxPris = Number(prisInput.value);
    const kräverWifi = wifiInput.checked;
    const valdaSpöken = ghostInput.value;
    const minSkräck = Number(scareInput.value);

    return data.filter(hus => {
        if(hus.pricePerNight > maxPris) return false;
        if(kräverWifi && !hus.hasWifi) return false;
        if(valdaSpöken && !hus.ghostTypes.includes(valdaSpöken)) return false;
        if(hus.scareLevel < minSkräck) return false;
        
        return true;
    });
}

export function inputs(data) {
    scareValue.textContent = scareInput.value;
 
    prisInput.addEventListener("input", () => {
        renderKort(filtrera(data));
    });

    wifiInput.addEventListener("change", () => {
        renderKort(filtrera(data));
    })

    ghostInput.addEventListener("change", () => {
        renderKort(filtrera(data));
    })
   
   
   
    scareInput.addEventListener("input", () => {
        renderKort(filtrera(data));
        scareValue.textContent = scareInput.value;
    })
}