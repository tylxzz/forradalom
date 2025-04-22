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

const form = createDiv('form') // Létrehoz egy új div elemet a 'form' className-nel

container.appendChild(table)  // Hozzáadja a table divet a container divhez
container.appendChild(form)  // Hozzáadja a form divet a container divhez