/**
 * @typedef {{forradalom: string, evszam: number, sikeres: boolean}} Revolution
 * 
 * @callback RevCallback
 * @param {Rev[]} rev
 * @returns {void}
 */

/**
 * 
 * @param {string} className 
 * @returns {HTMLDivElement}
 */
const createDiv = (className) => {  // Ez egy arrow function, ami egy div elemet hoz létre a megadott className-nel
    const div = document.createElement('div')   // Létrehoz egy új div elemet
    div.className = className   // Beállítja a className-t a div elemre
    return div  // Visszaadja a létrehozott div elemet
}

/**
 * 
 * @param {HTMLDivElement} container 
 * @param {RevCallback} callback 
 */
const createTable = (container, callback) => {  // Ez egy arrow function, ami létrehoz egy táblázatot a megadott container-ben
    const table = createDiv('table')  // Létrehoz egy új div elemet a 'table' className-nel
    container.appendChild(table)  // Hozzáadja a table divet a container divhez
    const tableSimple = document.createElement('table')  // Létrehoz egy új table elemet
    table.appendChild(tableSimple)  // Hozzáadja a table elemet a tableSimple-hez
    const thead = document.createElement('thead')  // Létrehoz egy új thead elemet
    tableSimple.appendChild(thead)  // Hozzáadja a thead elemet a tableSimple-hez
    const tr = document.createElement('tr')  // Létrehoz egy új tr elemet
    thead.appendChild(tr)  // Hozzáadja a tr elemet a thead-hez
    const theadCells = ['forradalom', 'evszam', 'sikeres']  // Létrehoz egy tömböt a thead cellák nevével
    for(const content of theadCells) {  // Végigiterál a thead cellák tömbjén
        const cell = document.createElement('th')   // Létrehoz egy új th elemet
        cell.innerText = content    // Beállítja a cella szövegét a content változóra
        tr.appendChild(cell)    // Hozzáadja a cellát a tr elemhez
    }
    const tbody = document.createElement('tbody')  // Létrehoz egy új tbody elemet
    tableSimple.appendChild(tbody)  // Hozzáadja a tbody elemet a tableSimple-he
    callback(tbody)  // Meghívja a callback függvényt a tbody-val
}

/**
 * 
 * @param {HTMLTableSectionElement} tbody 
 * @param {HTMLDivElement} container 
 * @param {Rev[]} revArray 
 */
const createFileUpload = (tbody, container, revArray) => {  // Ez egy arrow function, ami létrehoz egy fájl feltöltő elemet a megadott container-ben
    const fileInput = document.createElement('input')  // Létrehoz egy új input elemet
    container.appendChild(fileInput)  // Hozzáadja a fileInput elemet a container divhez
    fileInput.id = 'fileinput' // Beállítja a fileInput id attribútumát 'fileinput'-ra
    fileInput.type = 'file'  // Beállítja a fileInput típusát 'file'-ra
    fileInput.addEventListener('change', (e) => {  // Hozzáad egy eseményfigyelőt a fileInput-hoz 
        const file = e.target.files[0]  // Lekéri az első fájlt
        const reader = new FileReader()  // Létrehoz egy új FileReader objektumot
        reader.onload = () => {  // Hozzáad egy eseményfigyelőt a FileReader-hez
            const lines = reader.result.split('\n')  // Felosztja a fájl tartalmát sorokra
            const remove = lines.slice(1) // Eltávolítja az első sort (fejléc)
            for(const line of remove) {  // Végigiterál a sorokon
                const trimmed = line.trim()  // Levágja a sor elejéről és végéről a szóközöket
                const fields = trimmed.split(';')  // Felosztja a sort mezőkre
                const revolution = {
                    forradalom: fields[0],  // Beállítja a forradalom mezőt
                    evszam: fields[1],  // Beállítja az evszam mezőt
                    sikeres: fields[2]  // Beállítja a sikeres mezőt
                }
                revArray.push(revolution)  // Hozzáadja a forradalmat az array tömbhöz
                addRow(revolution, tbody)  // Meghívja az addRow függvényt a tbody-val és a forradalom objektummal
            }
        }
        reader.readAsText(file)  // Beolvassa a fájlt szövegként
    })
}

/**
 * 
 * @param {HTMLTableSectionElement} tbody 
 * @param {HTMLDivElement} container 
 * @param {Rev[]} revArray 
 */
