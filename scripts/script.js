$(document).ready(function() {

    const GAME_IS_OVER = false;

    const NB_CELLS = 16;

    let grid = [];
    let cellsArray = $("#grid-game").children();




function addNewCell() {
    
    // Generates two random integers representing a cell on the grid
    let randomRow = parseInt(Math.random() * grid.length);
    let randomColumn = parseInt(Math.random() * grid.length);

    // The cell in the grid is mapped to a unique div element in cellsArray
    let randomCell = $(cellsArray[randomRow*grid.length +randomColumn]);

    // A newly created cell either takes 2 or 4 as a value
    let newCellValue = (Math.round((Math.random()))+1) * 2;

    randomCell.text(newCellValue);
    
    
    
    }


addNewCell();
})


