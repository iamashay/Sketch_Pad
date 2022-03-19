const sketchPad = document.querySelector('#pad');
const clearGridButton = document.querySelector('#clear');
const changeSizeButton = document.querySelector('#changeSize');
const colorPicker = document.querySelector('#color');
const gridSizeMsg = document.querySelector('#gridSizeMsg');

function populateGrid(gridCount=10){
    
    if (!gridCount || gridCount < 2 || isNaN(gridCount)) {
        gridCount = 2;
    }
    
    gridSizeMsg.innerHTML = `Current Size: <b>${gridCount} x ${gridCount}</b>`;
    
    if(gridCount > 64) {
        gridCount = 64;
        gridSizeMsg.innerHTML = `Current Size: <b>${gridCount} x ${gridCount}</b> (Grid size cannot be more then 64)`;
    }



    gridCount = parseInt(gridCount)
    sketchPad.innerHTML = "";
    let padSideSize = 500;
    let padArea = padSideSize**2;
    let gridSideSize = padSideSize / gridCount;
    let gridArea = gridSideSize**2;
    let totalGrids = gridCount**2;
    
    let rowCount = gridCount;
    let columncount = 1;

    const gridsContainer = document.createElement('div');
    gridsContainer.setAttribute('id', 'gridsContainer');
    while (totalGrids) {
        //console.log('Gridcount', gridCount, '  RowCount', rowCount, '  ColumnCount', columncount, '  CurrentGrid: ', totalGrids)
        const newGrid = document.createElement("div");
        newGrid.setAttribute('class', 'box');
        newGrid.setAttribute('style', `width: ${gridSideSize}px; height: ${gridSideSize}px;`)
        newGrid.addEventListener('mouseover', paintGrid);

        if (gridCount % 2 === 0 && rowCount % 2 === 0){
            
            if (totalGrids % 2 === 0 ){
                newGrid.style.background = '#e1e1e1';
            }else {
                newGrid.style.background = 'white';
    
            }

        }else {
            if (totalGrids % 2 !== 0 ){
                newGrid.style.background = '#e1e1e1';
            }else {
                newGrid.style.background = 'white';
    
            }
        }
        
        

        gridsContainer.append(newGrid)
        //console.log(totalGrids);


        if (columncount === gridCount) {
            rowCount--;
            columncount = 0;
        }
        totalGrids--;
        columncount++;

    }

    sketchPad.append(gridsContainer)

}


function clearGrid() {
    sketchPad.innerHTML = "";
    populateGrid();
}

function paintGrid(grid){
    //console.log(grid);
    let chosenColor = colorPicker.value;
    grid.target.style.background = chosenColor;
}



clearGridButton.addEventListener('click', clearGrid);

changeSizeButton.addEventListener('click', () => {
    populateGrid(prompt('Enter grid count per side: '))
})

populateGrid();
