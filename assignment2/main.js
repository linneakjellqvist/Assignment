
import {skapaNav} from "../main.js";
import {kläder} from "./uppgift2.js";
console.log(kläder);
console.log(skapaNav);
skapaNav(true);

import {skapaKort} from "./kort.js";
skapaKort();
import {cart} from "./kundvagn.js"
cart();
import {removeCart} from "./kundvagn.js";
removeCart();
//denna är en sammlings plats för alla funktioner som ska köras på sidan, dessa har importerats från andra filer, detta kallas för moduler
