const gridContainer = document.getElementById('grid-container'); 
const gridButton = document.getElementById('grid-button')

gridButton.addEventListener('click', () => deleteGrid());

function createGrid(){
  for (let row = 0; row < 16; row++){
    const cellRow = document.createElement('div');
    cellRow.classList.add('cell-row');
    for (let column = 0; column < 16; column++){
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.addEventListener('mouseenter', () => changeBackgroundColor(cell)); 
      cellRow.appendChild(cell);
    }
    gridContainer.appendChild(cellRow);
  }
}

function changeBackgroundColor(cell){
  cell.classList.add('grid-cell-hover');
}

function deleteGrid(){
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}
createGrid();