import {uppgift} from "./assignment.js";



export function skapaKort(){
for (const up of uppgift){
    
const section = document.getElementById("kort");
const div = document.createElement("div");
div.classList.add("card");
    const title = document.createElement("h4");
    title.textContent = up.titel;

    const description = document.createElement("p");
    description.textContent = up.beskrivning;

    const link = document.createElement("a");
    link.href = up.länk;
    link.textContent = "Länk till uppgiften";

    section.append(div);
    div.append(title, description, link);

}
};
