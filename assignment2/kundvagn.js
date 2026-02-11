import {kläder} from "./uppgift2.js";


const vagn = [];

if(localStorage.getItem("vagn")){
    const vagnLocal = JSON.parse(localStorage.getItem("vagn"));
    for (const plagg of vagnLocal){
        vagn.push(plagg);
    }
    cart();
}
export function skapaKundvagn(plagg){

    const valdProdukt = vagn.find(k => k.id === plagg.id);

    if(valdProdukt){
        valdProdukt.count++;
    }else {
        plagg.count = 1;
        vagn.push(plagg);
    }
    cart();
    sparaLocal();
    
};


function cart(){
    const container = document.getElementById("kundvagn");
    container.innerHTML = "";
    let total = 0;
    const totalEl = document.getElementById("total");

    for (const Kundvagn of vagn){
        total += Kundvagn.pris * Kundvagn.count;

        const p = document.createElement("p");
        p.textContent = `${Kundvagn.namn} (${Kundvagn.count}st) - ${Kundvagn.pris} kr`;
        container.append(p);
       
    }
    totalEl.innerHTML = `Total: ${total} kr`;
}

function removeCart(){
    const container = document.getElementById("remove");
    container.innerHTML = "";
    const btn = document.createElement("button");
    btn.textContent = "Töm kundvagn";
    container.append(btn);

    btn.addEventListener("click", () => {
        vagn.length = 0;
        cart();
        localStorage.removeItem("vagn");
    });
}
removeCart();

function sparaLocal(){
    localStorage.setItem("vagn", JSON.stringify(vagn));
};