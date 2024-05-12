const grid = {
  width: 1000,
  height: 1000,
  size: 0,
};

const mode = {
  rainbow: false,
  normal: false,
  eraser: false,
};

const gridContainer = document.getElementById('grid-container'); 
const buttons = {
  grid: document.getElementById('grid-button'),
  rainbow: document.getElementById('rainbow-button'),
  normal: document.getElementById('normal-button'),
  eraser: document.getElementById('eraser-button'),
};

buttons['grid'].addEventListener('click', () => updateGrid());
buttons['rainbow'].addEventListener('click', () => changeMode('rainbow', buttons['rainbow']));
buttons['normal'].addEventListener('click', () => changeMode('normal', buttons['normal']));
buttons['eraser'].addEventListener('click', () => changeMode('eraser', buttons['eraser']));

function createGrid(number = 16){
  grid.size = number;

  gridSize = grid.width / number;

  for (row = 0; row < number; row++){
    const cellRow = document.createElement('div');
    cellRow.classList.add('cell-row');
    for (col = 0; col < number; col++){
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.style.opacity = 1.0;
      cell.style.width = String(gridSize) + 'px';
      cell.style.height = String(gridSize) + 'px'
      cell.addEventListener('mouseenter', () => getMode(cell));
      cellRow.appendChild(cell);
    }
    gridContainer.appendChild(cellRow);
    gridContainer.classList.add('grid-container')
  }
  mode['rainbow'] = true;
  buttons['rainbow'].classList.add('selected');
}

function changeBackgroundRandomColor(cell){
  if (!cell.style.backgroundColor || cell.style.backgroundColor == 'white'){
    color = getRandomHexColor();
    cell.style.backgroundColor = color;
  }
  else if (cell.style.backgroundColor != 'black'){
    cell.style.backgroundColor = darkenColor(cell.style.backgroundColor);
    }
  }

function changeBackgroundBlack(cell){
  cell.style.backgroundColor = 'black';
}

function deleteGrid(){
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

function getSquares(){
  const size = Math.min(100, parseInt(prompt("Number of squares:")));
  grid.size = size;
}

function updateGrid(){
  m = getPreviousMode()
  mode[m] = false;
  buttons[m].classList.remove('selected');
  deleteGrid();
  getSquares();
  createGrid(grid.size);
}

function getRandomHexColor() {
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + hex.padStart(6, '0');
}

function darkenColor(color) {
  const regex = /rgb\((\d+), (\d+), (\d+)\)/;
  const match = color.match(regex);
  const [_, r, g, b] = match;
  red = parseInt(r);
  green = parseInt(g);
  blue = parseInt(b);
  darkenFactor = 0.1;
  const darkenedR = Math.max(0, Math.floor(red * (1 - darkenFactor)));
  const darkenedG = Math.max(0, Math.floor(green * (1 - darkenFactor)));
  const darkenedB = Math.max(0, Math.floor(blue * (1 - darkenFactor)));
  return `rgb(${darkenedR}, ${darkenedG}, ${darkenedB})`;
}

function getMode(cell) {
  if (mode.rainbow){
    return changeBackgroundRandomColor(cell);
  }
  if (mode.normal){
    return changeBackgroundBlack(cell);
  }
  if (mode.eraser){
    return erase(cell);
  }
}

function erase(cell) {
  cell.style.backgroundColor = 'white';
  cell.style.border = 'border: 1px solid #ccc;'
}

function getPreviousMode() {
  for (let m in mode) {
    if (mode[m] == true) {
      return m
    }
  }
}

function changeMode(thisMode, button){
  m = getPreviousMode()
  mode[m] = false;
  buttons[m].classList.remove('selected');
  mode[thisMode] = true;
  button.classList.add('selected');
}

createGrid();