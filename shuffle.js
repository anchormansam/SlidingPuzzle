function initTiles() {
    var i = tileCount * tileCount - 1;
    while (i > 0) {
        var j = Math.floor(Math.random() * i);
        var xi = i % tileCount;
        var yi = Math.floor(i / tileCount);
        var xj = j % tileCount;
        var yj = Math.floor(j / tileCount);
        swapTiles(xi, yi, xj, yj);
        --i;
    }
}

function swapTiles(i, j, k, l) {
    var temp = new Object();
    temp = boardParts[i][j];
    boardParts[i][j] = boardParts[k][l];
    boardParts[k][l] = temp;
}

function countInversions(i, j) {
    var inversions = 0;
    var tileNum = j * tileCount + i;
    var lastTile = tileCount * tileCount;
    var tileValue = boardParts[i][j].y * tileCount + boardParts[i][j].x;
    for (var q = tileNum + 1; q < lastTile; ++q) {
      var k = q % tileCount;
      var l = Math.floor(q / tileCount);
  
      var compValue = boardParts[k][l].y * tileCount + boardParts[k][l].x;
      if (tileValue > compValue && tileValue != (lastTile - 1)) {
        ++inversions;
      }
    }
    return inversions;
  }

  function sumInversions() {
    var inversions = 0;
    for (var j = 0; j < tileCount; ++j) {
      for (var i = 0; i < tileCount; ++i) {
        inversions += countInversions(i, j);
      }
    }
    return inversions;
  }

  function isSolvable() {
    return (sumInversions() % 2 == 0)
  }

  if (!isSolvable()) {
    if (emptyLoc.y == 0 && emptyLoc.x <= 1) {
      swapTiles(tileCount - 2, tileCount - 1, tileCount - 1, tileCount - 1);
    } else {
      swapTiles(0, 0, 1, 0);
    }
    initEmpty();
  }

  function isSolvable(width, height, emptyRow) {
    if (width % 2 == 1) {
      return (sumInversions() % 2 == 0)
    } else {
      return ((sumInversions() + height - emptyRow) % 2 == 0)
    }
  }

  if (!isSolvable(tileCount, tileCount, emptyLoc.y + 1))
