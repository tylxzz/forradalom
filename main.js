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
    const input = document.createElement('input')  // Létrehoz egy új input elemet
    input.id = element.id  // Beállítja az input id attribútumát az element.id változóra
    field.appendChild(document.createElement('br'))  // Hozzáad egy új br elemet a field elemhez
    field.appendChild(input)  // Hozzáadja az input elemet a formSimple-hez
}

const button = document.createElement('button')  // Létrehoz egy új button elemet
button.textContent = 'Hozzáadás'  // Beállítja a button szövegét
formSimple.appendChild(button)  // Hozzáadja a button elemet a formSimple-hez

container.appendChild(table)  // Hozzáadja a table divet a container divhez
container.appendChild(form)  // Hozzáadja a form divet a container divhez