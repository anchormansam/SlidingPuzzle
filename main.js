var A = document.getElementById('PuzzleGame');
A.setAttribute('class', 'text-center display-4');
// var for boxes at beginning
// var B = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
var square = [];
var imageSrc = "room.jpg";


function createGameBoard() {
    A.innerHTML = "";
    var gameContainer = document.createElement('div');
    gameContainer.setAttribute('class', 'container m-0')

    var gameBoardRow = document.createElement('div');
    gameBoardRow.className = 'row m-0';
    var m = 0
    square = [];
    for (var x = 0; x < 4; x++) {


        for (var y = 0; y < 4; y++) {

            var newCol3 = document.createElement('div');
            newCol3.setAttribute('class', 'col-3 border-border btn-outline-dark m-0');
            newCol3.setAttribute('style', 'height:250px; width:250px; overflow:hidden; background-color:white;')
            newCol3.setAttribute('id', m);
            // newCol3.addEventListener('click', tileMove);
            gameBoardRow.appendChild(newCol3);
            var tile = new Tile(x, y, m, newCol3);
            tile.render();
            square.push(tile);



            m++
        }

    }
    console.log(square);
    gameContainer.appendChild(gameBoardRow);

    var imageSubmitRow = document.createElement('div');
    imageSubmitRow.className = 'row';

    var buttonImageLoad = document.createElement('Input');
    buttonImageLoad.setAttribute("type", "file");
    buttonImageLoad.setAttribute('id', 'upload');
    buttonImageLoad.setAttribute('class', 'col-12 border btn-outline-dark bg-white m-0');
    buttonImageLoad.addEventListener('change', uploadButton);
    buttonImageLoad.innerHTML = '';

    imageSubmitRow.appendChild(buttonImageLoad);



    var buttonBoardRow = document.createElement('div');
    buttonBoardRow.className = 'row';


    var buttonShuffle = document.createElement('button');
    buttonShuffle.setAttribute('class', 'col-6 border btn-outline-dark');
    buttonShuffle.innerHTML = 'Shuffle';
    buttonShuffle.addEventListener('click', shuffleBoardButton);

    // var buttonImageApply = document.createElement('button');
    // buttonShuffle.setAttribute('class', 'col-6 border btn-outline-dark');
    // buttonShuffle.innerHTML = 'Apply Image';
    // buttonShuffle.addEventListener('click', uploadImage);

    // buttonBoardRow.appendChild(buttonImageApply);
    buttonBoardRow.appendChild(buttonShuffle);

    gameContainer.appendChild(imageSubmitRow);
    gameContainer.appendChild(buttonBoardRow);
    A.appendChild(gameContainer);
}

function uploadButton(e) {
    console.log(e);
    var objectURL = URL.createObjectURL(e.target.files[0]);
    // var newImage = [];
    // newImage.push(e.target.files[0].name);
    imageSrc = objectURL;

    createGameBoard();
}

class Tile {
    constructor(x, y, tileId, content) {
        //    positions on the board (0,0) -> (top left corner)
        this.x = x;
        this.y = y;
        this.z = 0;
        // index of array B (DO NOT CHANGE)
        this.tileId = tileId;
        this.loc = tileId;
        this.content = content;
        this.content.addEventListener('click', tileMove);
        if (this.x == 0 && this.y == 0) {
            this.z = 1
        }
        this.render = function () {
            // update the html version of me
            var updateUI = this.content;
            updateUI.innerHTML = "";
            let img = document.createElement("img");
            img.src = imageSrc;
            if (this.loc == 0) {
                img.setAttribute('style', 'opacity:0;');
            }
            else {
                img.src = imageSrc;
                var left = (this.loc % 4) * -250 + "px";
                var top = parseInt(this.loc / 4) * -250 + "px";
                img.setAttribute('style', "margin-left:" + left + "; margin-top:" + top + ";");
            }
            updateUI.appendChild(img)
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
        // checkWin = null;
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
    var loc = square[this.id].loc;

    var blankTile = findBlankTile();

    checkZValue(blankTile)

    console.log('square', square);

    if (square[this.id].z === 1) {

        // move right
        if (((loc + 1) % 4) < 4 && (loc + 1 < square.length) && !((loc + 1) % 4 == 0)) {
            // console.log('move right', loc);

            tempX = square[this.id].x;
            tempY = square[this.id].y;
            square[this.id].setLoc(0, 0, 0)
            square[blankTile].setLoc(tempX, tempY, loc);
            checkWin();
            return;
        }
        // moving down
        if ((loc + 4) % 4 < 4 && loc + 4 < square.length) {
            // console.log('move down', loc);

            tempX = square[this.id].x;
            tempY = square[this.id].y;
            square[this.id].setLoc(0, 0, 0)
            square[blankTile].setLoc(tempX, tempY, loc);
            checkWin();
            return;

        }
        // moving left
        if (loc - 1 >= 0 && !(loc % 4 == 0)) {
            // console.log('move left', loc);

            tempX = square[this.id].x;
            tempY = square[this.id].y;
            square[this.id].setLoc(0, 0, 0)
            square[blankTile].setLoc(tempX, tempY, loc);
            checkWin();
            return;

        }
        // moving up
        if (loc - 4 >= 0 && square.id) {
            // console.log('move up', loc);

            tempX = square[this.id].x;
            tempY = square[this.id].y;
            square[this.id].setLoc(0, 0, 0)
            square[blankTile].setLoc(tempX, tempY, loc);
            checkWin();
            return;
        }
        // console.log("CAN MOVE IT");
        checkWin();
    }
    // checkWin();
}

function checkWin() {
    console.log('here')
    var winTotal = 0;
    for (var i = 0; i < 16; i++) {
        if (square[i].tileId == (square[i].x * 4) + square[i].y) {
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
