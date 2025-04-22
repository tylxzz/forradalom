class Area {
    /**
     * 
     * @param {className} className 
     */
    constructor(className) {
        let container = document.querySelector('.container') // Kiválasztja a container elemet a DOM-ból
        if(!container) {    // Ha a container elem nem található, akkor létrehoz egy újat
            container = document.createElement('div') // Ha nem található, létrehoz egy új div elemet
            container.className = 'container' // Beállítja a className-t a container elemre
            document.body.appendChild(container) // Hozzáadja a body-hoz
        }
        const div = document.createElement('div') // Létrehoz egy új div elemet
        div.className = className // Beállítja a className-t a div elemre
        container.appendChild(div) // Hozzáadja a div elemet a container elemhez
    }
}