class Filter extends Area {
    constructor(cssClass, manager) {    // Konstruktor, amely a Filter osztályhoz tartozik
        super(cssClass, manager) // Meghívja az Area osztály konstruktorát

        const filterForm = createDiv('filterForm') // Létrehoz egy div-et a filterForm osztállyal
        this.div.appendChild(filterForm) // Hozzáadja a filterForm div-et a fő div-hez

        const formForFilter = document.createElement('form') // Létrehoz egy form elemet
        filterForm.appendChild(formForFilter) // Hozzáadja a form elemet a filterForm div-hez

        const select = document.createElement('select') // Létrehoz egy select elemet
        formForFilter.appendChild(select) // Hozzáadja a select elemet a form-hoz

        const options = [   // Létrehoz egy tömböt az opciókkal
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

            let count = 0 // Inicializálja a találatok számát

            for (const revolution of manager.getRevolutions()) {    // Végigmegy a forradalmak tömbjén
                if (filterColumn === '') { // Ha az oszlop üres, minden elemet számol
                    count++
                } else if (filterColumn === 'forradalom' && revolution.forradalom.toLowerCase().includes(filterValue)) {
                    count++ // Ha a forradalom oszlop tartalmazza a keresett értéket, növeli a találatok számát
                } else if (filterColumn === 'evszam' && revolution.evszam.toString().includes(filterValue)) {
                    count++ // Ha az évszám oszlop tartalmazza a keresett értéket, növeli a találatok számát
                } else if (filterColumn === 'sikeres') {
                    const sikeresValue = revolution.sikeres ? 'igen' : 'nem' // Átalakítja a boolean értéket 'igen' vagy 'nem' szöveggé
                    if (sikeresValue.includes(filterValue)) {
                        count++ // Ha a sikeres oszlop tartalmazza a keresett értéket, növeli a találatok számát
                    }
                }
            }

            resultDiv.textContent = `Szűrés: ${count}` // Beállítja az eredmény szövegét
        })
    }
}