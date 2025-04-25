/** 
 * @callback addRevolutionCallback
 * @param {Revolution} revolution
 * @returns {void}
 */
class Manager {
    /**
     * @type {Revolution[]} array
     */
    #array 
    /**
     * @type {addRevolutionCallback} addRevolutionCallback
     */
    #addRevolutionCallback

    constructor() { // Ez a konstruktor a Manager osztályhoz tartozik
        this.#array = [] // Létrehoz egy üres tömböt
    }

    /**
     * 
     * @param {addRevolutionCallback} callback 
     */
    setAddRevolutionCallback(callback) { // Ez a setter beállítja a #addRevolutionCallback változót
        this.#addRevolutionCallback = callback // Beállítja a #addRevolutionCallback változót
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
     * @param {(revolution: Revolution) => boolean} callback
     * @returns {number} count
     */
    countByCondition(callback) {
        let count = 0 // Inicializálja a találatok számát
        for (const revolution of this.#array) { // Végigmegy a forradalmak tömbjén
            if (callback(revolution)) { // Ha a callback igazat ad vissza
                count++ // Növeli a találatok számát
            }
        }
        return count // Visszaadja a találatok számát
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