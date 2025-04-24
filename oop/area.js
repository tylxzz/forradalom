class Area {
    /**
     * @type {HTMLDivElement}
     */
    #div // Ez egy privát változó, ami a div elemet tárolja

    /**
     * @type {HTMLDivElement}
     */
    get div() { // Ez egy getter, ami visszaadja a #div változót
        return this.#div // Visszaadja a #div változót
    }
    
    /**
     * 
     * @param {className} className 
     */
    constructor(className) {
        let container = document.querySelector('.containeroop') // Kiválasztja a containeroop elemet a DOM-ból
        if(!container) {    // Ha a container elem nem található, akkor létrehoz egy újat
            container = document.createElement('div') // Ha nem található, létrehoz egy új div elemet
            container.className = 'containeroop' // Beállítja a className-t a containeroop elemre
            document.body.appendChild(container) // Hozzáadja a body-hoz
        }
        this.#div = document.createElement('div') // Létrehoz egy új div elemet
        this.#div.className = className // Beállítja a className-t a div elemre
        container.appendChild(this.#div) // Hozzáadja a div elemet a container elemhez
    }
}

class Table extends Area {
    /**
     * 
     * @param {cssClass} cssClass 
     */
    constructor(cssClass) { // Ez a konstruktor a Table osztályhoz tartozik, ami az Area osztályból származik
        super(cssClass) // Meghívja a szülő osztály konstruktorát
        const table = document.createElement('table') // Létrehoz egy új table elemet
        this.div.appendChild(table) // Hozzáadja a table elemet a div elemhez
        const thead = document.createElement('thead') // Létrehoz egy új thead elemet
        table.appendChild(thead) // Hozzáadja a thead elemet a table elemhez
        const tr = document.createElement('tr') // Létrehoz egy új tr elemet
        thead.appendChild(tr) // Hozzáadja a tr elemet a thead elemhez
        const theadCells = ['forradalom', 'evszam', 'sikeres'] // Létrehoz egy tömböt a thead cellák nevével
        for(const content of theadCells) { // Végigiterál a thead cellák tömbjén
            const cell = document.createElement('th') // Létrehoz egy új th elemet
            cell.innerText = content // Beállítja a cella szövegét a content változóra
            tr.appendChild(cell) // Hozzáadja a cellát a tr elemhez
        }
        const tbody = document.createElement('tbody') // Létrehoz egy új tbody elemet
        table.appendChild(tbody) // Hozzáadja a tbody elemet a table elemhez
    }
}

class Form extends Area {
    /**
     * 
     * @param {cssClass} cssClass 
     */
    constructor(cssClass) { // Ez a konstruktor a Form osztályhoz tartozik, ami az Area osztályból származik
        super(cssClass) // Meghívja a szülő osztály konstruktorát
        const form = document.createElement('form') // Létrehoz egy új form elemet
        this.div.appendChild(form) // Hozzáadja a form elemet a div elemhez
        const elements = [{ // Létrehoz egy tömböt az űrlap elemeivel
            id: 'forradalom',   // Létrehoz egy új id elemet
            label: 'forradalom',    // Létrehoz egy új label elemet
        },
        {
            id: 'evszam',   // Létrehoz egy új id elemet
            label: 'evszam',    // Létrehoz egy új label elemet
        }, 
        {
            id: 'sikeres',  // Létrehoz egy új id elemet
            label: 'sikeres',   // Létrehoz egy új label elemet
        }]  // Létrehoz egy tömböt az űrlap elemeivel

        for(const element of elements) // Végigiterál az űrlap elemeinek tömbjén
        {
            const field = createDiv('field') // Létrehoz egy új div elemet a 'field' className-nel
            form.appendChild(field) // Hozzáadja a field elemet a form elemhez
            const label = document.createElement('label') // Létrehoz egy új label elemet
            label.htmlFor = element.id // Beállítja a label htmlFor attribútumát az element.id változóra
            label.textContent = element.label // Beállítja a label szövegét az element.label változóra
            field.appendChild(label) // Hozzáadja a label elemet a field elemhez
            const input = document.createElement('input') // Létrehoz egy új input elemet
            input.id = element.id // Beállítja az input id attribútumát az element.id változóra
            field.appendChild(document.createElement('br')) // Hozzáad egy új br elemet a field elemhez
            field.appendChild(input) // Hozzáadja az input elemet a field elemhez
        }

        const button = document.createElement('button') // Létrehoz egy új button elemet
        button.textContent = 'Hozzáadás' // Beállítja a button szövegét
        form.appendChild(button) // Hozzáadja a button elemet a form elemhez
    }
}