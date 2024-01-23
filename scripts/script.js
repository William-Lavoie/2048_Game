$(document).ready(function() {

    const GAME_IS_OVER = false;

    const NB_CELLS = 16;
    const GRID_LENGTH = Math.sqrt(NB_CELLS);

    const GRID_WIDTH = $("grid-game").width();

    // Colours 

    const ORANGE = 0;
    const BLUE = 2;

    // Arrows
    const LEFT_ARROW = 37;
    const UP_ARROW = 38;
    const RIGHT_ARROW = 39;
    const DOWN_ARROW = 40;

    const ARROW_KEY = [LEFT_ARROW,
                       UP_ARROW, 
                       RIGHT_ARROW, 
                       DOWN_ARROW]


    let grid = [];
    let cellsArray = $("#grid-game").children();


function addNewCell() {
    
    let randomCell; 
    let randomRow;
    let randomColumn;
    
    do {
        // Generates two numbers between 0 and 3 corresponding to the row and column in the grid
        randomRow = parseInt(Math.random() * 4)
        randomColumn = parseInt(Math.random() * 4)

        // Maps the position in the 2d array to a position in the 1d array in a unique way
        randomCell = $(cellsArray[randomRow*4 + randomColumn]);
    } while (grid[randomRow][randomColumn] !== "");

    // Adds either 2 or 4 into the cell and the grid
    let newValue = (Math.round((Math.random()))+1) * 2;

    // Create a new number container and adds the corresponding colour
    let element = $("<div class='number-container'></div>");
    
    if (newValue == 2) {
        element.text(2);
        element.css({"background-color": "lightsalmon"});
    }

    else {
        element.text(4);
        element.css({"background-color": "lightblue"});
    }

    randomCell.append(element);

    // Adds the value into the correct grid position 
    grid[randomRow][randomColumn] = newValue;
}

function leftShift() {

    // Loops through the grid 
    for (let i = 0; i < grid.length; i++) {
        for (let j = 1; j < grid.length; j++) {

            // Checks if there is a value 
            if (grid[i][j] != "") {

                let shiftValue = 0;
                let jValue = j;

                while (grid[i][j-1] == "") {
                    shiftValue++;
                    j--;
                }

                let cellValue = grid[i][jValue];

                // Empties the current cell and inserts its value into the new position
                grid[i][jValue] = "";
                grid[i][j] = cellValue;

                let cell = $(cellsArray[i*4 + jValue]);
                let cellChild = $(cell.children());

                let currentRight = parseInt(cellChild.css("right"));

                if (isNaN(currentRight)) {
                    currentRight = 0;
                }

                cellChild.css({"right": currentRight + shiftValue*91 + "px"});
            }
        }
    }

    addNewCell();
}


$("#new-game").on("click", function() {

    // Empties the grid 
    for (let i = 0; i < cellsArray.length; i++) {
        let cell = $(cellsArray[i]);
        cell.text("");
    }

    // Initializes the grid with empty values
    for (let i = 0; i < GRID_LENGTH; i++) {

        let gridRow = [];

        for (let j = 0; j < GRID_LENGTH; j++) {
            gridRow[j] = "";
        }

        grid[i] = gridRow;
    }

    addNewCell();
    addNewCell();
    leftShift();
    leftShift();


})

$(document).on("keydown", function(event) {
    switch (event.which) {
        case LEFT_ARROW:
            leftShift();
            break;
        case RIGHT_ARROW:
            console.log("right");
            break;
        case UP_ARROW:
             console.log("up");
            break;
        case DOWN_ARROW:
            console.log("down");
            break;
    }
})
})


