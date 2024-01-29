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


/**
 * Adds a new cell with either 2 or 4 at a random location on the grid
 */
function addNewCell() {
    
    // Initialises the JQuery cell as well as the position of the cell in the array grid
    let randomCell; 
    let randomRow;
    let randomColumn;
    
    do {
        // Generates two numbers between 0 and 3 corresponding to the row and column in the grid
        randomRow = parseInt(Math.random() * 4)
        randomColumn = parseInt(Math.random() * 4)

        // Maps the position in the 2d array to a position in the 1d array in a unique way
        randomCell = $(cellsArray[randomRow*4 + randomColumn]);
    } while (grid[randomRow][randomColumn] != "");


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

    // Adds the element in the cell and gives it a transition
    randomCell.append(element);
    element.addClass("visible");


    // Adds the value into the correct grid position 
    grid[randomRow][randomColumn] = newValue;
}


/**
 * Creates a new game by emptying the grid and adding two initial values
 */
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

    // Adds two random cells
    addNewCell();
    addNewCell();
})

// Returns the colour corresponding to the new value of the cell
function sumCells(number) {

    switch (number) {
        case 2:
            return "lightblue";
        case 4:
            return "red";
        case 8: 
            return "green";
        case 16: 
            return "yellow";
        case 32:
            return "purple";
        case 64:
            return "pink";
        case 128: 
            return "black";
        case 256:
            return "indigo"
        case 512:
            return "blue"
    }
}

// Moves all the cells in the direction chosen by the user 
$(document).on("keydown", function(event) {

    // 
    let lateralShift = 0;
    let verticalShift = 0;

    switch (event.which) {
        case LEFT_ARROW:
            lateralShift = -1;
            break;
            
        case RIGHT_ARROW:
            lateralShift = 1;
            break;
            
        case UP_ARROW:
            verticalShift = -1;
            break;

        case DOWN_ARROW:
            verticalShift = 1;  
            break;         
    }

      // Loops through the grid 
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {

            // Checks if there is a value 
            if (grid[i][j] != "") {

                let shiftValue = 0;
                let jValue = j;
                let iValue = i;

                while (i + verticalShift >= 0 && j + lateralShift >= 0  
                       && i + verticalShift < grid.length && j + lateralShift < grid.length
                       && grid[i + verticalShift][j + lateralShift] == "") {

                    shiftValue++;
                    i += verticalShift;
                    j += lateralShift;
                }

                let cellValue = grid[iValue][jValue];

                // Empties the current cell and inserts its value into the new position
                grid[iValue][jValue] = "";

                let newColor = "";
                // Checks if the adjacent cell as the same value as the chosen one 
                if (i + verticalShift >= 0 && j + lateralShift >= 0  
                    && i + verticalShift < grid.length && j + lateralShift < grid.length
                    && grid[i + verticalShift][j + lateralShift] == cellValue) {
                    
                      
                    newColor = sumCells(cellValue);

                    let oldCell = $(cellsArray[iValue*4 + jValue]).children().first();
                    oldCell.remove();

                    let sumCell = $(cellsArray[(i + verticalShift)*4 + (j + lateralShift)]).children().first();
                    sumCell.css({"background-color": newColor});
                    sumCell.text(cellValue*2);
                    grid[i + verticalShift][j + lateralShift] = cellValue*2;

                    if (cellValue*2 == 2048) {
                        alert("Félicitations! Vous avez gagné");
                        return;
                    }
                }

                else {

                    grid[i][j] = cellValue;

                    let oldCell = $(cellsArray[iValue*4 + jValue]);
                    let newCell = $(cellsArray[i*4 + j]);

                    let cellChild = $(oldCell).children().first();
                    newCell.append(cellChild);
                }

                j = jValue;
                i= iValue;
            }
        } 
    }

    let gameIsOver = true;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {

            // Checks if a new cell can be added 
            if (grid[i][j] != "") {

                 gameIsOver = false;
                 break;
            }
        }
    }

    if (gameIsOver) {
        alert("Vous avez perdu!")
    }

    else {
        addNewCell();
    }

})
})


