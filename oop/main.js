const separator = document.createElement('hr') // Létrehoz egy új hr elemet
document.body.appendChild(separator) // Hozzáadja a body-hoz

const fConfig = [{ // Létrehoz egy tömböt az űrlap elemeivel
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

const tableDiv = new Table('table') // Létrehoz egy új Table divet a 'table' className-nel
const formDiv = new Form('form', fConfig) // Létrehoz egy új Form divet a 'form' className-nel  