const createForm = (tbody, container, revArray) => {  // Ez egy arrow function, ami létrehoz egy űrlapot a megadott container-ben
    const form = createDiv('form') // Létrehoz egy új div elemet a 'form' className-nel
    container.appendChild(form) // Hozzáadja a form divet a container divhez
    const formSimple = document.createElement('form') // Létrehoz egy új form elemet
    form.appendChild(formSimple) // Hozzáadja a formSimple elemet a form divzhez
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

    for(const element of elements) {  // Végigiterál az űrlap elemeinek tömbjén
        const field = createDiv('field')  // Létrehoz egy új div elemet a 'field' className-nel
        formSimple.appendChild(field)  // Hozzáadja a field elemet a formSimple-hez
        const label = document.createElement('label')  // Létrehoz egy új label elemet
        label.htmlFor = element.id  // Beállítja a label htmlFor attribútumát az element.id változóra
        label.textContent = element.label  // Beállítja a label szövegét az element.label változóra
        field.appendChild(label)  // Hozzáadja a label elemet a formSimple-hez

        if (element.id === 'sikeres') {  // Ha az elem id-ja 'sikeres'
            const select = document.createElement('select')  // Létrehoz egy új select elemet
            select.id = element.id  // Beállítja a select id attribútumát az element.id változóra

            const optionYes = document.createElement('option')  // Létrehoz egy új option elemet
            optionYes.value = 'igen'  // Beállítja az option értékét
            optionYes.textContent = 'Igen'  // Beállítja az option szövegét
            select.appendChild(optionYes)  // Hozzáadja az option elemet a select-hez

            const optionNo = document.createElement('option')  // Létrehoz egy új option elemet
            optionNo.value = 'nem'  // Beállítja az option értékét
            optionNo.textContent = 'Nem'  // Beállítja az option szövegét
            select.appendChild(optionNo)  // Hozzáadja az option elemet a select-hez

            field.appendChild(document.createElement('br'))  // Hozzáad egy új br elemet a field elemhez
            field.appendChild(select)  // Hozzáadja a select elemet a field-hez
        } else {
            const input = document.createElement('input')  // Létrehoz egy új input elemet
            input.id = element.id  // Beállítja az input id attribútumát az element.id változóra
            field.appendChild(document.createElement('br'))  // Hozzáad egy új br elemet a field elemhez
            field.appendChild(input)  // Hozzáadja az input elemet a field-hez
        }

        field.appendChild(document.createElement('br'))  // Hozzáad egy új br elemet a field elemhez
        const error = document.createElement('span')  // Létrehoz egy új span elemet az error üzenetekhez
        error.className = 'error'  // Beállítja a span className-jét 'error'-ra
        field.appendChild(error)  // Hozzáadja a span elemet a field-hez
    }

    const button = document.createElement('button')  // Létrehoz egy új button elemet
    button.textContent = 'Hozzáadás'  // Beállítja a button szövegét
    formSimple.appendChild(button)  // Hozzáadja a button elemet a formSimple-hez
    formSimple.addEventListener('submit', (e) => {  // Hozzáad egy eseményfigyelőt a formSimple-hez
        e.preventDefault()  // Megakadályozza az alapértelmezett esemény végrehajtását
        const object = {}  // Létrehoz egy új objektumot
        const inputFields = e.target.querySelectorAll('input')  // Létrehoz egy új tömböt az input mezőkkel
        let valid = true  // Beállítja a valid változót igazra
        for(const field of inputFields) {  // Végigiterál az input mezők tömbjén
            const error = field.parentElement.querySelector('.error')  // Lekéri az error üzenetet
            if(!error) {  // Ha az error üzenet nem létezik
                console.error('Nincs errorfield!')  // Kiírja a hibát a konzolra
                return  // Kilép a függvényből
            }
            error.textContent = ''  // Törli az error üzenetet
            if(field.value === '') {  // Ha az input mező üres
                error.textContent = 'Kötelező mező!'  // Beállítja az error üzenetet    
                valid = false  // Beállítja a valid változót hamisra
            }
            object[field.id] = field.value  // Beállítja az objektum mezőit az input mezők értékére
        }
        const selectFields = e.target.querySelectorAll('select')  // Lekéri az összes select mezőt
        for(const field of selectFields) {  // Végigiterál a select mezőkön
            object[field.id] = field.value  // Beállítja az objektum mezőit a select mezők értékére
        }
        if(valid) {  // Ha a valid változó igaz
            revArray.push(object)  // Hozzáadja az objektumot az array tömbhöz
            addRow(object, tbody)  // Meghívja az addRow függvényt a tbody-val és az objektummal
        }
    })
}

/**
 * 
 * @param {Rev} object 
 * @param {HTMLTableSectionElement} tbody 
 */
const addRow = (object, tbody) => {  // Ez egy arrow function, ami hozzáad egy új sort a táblázathoz
    const tr = document.createElement('tr')  // Létrehoz egy új tr elemet
    tbody.appendChild(tr)  // Hozzáadja a tr elemet a tbody-hoz

    const forradalomCell = document.createElement('td')  // Létrehoz egy új td elemet
    forradalomCell.textContent = object.forradalom  // Beállítja a td szövegét az objektum forradalom mezőjére
    tr.appendChild(forradalomCell)  // Hozzáadja a td elemet a tr elemhez

    const evszamCell = document.createElement('td')  // Létrehoz egy új td elemet
    evszamCell.textContent = object.evszam  // Beállítja a td szövegét az objektum evszam mezőjére
    tr.appendChild(evszamCell)  // Hozzáadja a td elemet a tr elemhez

    const sikeresCell = document.createElement('td')  // Létrehoz egy új td elemet
    sikeresCell.textContent = object.sikeres  // Beállítja a td szövegét az objektum sikeres mezőjére
    tr.appendChild(sikeresCell)  // Hozzáadja a td elemet a tr elemhez
}

