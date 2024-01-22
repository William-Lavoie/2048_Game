$(document).ready(function() {

    const GAME_IS_OVER = false;

    const NB_CELLS = 16;

    let grid = [];
    let cellsArray = $("#grid-game").children();




function addNewCell() {
    
    let randomCell; 
    
    do {
        // Generates a number between 1 and 16 corresponding to random cell
        let randomCellIndex = parseInt(Math.random() * 16)
        randomCell = $(cellsArray[randomCellIndex]);
    } while (randomCell.text() !== "");

    // Adds either 2 or 4 into the cell
    let newCellValue = (Math.round((Math.random()))+1) * 2;
    randomCell.text(newCellValue);
    }


//addNewCell();

$("#new-game").on("click", function() {

    for (let i = 0; i < cellsArray.length; i++) {
        let cell = $(cellsArray[i]);
        cell.text("");
    }

    addNewCell();
    addNewCell();
})
})


