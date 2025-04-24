class Revolution {
    /**
     * @type {string}
     */
    #forradalom
    /**
     * @type {number}
     */
    #evszam
    /**
     * @type {boolean}
     */
    #sikeres

    /**
     * @returns {string}
     */
    get forradalom() {
        return this.#forradalom // Visszaadja a forradalom változót
    }

    /**
     * @returns {number}
     */
    get evszam() {
        return this.#evszam // Visszaadja az evszam változót
    }

    /**
     * @returns {boolean}
     */
    get sikeres() {
        return this.#sikeres // Visszaadja a sikeres változót
    }

    /**
     * 
     * @param {string} forradalom 
     * @param {number} evszam 
     * @param {boolean} sikeres 
     */
    constructor(forradalom, evszam, sikeres) { // Ez a konstruktor a Revolution osztályhoz tartozik
        this.#forradalom = forradalom // Beállítja a forradalom változót
        this.#evszam = evszam // Beállítja az evszam változót
        this.#sikeres = sikeres // Beállítja a sikeres változót
    }
}