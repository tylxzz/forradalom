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

const manager = new Manager() // Létrehoz egy új Manager objektumot
const tableDiv = new Table('table', manager) // Létrehoz egy új Table divet a 'table' className-nel
const formDiv = new Form('form', fConfig, manager) // Létrehoz egy új Form divet a 'form' className-nel  
const upload = new UploadDownload('upload', manager) // Létrehoz egy új Upload divet a 'upload' className-nel