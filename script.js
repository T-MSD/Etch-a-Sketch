const gridContainer = document.getElementById('grid-container'); 
const gridButton = document.getElementById('grid-button');

gridButton.addEventListener('click', () => updateGrid());

function createGrid(width = 16, height = 16){
  for (row = 0; row < height; row++){
    const cellRow = document.createElement('div');
    cellRow.classList.add('cell-row');
    for (col = 0; col < width; col++){
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

function getSquares(){
  const width = Math.min(100, parseInt(prompt("Width (in squares):")));
  const height = Math.min(100, parseInt(prompt("Height (in squares):")));
  return {width, height};
}

function updateGrid(){
  deleteGrid();
  const dim = getSquares();
  createGrid(dim.width, dim.height);
}

createGrid();