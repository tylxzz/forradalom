class Area {
    /**
     * @type {HTMLDivElement}
     */
    #div // Ez egy privát változó, ami a div elemet tárolja

    /**
     * @type {Manager}
     */
    #manager // Ez egy privát változó, ami a manager elemet tárolja

    /**
     * @type {HTMLDivElement}
     */
    get div() { // Ez egy getter, ami visszaadja a #div változót
        return this.#div // Visszaadja a #div változót
    }

    /**
     * @returns {Manager}
     */
    get manager() { // Ez egy getter, ami visszaadja a #manager változót
        return this.#manager // Visszaadja a #manager változót
    }
    
    /**
     * 
     * @param {className} className 
     * @param {Manager} manager
     */
    constructor(className, manager) {
        this.#manager = manager // Beállítja a #manager változót
        const container = this.#getContainerDiv() // Meghívja a #getContainerDiv metódust, ami visszaadja a container elemet
        this.#div = document.createElement('div') // Létrehoz egy új div elemet
        this.#div.className = className // Beállítja a className-t a div elemre
        container.appendChild(this.#div) // Hozzáadja a div elemet a container elemhez
    }

    /**
     * @returns {HTMLDivElement}
     */
    #getContainerDiv() { // Ez egy privát metódus, ami visszaadja a container elemet
        let container = document.querySelector('.containeroop') // Kiválasztja a containeroop elemet a DOM-ból
        if(!container) {    // Ha a container elem nem található, akkor létrehoz egy újat
            container = document.createElement('div') // Ha nem található, létrehoz egy új div elemet
            container.className = 'containeroop' // Beállítja a className-t a containeroop elemre
            document.body.appendChild(container) // Hozzáadja a body-hoz
        }
        return container // Visszaadja a container elemet
    }
}

class Table extends Area {
    /**
     * 
     * @param {cssClass} cssClass 
     * @param {Manager} manager
     */
    constructor(cssClass, manager) { // Ez a konstruktor a Table osztályhoz tartozik, ami az Area osztályból származik
        super(cssClass, manager) // Meghívja a szülő osztály konstruktorát
        const tbody = this.#createTable() // Meghívja a #createTable metódust, ami létrehoz egy új táblázatot
        this.manager.setAddRevolutionCallback((revolution) => { // Beállítja a #addRevolutionCallback változót
            this.#createRevolutionRow(revolution, tbody) // Meghívja a #createRevolutionRow metódust, ami létrehoz egy új forradalom sort
        })
    }

    /**
     * 
     * @param {Revolution} revolution 
     * @param {HTMLTableSectionElement} tbody 
     */
    #createRevolutionRow(revolution, tbody) { // Ez egy privát metódus, ami létrehoz egy új forradalom sort
        const tr = document.createElement('tr') // Létrehoz egy új tr elemet
            tbody.appendChild(tr) // Hozzáadja a tr elemet a tbody elemhez

            const forradalomCell = document.createElement('td') // Létrehoz egy új td elemet
            forradalomCell.innerText = revolution.forradalom // Beállítja a td szövegét a forradalom változóra
            tr.appendChild(forradalomCell) // Hozzáadja a td elemet a tr elemhez
            
            const evszamCell = document.createElement('td') // Létrehoz egy új td elemet
            evszamCell.innerText = revolution.evszam // Beállítja a td szövegét az evszam változóra
            tr.appendChild(evszamCell) // Hozzáadja a td elemet a tr elemhez

            const sikeresCell = document.createElement('td') // Létrehoz egy új td elemet
            sikeresCell.innerText = revolution.sikeres ? 'igen' : 'nem' // Beállítja a td szövegét a sikeres változóra
            tr.appendChild(sikeresCell) // Hozzáadja a td elemet a tr elemhez
    }

    /**
     * 
     * @returns {HTMLTableSectionElement}
     */
    #createTable() {    // Ez egy privát metódus, ami létrehoz egy új táblázatot
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
        return tbody // Visszaadja a tbody elemet
    }
}

class Form extends Area {
    /**
     * @type {FormField[]}
     */
    #formFieldArray // Ez egy privát változó, ami a form elemek tömbjét tárolja
    
