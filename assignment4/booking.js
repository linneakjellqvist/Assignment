
export class Booking {
    constructor(house, formData) {
        
        this.house = house;
        this.date = formData.date;
        this.nights = formData.nights;

        this.valdaExtras = formData.extras;
        this.valdDiscount = formData.discount;
    }

    antalNätter(){
        return this.nights;
    }

     extras(){
        return this.valdaExtras.reduce((sum, extra) => sum + extra.price, 0);
    }

    discount(){
        if (this.valdDiscount === "GHOST20") {
            return this.house.pricePerNight * this.nights * 0.2;
        }
        return 0;
    }

    Total(){
        return this.house.pricePerNight * this.antalNätter() + this.extras() - this.discount();
    }

    validera(){
        const fel = [];

        if (!this.date) {
            fel.push("Du måste välja ett datum.");
        }
        
        if (this.nights < 1) {
            fel.push("Antal nätter måste vara minst 1.");
        }

        if(this.valdDiscount !== "GHOST20") {
            fel.push("Ogiltig kampanjkod.");
        }

        return fel;
    }
    bekräftelse() {
        const merTillägg = this.valdaExtras.length > 0 ? ` med tillägg: ${this.valdaExtras.map(e => e.name).join(", ")}` : "Inga tillägg";

        const avdrag = this.discount() > 0 ? ` Rabatt: ${this.discount()} kr` : "";

        return `<h3>Bokningsbekräftelse</h3>
        <p>Du har bokat ${this.house.name}</p> 
        <p>På datumet: ${this.date}</p>
        <p>I ${this.antalNätter()} nätter</p>
        <p>${merTillägg}</p>
        <p>Totalpris: ${this.Total()} kr${avdrag}</p>
        <p>Tack för din bokning, hoppas du får en skräckfull upplevelse!</p>
        `
    }
}