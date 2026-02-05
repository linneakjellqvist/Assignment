import {uppgift} from "./assignment.js";

export function skapaNav(underKatalog){

const objects = document.getElementById("global");

for (const up of uppgift){

const link = document.createElement("li");
link.innerHTML = `<a href="${up.länk}">${up.titel}</a>`;
objects.append(link);

if(underKatalog){
    link.querySelector("a").href = "../" + up.länk;
};
}

//container1.append(title, link, description);
};

 //objects.innerHTML += `<li><a href="${up.länk}">${up.titel}</a></li>`;
 //kort.innerHTML += `<div> <h2>${up.titel}</h2> <p>${up.beskrivning}</p> <p><a href="${up.länk}">${up.titel}</a></p> </div>`;
//}




