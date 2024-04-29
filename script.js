const GRIDWIDTH = 1000;
const GRIDHEIGHT = 1000;

const gridContainer = document.getElementById('grid-container'); 
const gridButton = document.getElementById('grid-button');

gridButton.addEventListener('click', () => updateGrid());

function createGrid(width = 16, height = 16){
  gridWidth = GRIDWIDTH / width;
  gridHeight = GRIDHEIGHT / height;

  for (row = 0; row < height; row++){
    const cellRow = document.createElement('div');
    cellRow.classList.add('cell-row');
    for (col = 0; col < width; col++){
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.style.width = String(gridWidth) + 'px';
      cell.style.height = String(gridHeight) + 'px'
      cell.addEventListener('mouseenter', () => changeBackgroundColor(cell)); 
      cellRow.appendChild(cell);
    }
    gridContainer.appendChild(cellRow);
  }
}

function changeBackgroundColor(cell){
  cell.classList.add('grid-cell-hover');
  if (cell.style.backgroundColor){
    cell.style.opacity = 0.5;
  }
  else {
    color = getRandomHexColor();
    cell.style.backgroundColor = color;
  }
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

function getRandomHexColor() {
  const hex = Math.floor(Math.random() * 16777215).toString(16); // Generate random hex value
  return "#" + hex.padStart(6, '0'); // Ensure 6 digits with leading zeros
}

createGrid();