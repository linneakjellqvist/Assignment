
export class Match {
    #player1
    #player2
    #vinnare
    #element
    constructor(player1, player2) {
        this.#player1 = player1;
        this.#player2 = player2;
        this.#vinnare = null;
        this.#element = null;
    }
    //player(){
    //return `${this.name} "${this.catchphrase}"`;
    //}
    get player1() {
        return this.#player1;
    }
    get player2() {
        return this.#player2;
    }
    get vinnare() {
        return this.#vinnare;
    }
    //kollar ifall vinnaren är null annars är spelet false 
    get isplayed() {
        return this.#vinnare !== null;
    }
    render() {

        this.#element = document.createElement("div");
        this.#element.classList.add("match")

        this.player1Kort = Match.skapaKort(this.#player1);
        this.player2Kort = Match.skapaKort(this.#player2)

        const vs = document.createElement("p");
        vs.textContent = "VS";
        vs.classList.add("vs")

        this.#element.append(this.player1Kort, vs, this.player2Kort);
        return this.#element;
    }
    //kollar ifall matchen är spelad

    getElement() {
        return this.#element;
    }

    compete() {

        if (this.isplayed) return;

        const skillA = this.player1.skillLevel;
        const skillB = this.player2.skillLevel;
        const chanceA = skillA / (skillA + skillB);

        const random = Math.random();

        this.#vinnare = random < chanceA ? this.player1 : this.player2;

        if (this.#vinnare === this.#player1) {
            this.player1Kort.classList.add("vinnare");
        } else {
            this.player2Kort.classList.add("vinnare");
        }


    }
    static skapaKort(player) {

        const kort = document.createElement("div");
        kort.classList.add("spel")

        const name = document.createElement("h3");
        name.textContent = player.name ?? `"Inget namn finns"`;

        const skill = document.createElement("p");
        skill.textContent = `Skill level: ${player.skillLevel}` ?? `"Ingen skill level"`;

        const phrase = document.createElement("p");
        phrase.textContent = '"' + (player.catchphrase ?? 'Inget slagord..') + '"';

        kort.append(name, skill, phrase);
        return kort;
    };
}



