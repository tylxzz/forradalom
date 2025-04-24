const array = [] // Létrehoz egy üres tömböt

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

const container = createDiv('container')  // Létrehoz egy új div elemet a 'container' className-nel
document.body.appendChild(container)  // Hozzáadja a container divet a body-hoz
const table = createDiv('table')  // Létrehoz egy új div elemet a 'table' className-nel
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
tableSimple.appendChild(tbody)  // Hozzáadja a tbody elemet a tableSimple-hez

const form = createDiv('form') // Létrehoz egy új div elemet a 'form' className-nel
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
        array.push(object)  // Hozzáadja az objektumot az array tömbhöz
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
})

container.appendChild(table)  // Hozzáadja a table divet a container divhez
container.appendChild(form)  // Hozzáadja a form divet a container divhez

const fileInput = document.createElement('input')  // Létrehoz egy új input elemet
container.appendChild(fileInput)  // Hozzáadja a fileInput elemet a container divhez
fileInput.id = 'fileinput' // Beállítja a fileInput id attribútumát 'fileinput'-ra
fileInput.type = 'file'  // Beállítja a fileInput típusát 'file'-ra
fileInput.addEventListener('change', (e) => {  // Hozzáad egy eseményfigyelőt a fileInput-hoz 
    const file = e.target.files[0]  // Lekéri az első fájlt
    const reader = new FileReader()  // Létrehoz egy új FileReader objektumot
    reader.onload = (e) => {  // Hozzáad egy eseményfigyelőt a FileReader-hez
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
            array.push(revolution)  // Hozzáadja a forradalmat az array tömbhöz
            const tr = document.createElement('tr')  // Létrehoz egy új tr elemet
            tbody.appendChild(tr)  // Hozzáadja a tr elemet a tbody-hoz

            const forradalomCell = document.createElement('td')  // Létrehoz egy új td elemet
            forradalomCell.textContent = revolution.forradalom  // Beállítja a td szövegét az objektum forradalom mezőjére
            tr.appendChild(forradalomCell)  // Hozzáadja a td elemet a tr elemhez

            const evszamCell = document.createElement('td')  // Létrehoz egy új td elemet
            evszamCell.textContent = revolution.evszam  // Beállítja a td szövegét az objektum evszam mezőjére
            tr.appendChild(evszamCell)  // Hozzáadja a td elemet a tr elemhez

            const sikeresCell = document.createElement('td')  // Létrehoz egy új td elemet
            sikeresCell.textContent = revolution.sikeres  // Beállítja a td szövegét az objektum sikeres mezőjére
            tr.appendChild(sikeresCell)  // Hozzáadja a td elemet a tr elemhez
        }
    }
    reader.readAsText(file)  // Beolvassa a fájlt szövegként
})