    /**
     * 
     * @param {cssClass} cssClass 
     * @param {{ id: string, label: string }[]} elements
     * @param {Manager} manager
     */
    constructor(cssClass, elements, manager) { // Ez a konstruktor a Form osztályhoz tartozik, ami az Area osztályból származik
        super(cssClass, manager) // Meghívja a szülő osztály konstruktorát
        this.#formFieldArray = [] // Inicializálja a formFieldArray tömböt
        const form = document.createElement('form') // Létrehoz egy új form elemet
        this.div.appendChild(form) // Hozzáadja a form elemet a div elemhez
        for(const element of elements) // Végigiterál az űrlap elemeinek tömbjén
        {
            const formField = new FormField(element.id, element.label) // Létrehoz egy új FormField elemet
            this.#formFieldArray.push(formField) // Hozzáadja a formField elemet a formFieldArray tömbhöz
            form.appendChild(formField.getDiv()) // Hozzáadja a formField elemet a form elemhez
        }

        const button = document.createElement('button') // Létrehoz egy új button elemet
        button.textContent = 'Hozzáadás' // Beállítja a button szövegét
        form.appendChild(button) // Hozzáadja a button elemet a form elemhez
        form.addEventListener('submit', (e) => { // Hozzáad egy eseményfigyelőt a form elemhez
            e.preventDefault() // Megakadályozza az alapértelmezett űrlap elküldést
            const object = {} // Létrehoz egy új objektumot
            let valid = true // Inicializálja a valid változót
            for(const formField of this.#formFieldArray) { // Végigiterál a formFieldArray tömbön
                formField.error = '' // Beállítja a formField error változóját üresre
                if(formField.value === '') { // Ha a formField értéke üres
                    formField.error = 'Kötelező mező!' // Beállítja a formField error változóját
                    valid = false // Beállítja a valid változót hamisra
                }
                if(formField.id === 'sikeres') { // Ha az elem id-ja 'sikeres'
                    object[formField.id] = formField.value // Beállítja az objektum értékét a field.value változóra
                } else {
                    object[formField.id] = formField.value // Beállítja az objektum értékét a field.value változóra
                }
            }
            if(valid) { // Ha a valid változó igaz
                const revolution = new Revolution(object.forradalom, object.evszam, object.sikeres) // Létrehoz egy új Revolution objektumot
                this.manager.AddRevolution(revolution) // Hozzáadja a forradalmat a manager-hez
            }
        })
    }
}

class UploadDownload extends Area {
    /**
     * 
     * @param {cssClass} cssClass 
     * @param {Manager} manager 
     */
    constructor(cssClass, manager) { // Ez a konstruktor az Upload osztályhoz tartozik, ami az Area osztályból származik
        super(cssClass, manager) // Meghívja a szülő osztály konstruktorát
        const input = document.createElement('input') // Létrehoz egy új input elemet
        input.id = 'fileinput' // Beállítja az input típusát fájlra
        input.type = 'file'  // Beállítja a fileInput típusát 'file'-ra
        this.div.appendChild(input) // Hozzáadja a fileInput elemet a div elemhez
        input.addEventListener('change', (e) => {  // Hozzáad egy eseményfigyelőt a fileInput-hoz 
            const file = e.target.files[0]  // Lekéri az első fájlt
            const reader = new FileReader()  // Létrehoz egy új FileReader objektumot
            reader.onload = () => {  // Hozzáad egy eseményfigyelőt a FileReader-hez
                const lines = reader.result.split('\n')  // Felosztja a fájl tartalmát sorokra
                const remove = lines.slice(1) // Eltávolítja az első sort (fejléc)
                for(const line of remove) {  // Végigiterál a sorokon
                    const trimmed = line.trim()  // Levágja a sor elejéről és végéről a szóközöket
                    const fields = trimmed.split(';')  // Felosztja a sort mezőkre
                    const revolution = new Revolution(fields[0], fields[1], fields[2])  // Létrehoz egy új Revolution objektumot
                    this.manager.AddRevolution(revolution)  // Hozzáadja a forradalmat a manager-hez
                }
            }
            reader.readAsText(file)  // Beolvassa a fájlt szövegként
        })

        const download = document.createElement('button')  // Létrehoz egy új button elemet
        download.textContent = 'Letöltés'  // Beállítja a button szövegét
        this.div.appendChild(download)  // Hozzáadja a button elemet a div elemhez
        download.addEventListener('click', () => {  // Hozzáad egy eseményfigyelőt a button-hoz
            const link = document.createElement('a')  // Létrehoz egy új a elemet
            const content = this.manager.generateExportString()  // Meghívja a generateExportString metódust, ami visszaadja a fájl tartalmát
            const file = new Blob([content])  // Létrehoz egy új Blob objektumot a fájl tartalmával
            link.href = URL.createObjectURL(file)  // Beállítja a link href attribútumát a Blob objektumra
            link.download = 'newdata.csv'  // Beállítja a link letöltési nevét
            link.click()  // Kattint a linkre, hogy letöltse a fájlt
            URL.revokeObjectURL(link.href)  // Visszavonja a Blob objektum URL-jét
        })
    }
}

