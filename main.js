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

const form = createDiv('form') // Létrehoz egy új div elemet a 'form' className-nel

container.appendChild(table)  // Hozzáadja a table divet a container divhez
container.appendChild(form)  // Hozzáadja a form divet a container divhez