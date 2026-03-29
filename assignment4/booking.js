
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
}