/**
 * 
 * @param {HTMLDivElement} container 
 * @param {Rev[]} revArray 
 */
const createFileDownload = (container, revArray) => {  // Ez egy arrow function, ami létrehoz egy fájl letöltő elemet a megadott container-ben
    const download = document.createElement('button')  // Létrehoz egy új button elemet
    download.textContent = 'Letöltés'  // Beállítja a button szövegét
    container.appendChild(download)  // Hozzáadja a download elemet a container divhez
    download.addEventListener('click', () => {  // Hozzáad egy eseményfigyelőt a download gombhoz
        const link = document.createElement('a')  // Létrehoz egy új a elemet
        const contentArray = ['forradalom;evszam;sikeres']  // Létrehoz egy új tömböt a fájl tartalmának
        for(const revolution of revArray) {  // Végigiterál a forradalmak tömbjén
            contentArray.push(`${revolution.forradalom};${revolution.evszam};${revolution.sikeres}`)  // Hozzáadja a forradalom mezőit a fájl tartalmához
        }
        const content = contentArray.join('\n')  // Összefűzi a fájl tartalmát sorokra
        const file = new Blob([content])  // Létrehoz egy új Blob objektumot a fájl tartalmával
        link.href = URL.createObjectURL(file)  // Beállítja a link href attribútumát a Blob objektumra
        link.download = 'newdata.csv'  // Beállítja a link letöltési nevét
        link.click()  // Kattint a linkre, hogy letöltse a fájlt
        URL.revokeObjectURL(link.href)  // Visszavonja a Blob objektum URL-jét
    })
}

/**
 * 
 * @param {HTMLDivElement} container 
 */
const createFilterForm = (container) => {  // Ez egy arrow function, ami létrehoz egy szűrő űrlapot a megadott container-ben
    const filterForm = createDiv('filterForm') //filterFormDiv létrehozása, aminek a filterForm lesz a classa
    container.appendChild(filterForm) //filterFormDiv hozzáadása a containerDivhez
    const formForFilter = document.createElement('form'); //form létrehozása
    filterForm.appendChild(formForFilter) //formForFilter hozzáadása a filterFormDivhez
    const select = document.createElement('select') //legördülő lista létrehozása
    formForFilter.appendChild(select) //select hozzáadása a formForFilterhez
    const options = [{ //tömb létrehozása, benne objektummal
        value: '', //lista 1.értéke
        innerText: '' //szövege: üres
    },
    {
        value: 'forradalom', //lista 2.értéke
        innerText: 'forradalom' //szövege: forradalom
    },
    {
        value: 'evszam', //lista 3.értéke
        innerText: 'évszám' //szövege: évszám
    },
    {
        value: 'sikeres', //lista 4.értéke
        innerText: 'sikeres' //szövege: sikeres
    }]
    for(const option of options){ //options tömb bejárása
        const element = document.createElement('option') //optionElement létrehozása
        element.value = option.value //érték beállítása
        element.innerText = option.innerText //megjelenő szöveg beállítása
        select.appendChild(element) //optionElement hozzáadása a selecthez
    }

    const filterInput = document.createElement('input'); //input létrehozása
    filterInput.id = 'filterInput' //filterInputField idje filterInput lesz
    formForFilter.appendChild(filterInput) //filterInputField hozzáadása a formForFilterhez

    const filterButton = document.createElement('button'); //új gomb létrehozása
    filterButton.innerText = 'Szűrés' //gomb szövege a Szűrés lesz
    formForFilter.appendChild(filterButton) //button hozzáadása a formForFilterhez
    formForFilter.addEventListener('submit', (e) => { //eseménykezelő létrehozása a formForFilter submit eseményére
        e.preventDefault() //az oldal újra frissülésének megakadályozása
        let counter = 0; //számláló létrehozása
        for(const element of array) { //array bejárása
            if(element[select.value].toLowerCase().includes(filterInput.value.toLowerCase())) { //ha az adott mező tartalmazza a keresett értéket
                counter++ //számláló növelése
            }
        }
        let result = formForFilter.querySelector('.result') //result classal rendelkező elem eltárolása egy változóban
        if(!result) { //ha a result még nem létezik
            result = createDiv('result') //új div elem létrehozása, amelynek az osztálya a result
            formForFilter.appendChild(result) //result hozzáadása a formForFilterhez
        }
        result.innerHTML = `Szűrés: ${counter}` //result tartalmának beállítása
    })
}