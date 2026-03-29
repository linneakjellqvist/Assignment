const container = document.getElementById("hus");
const tomSida = document.getElementById("tomm-sida");

function scareLevelText(level) {
    const levl = {
        1: "Mysigt", 
        2: "Lite läskigt", 
        3: "Obehaglig", 
        4: "Skräckinjagande", 
        5: "Ren terror"};
    return levl[level] ?? "Okänd skräcknivå";
}



export function renderKort(data) {
    container.innerHTML = "";
    tomSida.textContent = "";

    if (data.length === 0) {
        tomSida.textContent = "Inga hus har dem filtren du valt, försök igen med andra filter!";
        return;
    }

    for (const hus of data) {

        const kort = document.createElement("div");
        kort.classList.add("kort");

        const img = document.createElement("img");
        img.src = `hus/${hus.image}`;
        img.alt = hus.name;

        const name = document.createElement("h3");
        name.textContent = hus.name;

        const plats = document.createElement("p");
        plats.textContent = `Plats: ${hus.location} - ${hus.pricePerNight} kr per natt`;

        const nivå = document.createElement("p");
        nivå.textContent = `Skräcknivå: ${scareLevelText(hus.scareLevel)}`;

        const btnDiv = document.createElement("div");
        btnDiv.classList.add("divBtn");

        const btn = document.createElement("a");
        btn.textContent = "Läs mer och boka";
        btn.href = `house.html?id=${hus.id}`;
        btn.classList.add("knapp");
        btnDiv.append(btn);

        kort.append(img, name, plats, nivå, btnDiv);
        container.append(kort);
    }
}