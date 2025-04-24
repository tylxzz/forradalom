const array = [] // Létrehoz egy üres tömböt

/**
 * 
 * @param {className} className 
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
}

const button = document.createElement('button')  // Létrehoz egy új button elemet
button.textContent = 'Hozzáadás'  // Beállítja a button szövegét
formSimple.appendChild(button)  // Hozzáadja a button elemet a formSimple-hez
formSimple.addEventListener('submit', (e) => {  // Hozzáad egy eseményfigyelőt a formSimple-hez
    e.preventDefault()  // Megakadályozza az alapértelmezett esemény végrehajtását
    const object = {}  // Létrehoz egy új objektumot
    const inputFields = e.target.querySelectorAll('input')  // Létrehoz egy új tömböt az input mezőkkel
    for(const field of inputFields) {  // Végigiterál az input mezők tömbjén
        object[field.id] = field.value  // Beállítja az objektum mezőit az input mezők értékére
    }
    const selectFields = e.target.querySelectorAll('select')  // Lekéri az összes select mezőt
    for(const field of selectFields) {  // Végigiterál a select mezőkön
        object[field.id] = field.value  // Beállítja az objektum mezőit a select mezők értékére
    }
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
})

container.appendChild(table)  // Hozzáadja a table divet a container divhez
container.appendChild(form)  // Hozzáadja a form divet a container divhez