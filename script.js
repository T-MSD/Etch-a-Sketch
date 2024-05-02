const GRIDWIDTH = 1000;
const GRIDHEIGHT = 1000;

const mode = {
  rainbow: true,
  normal: false,
};

const dim = {
  width: 0,
  height: 0,
};

const gridContainer = document.getElementById('grid-container'); 
const gridButton = document.getElementById('grid-button');
const rainbowButton = document.getElementById('rainbow-button');
const normalButton = document.getElementById('normal-button');

gridButton.addEventListener('click', () => updateGrid());
rainbowButton.addEventListener('click', () => {
  mode.normal = false;
  mode.rainbow = true;
  deleteGrid();
  createGrid(dim.width, dim.height);
});
normalButton.addEventListener('click', () => {
  mode.normal = true;
  mode.rainbow = false;
  deleteGrid();
  createGrid(dim.width, dim.height);
});

function createGrid(width = 16, height = 16){
  dim.width = width;
  dim.height = height;

  gridWidth = GRIDWIDTH / width;
  gridHeight = GRIDHEIGHT / height;

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
  }
}

function changeBackgroundRandomColor(cell){
  cell.classList.add('grid-cell-hover');
  if (!cell.style.backgroundColor){
    color = getRandomHexColor();
    cell.style.backgroundColor = color;
  }
  else {
    cell.style.backgroundColor = darkenColor(cell.style.backgroundColor);
    }
  }

function changeBackgroundBlack(cell){
  cell.classList.add('grid-cell-hover');
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

function getMode(cell){
  if (mode.rainbow){
    return changeBackgroundRandomColor(cell);
  }
  if (mode.normal){
    return changeBackgroundBlack(cell);
  }
}

createGrid();