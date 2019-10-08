var A = document.getElementById('PuzzleGame');
A.setAttribute('class', 'text-center display-4');
// var for boxes at beginning
// var B = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
var square = [];


function createGameBoard() {
    var gameContainer = document.createElement('div');
    gameContainer.setAttribute('class', 'container')

    var gameBoardRow = document.createElement('div');
    gameBoardRow.className = 'row';
    var m = 0
    for (var x = 0; x < 4; x++) {


        for (var y = 0; y < 4; y++) {

            var newCol3 = document.createElement('button')
            newCol3.setAttribute('class', 'col-3 border-border btn-outline-dark')
            newCol3.setAttribute('id', m);
            newCol3.setAttribute('type', 'button');
            newCol3.addEventListener('click', tileMove);

            newCol3.innerHTML = m;

            var T = new Tile(x, y, m);
            square.push(T);

            // console.log(T)

            gameBoardRow.appendChild(newCol3);
            m++
        }

    }
    console.log(square);
    gameContainer.appendChild(gameBoardRow);

    var buttonBoardRow = document.createElement('div');
    buttonBoardRow.className = 'row';


    var buttonShuffle = document.createElement('button');
    buttonShuffle.setAttribute('class', 'col-6 border btn-outline-dark');
    buttonShuffle.innerHTML = 'Shuffle';
    buttonShuffle.addEventListener('click', shuffleBoardButton);
    var buttonImageLoad = document.createElement('button');
    buttonImageLoad.setAttribute('class', 'col-6 border btn-outline-dark');
    buttonImageLoad.innerHTML = 'ImageUpload';

    buttonBoardRow.appendChild(buttonShuffle);
    buttonBoardRow.appendChild(buttonImageLoad);

    gameContainer.appendChild(buttonBoardRow);
    A.appendChild(gameContainer);
}

class Tile {
    constructor(x, y, id) {
        //    positions on the board (0,0) -> (top left corner)
        this.x = x;
        this.y = y;
        this.z = 0;
        // index of array B (DO NOT CHANGE)
        this.id = id;
        this.height = '50px';
        this.width = '50px';
        this.loc = id;
        if (this.x == 0 && this.y == 0) {
            this.z = 1
        }
        this.render = function () {
            // update the html version of me
            var updateUI = document.getElementById(id);
            updateUI.innerHTML = this.loc;
        }
        this.setLoc = function (x, y, loc) {
            this.loc = loc;
            this.x = x;
            this.y = y;
            this.render();

        }
    }
}

function findBlankTile() {
    for (var b = 0; b <= 15; b++) {
        if ((square[b].x == 0) && (square[b].y == 0)) {
            // console.log("got it at: ", b);
            return b;
        }
    }
}
function shuffleBoardButton() {
    for (var i = 0; i < 500; i++) {
        let shuffle = Math.floor(Math.random() * 16);
        document.getElementById(shuffle).click()
    }
}


function checkZValue(blankTile) {

    for (var b = 0; b <= 15; b++) {
        square[b].z = 0
    }

    // console.log('blankTile:', blankTile)

    // if (((blankTile + 1) % 4) < 4 && (blankTile + 1 < square.length) && !((blankTile + 1) % 4 == 0)) { //moved right

    if ((blankTile + 1) % 4 !== 0) {
        console.log("can be right");
        square[blankTile + 1].z = 1
        // return
    }

    if (blankTile + 4 <= 15) {
        console.log("can be down");
        square[blankTile + 4].z = 1
        // return
    }

    if (blankTile - 4 >= 0) {
        console.log("can be top");
        square[blankTile - 4].z = 1
        // return
    }

    if ((blankTile - 1 >= 0) && !(blankTile % 4 == 0)) {
        console.log("can be left");
        square[blankTile - 1].z = 1
        // return
    }


    // console.log(square)

}

function tileMove(e) {
    var tempX = '';
    var tempY = '';
    var tempImg = '';

    var loc = square[e.target.id].loc;


    var blankTile = findBlankTile();

    checkZValue(blankTile)

    console.log(square);
    
    if (square[e.target.id].z === 1) {
        
        // move right
        if (((loc + 1) % 4) < 4 && (loc + 1 < square.length) && !((loc + 1) % 4 == 0)) {
            // console.log('move right', loc);
            
            tempX = square[this.id].x;
            tempY = square[this.id].y;
            square[this.id].setLoc(0, 0, 0)
            square[blankTile].setLoc(tempX, tempY, loc);
            
            return;
            
            
        }
        // moving down
        if ((loc + 4) % 4 < 4 && loc + 4 < square.length) {
            // console.log('move down', loc);
            
            tempX = square[this.id].x;
            tempY = square[this.id].y;
            square[this.id].setLoc(0, 0, 0)
            square[blankTile].setLoc(tempX, tempY, loc);
            return;
            
        }
        // moving left
        if (loc - 1 >= 0 && !(loc % 4 == 0)) {
            // console.log('move left', loc);
            
            tempX = square[this.id].x;
            tempY = square[this.id].y;
            square[this.id].setLoc(0, 0, 0)
            square[blankTile].setLoc(tempX, tempY, loc);
            
            return;
            
        }
        // moving up
        if (loc - 4 >= 0 && square.id) {
            // console.log('move up', loc);
            
            tempX = square[this.id].x;
            tempY = square[this.id].y;
            square[this.id].setLoc(0, 0, 0)
            square[blankTile].setLoc(tempX, tempY, loc);
            
            return;
            
        }
        // console.log("CAN MOVE IT");
        
    }
    checkWin();


}

function convertToNum() {
    console.log((square[i].x * 4) + square[i].y);
    return (square[i].x * 4) + square[i].y;
}


function checkWin() {
    var winTotal = 0
    for (var i = 0; i < 16; i++) {
        if (i == convertToNum(i)) {
            winTotal++;
        }

    }
    if (winTotal == 16) {
        alert("LOOK AT YOU SOLVE THIS");
    }

}



function init() {
    A.innerHTML = 'Puzzle Slider Game';
    createGameBoard();
}

