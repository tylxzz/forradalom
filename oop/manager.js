/** 
 * @callback RevolutionCallback
 * @param {Revolution[]} revolutions
 * @returns {void}
 */
class Manager {
    /**
     * @type {Revolution[]} array
     */
    #array 
    /**
     * @type {RevolutionCallback}
     */
    #addRevolutionCallback
    /**
     * @type {RevolutionCallback} renderTableCallback
     */
    #renderTableCallback // Ez a változó a táblázat renderelésére szolgál

    constructor() { // Ez a konstruktor a Manager osztályhoz tartozik
        this.#array = [] // Létrehoz egy üres tömböt
    }

    /**
     * 
     * @param {RevolutionCallback} callback 
     */
    setAddRevolutionCallback(callback) { // Ez a setter beállítja a #addRevolutionCallback változót
        this.#addRevolutionCallback = callback // Beállítja a #addRevolutionCallback változót
    }

    /**
     * 
     * @param {RevolutionCallback} callback 
     */
    setRenderTableCallback(callback) { // Ez a setter beállítja a #renderTableCallback változót
        this.#renderTableCallback = callback // Beállítja a #renderTableCallback változót
    }

    /**
     * 
     * @param {Revolution} revolution 
     */
    AddRevolution(revolution) {  // Ez a setter beállítja a #addRevolution változót
        this.#array.push(revolution) // Hozzáadja a forradalmat a tömbhöz
        this.#addRevolutionCallback(revolution) // Meghívja a #addRevolutionCallback változót, és átadja neki a tömböt
    }

    /**
     * 
     * @returns {Revolution[]} revolution
     */
    getRevolutions() { // Visszaadja a forradalmak tömbjét
        return this.#array
    }

    /**
     * 
     * @returns {string} revolution
     */
    generateExportString(){
        const result = ['forradalom,evszam,sikeres'] // Létrehoz egy új tömböt a fejlécnek
        for (const revolution of this.#array) { // Végigmegy a tömbön
            result.push(`${revolution.forradalom},${revolution.evszam},${revolution.sikeres}`) // Hozzáadja a forradalmat, az évet és a sikert a tömbhöz
        }
        return result.join('\n') // Visszaadja a tömböt egy stringként, új sorral elválasztva
    }
}