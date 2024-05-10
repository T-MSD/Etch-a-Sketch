const grid = {
  width: 1000,
  height: 1000,
};

const mode = {
  rainbow: true,
  normal: false,
  eraser: false,
};

const dim = {
  width: 0,
  height: 0,
};

const gridContainer = document.getElementById('grid-container'); 
const buttons = [
  document.getElementById('grid-button'),
  document.getElementById('rainbow-button'),
  document.getElementById('normal-button'),
  document.getElementById('eraser-button'),
];

buttons[0].addEventListener('click', () => updateGrid());
buttons[3].addEventListener('click', () => changeMode('eraser', buttons[3]));
buttons[1].addEventListener('click', () => changeMode('rainbow', buttons[1]));
buttons[2].addEventListener('click', () => changeMode('normal', buttons[2]));

function createGrid(width = 16, height = 16){
  dim.width = width;
  dim.height = height;

  gridWidth = grid.width / width;
  gridHeight = grid.height / height;

  for (row = 0; row < height; row++){
    const cellRow = document.createElement('div');
    cellRow.classList.add('cell-row');
    for (col = 0; col < width; col++){
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.style.opacity = 1.0;
      cell.style.width = String(gridWidth) + 'px';
      cell.style.height = String(gridHeight) + 'px'
      cell.addEventListener('mouseenter', () => getMode(cell));
      cellRow.appendChild(cell);
    }
    gridContainer.appendChild(cellRow);
    gridContainer.classList.add('grid-container')
  }
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
  const width = Math.min(100, parseInt(prompt("Width (in squares):")));
  const height = Math.min(100, parseInt(prompt("Height (in squares):")));
  dim.width = width;
  dim.height = height;
}

function updateGrid(){
  deleteGrid();
  getSquares();
  createGrid(dim.width, dim.height);
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

// fazer uma funca que reduz a repeticao do codigo
function changeMode(thisMode, button){
  m = getPreviousMode()
  mode[m] = false;
  mode[thisMode] = true;
}

createGrid();