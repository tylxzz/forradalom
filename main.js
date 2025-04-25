const array = [] // Létrehoz egy üres tömböt
const container = createDiv('container')  // Létrehoz egy új div elemet a 'container' className-nel
document.body.appendChild(container)  // Hozzáadja a container divet a body-hoz
createTable(container, (tbody) => {  // Meghívja a createTable függvényt a container-rel és egy callback függvénnyel
    createForm(tbody, container, array)  // Meghívja a createForm függvényt a tbody-val és az array tömbbel
    createFileUpload(tbody, container, array)  // Meghívja a createFileUpload függvényt a tbody-val és az array tömbbel
    createFileDownload(container, array)  // Meghívja a createFileDownload függvényt a container-rel és az array tömbbel
    createFilterForm(container, tbody, array)  // Meghívja a createFilterForm függvényt a container-rel és az array tömbbel
})