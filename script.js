const gridContainer = document.getElementById('grid-container');

function createGrid(){
  for (let row = 0; row < 16; row++){
    const cellRow = document.createElement('div');
    for (let column = 0; column < 16; column++){
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cellRow.appendChild(cell);
    }
    gridContainer.appendChild(cellRow);
  }
}

createGrid();