class FormField {
    /**
     * @type {string}
     */
    #id // Ez egy privát változó, ami az id-t tárolja
    /**
     * @type {HTMLInputElement}
     */
    #input // Ez egy privát változó, ami a input-t tárolja
    /**
     * @type {HTMLLabelElement}
     */
    #label // Ez egy privát változó, ami a label-t tárolja
    /**
     * @type {HTMLSelectElement}
     */
    #select // Ez egy privát változó, ami a select-t tárolja
    /**
     * @type {HTMLSpanElement}
     */
    #error // Ez egy privát változó, ami a error-t tárolja

    /**
     * @returns {string}
     */
    get id() { // Ez egy getter, ami visszaadja a #id változót
        return this.#id // Visszaadja a #id változót
    }

    /**
     * @returns {string} value
     */
    get value() { // Ez egy getter, ami visszaadja a #input.value változót
        return this.#input.value // Visszaadja a #input.value változót
    }

    /**
     * @param {string} value
     */
    set error(value) { // Ez egy setter, ami beállítja a #error változót
        this.#error.textContent = value // Beállítja a #error szövegét a value változóra
    }

    /**
     * 
     * @param {string} id 
     * @param {string} content 
     */
    constructor(id, content) { // Ez a konstruktor a FormField osztályhoz tartozik 
        this.#id = id // Beállítja a #id változót
        this.#label = document.createElement('label') // Létrehoz egy új label elemet
        this.#label.htmlFor = id // Beállítja a label htmlFor attribútumát az id változóra
        this.#label.textContent = content // Beállítja a label szövegét a content változóra
        this.#error = document.createElement('span') // Létrehoz egy új span elemet
        this.#error.className = 'error' // Beállítja a span className-jét az error változóra

        if (id === 'sikeres') { // Ha az id 'sikeres'
            this.#input = document.createElement('select') // Létrehoz egy új select elemet
            this.#input.id = id // Beállítja a select id attribútumát az id változóra

            const optionYes = document.createElement('option') // Létrehoz egy új option elemet
            optionYes.value = 'igen' // Beállítja az option értékét
            optionYes.textContent = 'Igen' // Beállítja az option szövegét
            this.#input.appendChild(optionYes) // Hozzáadja az option elemet a select-hez

            const optionNo = document.createElement('option') // Létrehoz egy új option elemet
            optionNo.value = 'nem' // Beállítja az option értékét
            optionNo.textContent = 'Nem' // Beállítja az option szövegét
            this.#input.appendChild(optionNo) // Hozzáadja az option elemet a select-hez
        } else {
            this.#input = document.createElement('input') // Létrehoz egy új input elemet
            this.#input.id = id // Beállítja az input id attribútumát az id változóra
        }
    }

    /**
     * @returns {HTMLDivElement} div
     */
    getDiv() { // Ez egy getter, ami visszaadja a #div változót
        const div = createDiv('field') // Létrehoz egy új div elemet
        const br1 = document.createElement('br') // Létrehoz egy új br elemet
        const br2 = document.createElement('br') // Létrehoz egy új br elemet
        const htmlElements = [this.#label, br1, this.#input, br2, this.#error] // Létrehoz egy tömböt a html elemekkel
        for(const element of htmlElements) { // Végigiterál a html elemek tömbjén
            div.appendChild(element) // Hozzáadja az elemet a div elemhez
        }
        return div // Visszaadja a div elemet
    }
}