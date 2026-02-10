import {uppgift} from "./assignment.js";


export function skapaNav(underKatalog){

const objects = document.getElementById("global");
const currentPage = window.location.pathname;

for (const up of uppgift){
const link = document.createElement("li");
const a = document.createElement("a");
const homepage = document.getElementById("homepage");

link.innerHTML = `<a href="${up.länk}">${up.titel}</a>`;
a.href = up.länk;
objects.append(link);


if(underKatalog){
    link.querySelector("a").href = "../" + up.länk;
};

if(currentPage.endsWith(up.länk)){
    link.querySelector("a").classList.add("active");
};

//container1.append(title, link, description);
};
}

 //objects.innerHTML += `<li><a href="${up.länk}">${up.titel}</a></li>`;
 //kort.innerHTML += `<div> <h2>${up.titel}</h2> <p>${up.beskrivning}</p> <p><a href="${up.länk}">${up.titel}</a></p> </div>`;
//}




