import {kläder} from "./uppgift2.js";

//skapar en tom array, detta är så att kundvagnen är tom i början 
const vagn = [];

//denna är tillför ifall det finns plagg i kundvagnen så ska det sparas i localstorage och dyka upp ifall sidan laddas om 
if(localStorage.getItem("vagn")){// ifall något är sparat i vagnen ska denna köras 
    const vagnLocal = JSON.parse(localStorage.getItem("vagn"));// denna sparar objekten i arrayen 
    for (const plagg of vagnLocal){
        vagn.push(plagg);// alla plagg i den sparade vagnen 
    }
    cart();//skriver funktionen cart, hur kundvagnen ska fungera och produkterna ska se ut när sidan laddas om  
}
//detta är funktionen som lägger till den tryckta produkten till kundvagnen 
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

// denna lägger till produkterna i kundvagnen, och vilken section produkterna ska dyka upp, samt räknar ut totalen av produkterna, allt detta tas ifrån arreyn från uppgift2 filen
export function cart(){
    const container = document.getElementById("kundvagn");
    container.innerHTML = "";
    //total börjar på 0 
    let total = 0;
    const totalEl = document.getElementById("total");

    for (const Kundvagn of vagn){
        //räknar ihop tillagda priserna och lägger det i total 
        total += Kundvagn.pris * Kundvagn.count;
        //skapar paragraf i kundvagnen
        const p = document.createElement("p");
        // i paragrafen ska det finnas den valda produktens namn pris och antal, som jag döpt till count
        p.textContent = `${Kundvagn.namn} (${Kundvagn.count}st) - ${Kundvagn.pris} kr`;
        //här lägger jag till p i containern 
        container.append(p);
       
    }
    totalEl.innerHTML = `Total: ${total} kr`;
}

//denna funktion ska tabort alla produkter från kundvagnen 
export function removeCart(){
    const container = document.getElementById("remove");
    container.innerHTML = "";
    //skapar en knapp för att kunna tabort produkterna 
    const btn = document.createElement("button");
    btn.textContent = "Töm kundvagn";//den ska heta töm kundvagn
    container.append(btn);

//skapar en knapp funktion till när knappen trycks på 
    btn.addEventListener("click", () => {
        //denna tömmer arrayen 
        vagn.length = 0;
        //denna hämtar cart funktionen, total= 0, innerHtml= "" osv 
        cart();
        // denna tabort den sparade datan, ifall man skulle trycka på tabort knappen och ladda om sidan dyker inte det gamla borttagna produkterna upp 
        localStorage.removeItem("vagn");
    });
}
removeCart();
//vad som ska sparas och det ska sparas i vagnen, stringify används för att spara i en array
function sparaLocal(){
    localStorage.setItem("vagn", JSON.stringify(vagn));
};