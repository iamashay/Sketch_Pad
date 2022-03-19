const sketchPad = document.querySelector('#pad');

function populateGrid(){
    let padArea = 500*500;
    let gridArea = 25*25;
    let totalGrids = parseInt(padArea/gridArea);

    while (totalGrids) {
        const newGrid = document.createElement("div");
        newGrid.setAttribute('class', 'box');
        sketchPad.append(newGrid)
        totalGrids--;
    }
}

populateGrid();

console.log('Hey')