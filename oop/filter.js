class Filter extends Area {
    /**
     * 
     * @param {cssClass} cssClass 
     * @param {Manager} manager 
     */
    constructor(cssClass, manager) {
        super(cssClass, manager) // Meghívja az Area osztály konstruktorát

        const filterForm = createDiv('filterForm') // Létrehoz egy div-et a filterForm osztállyal
        this.div.appendChild(filterForm) // Hozzáadja a filterForm div-et a fő div-hez

        const formForFilter = document.createElement('form') // Létrehoz egy form elemet
        filterForm.appendChild(formForFilter) // Hozzáadja a form elemet a filterForm div-hez

        const select = document.createElement('select') // Létrehoz egy select elemet
        formForFilter.appendChild(select) // Hozzáadja a select elemet a form-hoz

        const options = [
            { value: '', innerText: '' }, // Üres opció
            { value: 'forradalom', innerText: 'forradalom' }, // Forradalom opció
            { value: 'evszam', innerText: 'évszám' }, // Évszám opció
            { value: 'sikeres', innerText: 'sikeres' } // Sikeres opció
        ]

        for (const option of options) {
            const element = document.createElement('option') // Létrehoz egy option elemet
            element.value = option.value // Beállítja az option értékét
            element.innerText = option.innerText // Beállítja az option szövegét
            select.appendChild(element) // Hozzáadja az option elemet a select-hez
        }

        const filterInput = document.createElement('input') // Létrehoz egy input elemet
        filterInput.id = 'filterInput' // Beállítja az input id-ját
        formForFilter.appendChild(filterInput) // Hozzáadja az input elemet a form-hoz

        const filterButton = document.createElement('button') // Létrehoz egy button elemet
        filterButton.type = 'submit' // Beállítja a button típusát submit-re
        filterButton.innerText = 'Szűrés' // Beállítja a button szövegét
        formForFilter.appendChild(filterButton) // Hozzáadja a button elemet a form-hoz

        const resultDiv = createDiv('result') // Létrehoz egy div-et a result osztállyal
        this.div.appendChild(resultDiv) // Hozzáadja a result div-et a fő div-hez

        formForFilter.addEventListener('submit', (e) => {
            e.preventDefault() // Megakadályozza az alapértelmezett űrlap elküldést

            const filterValue = filterInput.value.trim().toLowerCase() // Lekéri és kisbetűssé alakítja a beviteli mező értékét
            const filterColumn = select.value // Lekéri a lenyíló menüben kiválasztott oszlopot
            
            const count = manager.countByCondition((revolution) => { 
                // Ha a lenyíló menüben nincs kiválasztva oszlop (üres), minden elemet számol
                if (filterColumn === '') { 
                    return true // Minden elem megfelel
                } 
                // Ha a "forradalom" oszlop van kiválasztva
                else if (filterColumn === 'forradalom') {
                    // Ellenőrzi, hogy a forradalom neve tartalmazza-e a beírt szöveget (kisbetűs összehasonlítás)
                    return revolution.forradalom.toLowerCase().includes(filterValue)
                } 
                // Ha az "évszám" oszlop van kiválasztva
                else if (filterColumn === 'evszam') {
                    // Ellenőrzi, hogy az évszám tartalmazza-e a beírt szöveget (számot szöveggé alakítva)
                    return revolution.evszam.toString().includes(filterValue)
                } 
                // Ha a "sikeres" oszlop van kiválasztva
                else if (filterColumn === 'sikeres') {
                    // Átalakítja a boolean értéket ('true' vagy 'false') "igen" vagy "nem" szöveggé
                    const sikeresValue = revolution.sikeres ? 'igen' : 'nem'
                    // Ellenőrzi, hogy a "sikeres" mező tartalmazza-e a beírt szöveget
                    return sikeresValue.includes(filterValue)
                }
                // Ha egyik feltétel sem teljesül, az elem nem felel meg
                return false
            })

            resultDiv.textContent = `Szűrés: ${count}` // Beállítja az eredmény szövegét
        })
    }
}