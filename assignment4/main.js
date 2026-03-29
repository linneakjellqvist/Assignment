
import { renderKort  } from "./kort.js";
import { inputs } from "./form.js";

const errorEl = document.getElementById("error");




try{
const response = await fetch("houses.json");
if(!response.ok){//if satsen kollar om svaret från fetchen är ok annars kastas fel meddelandet
    throw new Error("Något gick fel, försök igen senare");
}
const data = await response.json();
console.log(data);
renderKort(data);
inputs(data);
}catch(error){
    errorEl.textContent = "Ett fel har uppstått: " + error.message;
    errorEl.classList.add("error");
}


