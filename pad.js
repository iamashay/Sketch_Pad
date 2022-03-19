const sketchPad = document.querySelector('#pad');
const clearGridButton = document.querySelector('#clear');
const changeSizeButton = document.querySelector('#changeSize');
const colorPicker = document.querySelector('#color');
const gridSizeMsg = document.querySelector('#gridSizeMsg');
const existingGridSize = document.querySelector('#existingGridSize');

function populateGrid(gridCount=10){
    
    if (!gridCount || isNaN(gridCount)) {
        gridCount = parseInt(existingGridSize.value);
    }
    
    gridSizeMsg.innerHTML = `Current Size: <b>${gridCount} x ${gridCount}</b>`;
    
    if(gridCount > 64) {
        gridCount = 64;
        gridSizeMsg.innerHTML = `Current Size: <b>${gridCount} x ${gridCount}</b> (Grid size cannot be more then 64)`;
    }

    existingGridSize.value = gridCount;



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
        newGrid.setAttribute('style', `width: ${gridSideSize}px; height: ${gridSideSize}px; filter: brightness(1);`)
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
    populateGrid(parseInt(existingGridSize.value));
}

function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

function paintGrid(grid){
    //console.log(grid);
    let chosenColor = colorPicker.value;
    let gridColor = RGBToHex(grid.target.style.background);
    if (chosenColor === gridColor){

        let currentBrightness = parseFloat(grid.target.style.filter.replace('brightness(', '').replace(')', ''));
        if (currentBrightness > 0){
            currentBrightness =  currentBrightness - 0.1
            grid.target.style.filter = `brightness(${currentBrightness})`;

        }
        
    }else {
        grid.target.style.background = chosenColor;
    }
    

}



clearGridButton.addEventListener('click', clearGrid);

changeSizeButton.addEventListener('click', () => {
    let userChoice = prompt('Enter grid count per side: ');
    if (userChoice){
        populateGrid(userChoice)
    }
})

populateGrid();
