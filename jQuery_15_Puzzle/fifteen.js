"use strict";

window.onload = setTiles;

var currentDiv;

/**
 * This method is called when html page loads
 */
function setTiles() {
    var childDivs = document.getElementById('puzzlearea').getElementsByTagName('div');
    //alert(childDivs.length);
    var n = 0;
    var id = 0;
    //addDiv();
    //call to sufflePuzzle() method when shufflebutton is clicked
    document.getElementById("shufflebutton").onclick = shufflePuzzle;

    //'i' for rows whereas 'j' for columns
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            childDivs[n].id = id;
            id++;
            //call to hoverCall() method when cursor hovers over tiles
            childDivs[n].onmouseover = hoverCall;
            //call to mouseOut() method when cursor goes off the tile
            childDivs[n].onmouseout = mouseOut;
            //call to clickCall() method when click event occur on tile
            childDivs[n].onclick = clickCall;

            //The loop will break when the position for last tile reached
            if (i === parseInt("3") && j === parseInt("3")) {
                break;
            }
            //CSS property set on each tile
            childDivs[n].className = "puzzlepiece";

            //Below condition statements set the position of each tile
            if (i == 0 || j == 0) {
                if (i == 0 && j == 0) {
                    childDivs[n].style.top = "0px";
                    childDivs[n].style.left = "0px";
                    childDivs[n].style.backgroundPosition = '0px 0px';
                    //childDivs[n].style.backgroundPositionY = "0px";
                    n++;
                    //alert(childDivs[n].style.left);
                    continue;
                } else if (i == 0) {
                    childDivs[n].style.left = (parseInt(j)) * 100 + "px";
                    childDivs[n].style.top = "0px";
                    childDivs[n].style.backgroundPosition = (parseInt(-j) * 100) + 'px 0px';
                    //childDivs[n].style.backgroundPositionY = "0px";
                } else if (j == 0) {
                    childDivs[n].style.left = "0px";
                    childDivs[n].style.top = (parseInt(i)) * 100 + "px";
                    childDivs[n].style.backgroundPosition = '0px ' + (parseInt(-i) * 100) + 'px';
                    //childDivs[n].style.backgroundPositionY = (parseInt(-i)*100)+ "px";
                }
            } else {
                childDivs[n].style.top = (parseInt(i)) * 100 + "px";
                childDivs[n].style.left = (parseInt(j)) * 100 + "px";
                childDivs[n].style.backgroundPosition = (parseInt(-j) * 100) + 'px ' + (parseInt(-i) * 100) + 'px';
                //childDivs[n].style.backgroundPositionY = (parseInt(-i)*100)+ "px";
            }
            //alert(childDivs[n].style.left + childDivs[n].style.left);
            n++;
        }
    }
}

/**
 * This method is called when shuffle button is clicked to start the game
 */
function shufflePuzzle() {
    if (document.getElementById('empty') === null) {
        //Added empty div if it doesn't exists
        addDiv();
    }
    var index = 0;
    var last_num = 0;
    var count = 0;

    //SHUFFLING ALGORITHM : Rearrange the tiles in solvable state by randomly choosing a tile of empty tile and sliding it to the empty tile position
    //loop to 100 times
    while (count < 100) {
        //Get the position of empty div to see where is the space
        var empty_x = document.getElementById('empty').style.left;
        var empty_y = document.getElementById('empty').style.top;
        //alert("empty_x"+empty_x+"empty_y"+empty_y);

        //array will have the neighbours of the empty tile and choose any one among them to swap the position
        var neighs = [];
        var empty_div_curr_loc = document.getElementById('empty').value;

        //Possible neighbours
        var leftid = parseInt(empty_div_curr_loc) - 1;
        var rightid = parseInt(empty_div_curr_loc) + 1;
        var topid = parseInt(empty_div_curr_loc) - 4;
        var downid = parseInt(empty_div_curr_loc) + 4;

        var left_neigh;
        var right_neigh;
        var top_neigh;
        var down_neigh;

        //Get the neighbours distance from the source empty div
        if (leftid >= 0 && leftid <= 15) {
            left_neigh = (document.getElementById(leftid).style.left);
        }
        if (rightid >= 0 && rightid <= 15) {
            right_neigh = (document.getElementById(rightid).style.left);
        }
        if (topid >= 0 && topid <= 15) {
            top_neigh = (document.getElementById(topid).style.top);
        }
        if (downid >= 0 && downid <= 15) {
            down_neigh = (document.getElementById(downid).style.top);
        }

        //Block the wrong pointers to the neighbour
        if (parseInt(empty_div_curr_loc) == 4 || parseInt(empty_div_curr_loc) == 8 || parseInt(empty_div_curr_loc) == 12 || parseInt(empty_div_curr_loc) == 0) {
            left_neigh = undefined;
        }
        if (parseInt(empty_div_curr_loc) == 3 || parseInt(empty_div_curr_loc) == 7 || parseInt(empty_div_curr_loc) == 11 || parseInt(empty_div_curr_loc) == 15) {
            right_neigh = undefined;
        }
        if (parseInt(empty_div_curr_loc) == 0 || parseInt(empty_div_curr_loc) == 1 || parseInt(empty_div_curr_loc) == 2 || parseInt(empty_div_curr_loc) == 3) {
            top_neigh = undefined;
        }
        if (parseInt(empty_div_curr_loc) == 12 || parseInt(empty_div_curr_loc) == 13 || parseInt(empty_div_curr_loc) == 14 || parseInt(empty_div_curr_loc) == 15) {
            down_neigh = undefined;
        }

        //Check the empty space in the neighbour
        if (left_neigh) {
            neighs.push(leftid);
        }

        if (right_neigh) {
            neighs.push(rightid);
        }

        if (down_neigh) {
            neighs.push(downid);
        }

        if (top_neigh) {
            neighs.push(topid);
        }

        //Select the random neighbour tile
        index = newRandomGen(neighs.length, last_num);
        //alert("CCCCC"+document.getElementById('empty').value+" "+neighs[index-1]+" rand "+index);
        //alert(neighs.join("\n"));
        var emp_div_id = document.getElementById('empty').value;
        var cur_div = neighs[parseInt(index) - 1];
        document.getElementById('empty').value = cur_div;
        document.getElementById(cur_div).setAttribute('id', emp_div_id);

        interchangeCoords('empty', emp_div_id);
        //alert("left " + left_neigh +" Right " + right_neigh + " Top " + top_neigh + " Down " + down_neigh+" RANDOM "+index);

        neighs.length = 0;
        last_num = index;
        count++;
    }
    //alert("END");
}

/**
 * This is a helper method to generate random number of given maximum range
 */
function newRandomGen(maxi, lastnum) {
    var randomnumber = Math.floor((Math.random() * parseInt(maxi)) + 1);
    //var isfound = false;
    while (true) {
        randomnumber = Math.floor((Math.random() * parseInt(maxi)) + 1);
        if (lastnum != randomnumber) {
            //	isfound = true;
            break;
        }
    }
    return randomnumber;
}

/**
 * This method is called when cursor hovers over any of the tile
 */
function hoverCall() {
    //Get the coordinates of the empty div
    var empty_x = document.getElementById('empty').style.left;
    var empty_y = document.getElementById('empty').style.top;

    //Get the coordinate of the source div
    var l_x = document.getElementById(this.id).style.left; //left
    var t_y = document.getElementById(this.id).style.top; //top

    //Check whether the source exists in left of empty div
    if ((parseInt(l_x) == parseInt(parseInt(empty_x) - 100)) && (parseInt(t_y) == parseInt(empty_y))) {
        document.getElementById(this.id).className += " movablepiece";
    }
    //Check whether the source exists in right of empty div
    if ((parseInt(l_x) == parseInt(parseInt(empty_x) + 100)) && (parseInt(t_y) == parseInt(empty_y))) {
        document.getElementById(this.id).className += " movablepiece";
    }
    //Check whether the source exists at top of empty div
    if ((parseInt(t_y) == parseInt(parseInt(empty_y) - 100)) && (parseInt(l_x) == parseInt(empty_x))) {
        document.getElementById(this.id).className += " movablepiece";
    }
    //Check whether the source exists at bottom of empty div
    if ((parseInt(t_y) == parseInt(parseInt(empty_y) + 100)) && (parseInt(l_x) == parseInt(empty_x))) {
        document.getElementById(this.id).className += " movablepiece";
    }
}

/**
 * This method is called when a tile is clicked to slide to the empty space
 */
function clickCall() {
    if (document.getElementById('empty') === null) {
        alert("Please shuffle the puzzle to Start the game");
    }
    //Get the position of 'empty' div
    var empty_x = document.getElementById('empty').style.left;
    var empty_y = document.getElementById('empty').style.top;
    //alert("x,y "+empty_x+empty_y);

    //Get the coordinates of the clicked div
    var l_x = document.getElementById(this.id).style.left; //left
    var t_y = document.getElementById(this.id).style.top; //top

    //alert("empty_x " + empty_x +" empty_y " + empty_y + " l_x " + l_x + " t_y " + t_y);

    //Check whether the source exists in left of empty div
    if ((parseInt(l_x) == parseInt(parseInt(empty_x) - 100)) && (parseInt(t_y) == parseInt(empty_y))) {
        //space exists in left
        document.getElementById('empty').value = this.id;
        this.id = parseInt(this.id) + 1;
        currentDiv = this.id;
        //alert("left!!!"+document.getElementById('empty').value+" id changed to "+currentDiv);
        interchangeCoords('empty', currentDiv);
    }

    //Check whether the source exists in right of empty div
    if ((parseInt(l_x) == parseInt(parseInt(empty_x) + 100)) && (parseInt(t_y) == parseInt(empty_y))) {
        //space exists in right
        document.getElementById('empty').value = this.id;
        this.id = parseInt(this.id) - 1;
        currentDiv = this.id;
        //alert("right!!!"+document.getElementById('empty').value+" changed to "+currentDiv);
        interchangeCoords('empty', currentDiv);
    }

    //Check whether the source exists at top of empty div
    if ((parseInt(t_y) == parseInt(parseInt(empty_y) - 100)) && (parseInt(l_x) == parseInt(empty_x))) {
        //space exists in right
        document.getElementById('empty').value = this.id;
        this.id = parseInt(this.id) + 4;
        currentDiv = this.id;
        //alert("top!!!"+document.getElementById('empty').value+" changed to "+currentDiv);
        interchangeCoords('empty', currentDiv);
    }

    //Check whether the source exists at bottom of empty div
    if ((parseInt(t_y) == parseInt(parseInt(empty_y) + 100)) && (parseInt(l_x) == parseInt(empty_x))) {
        //space exists in right
        document.getElementById('empty').value = this.id;
        this.id = parseInt(this.id) - 4;
        currentDiv = this.id;
        //alert("bottom!!!"+document.getElementById('empty').value+" changed to "+currentDiv);
        interchangeCoords('empty', currentDiv);
    }
}

/**
 * This method is a helper method which is used to create the empty div and append to the parent div (puzzlearea)
 */
function addDiv() {
    var adiv = document.createElement('div');
    //adiv.className = "puzzlepiece";
    adiv.id = 'empty';
    document.getElementById('puzzlearea').appendChild(adiv);
    //document.getElementById('empty').style.color = "white";
    //document.getElementById('empty').innerHTML = "e";
    //alert("im added"+document.getElementById('empty'));
    document.getElementById('empty').value = "15";
    document.getElementById('empty').style.left = "300px";
    document.getElementById('empty').style.top = "300px";
}

/**
 * This method is called when cursor goes off the tile to reset it's CSS property
 */
function mouseOut() {
    this.className = this.className.replace("movablepiece", '');
}

/**
 * This method is a helper method called to interchange the coordinates of two element ids
 */
function interchangeCoords(id1, id2) {
    var empty_x = document.getElementById(id1).style.left;
    var empty_y = document.getElementById(id1).style.top;

    var l_x = document.getElementById(id2).style.left; //left
    var t_y = document.getElementById(id2).style.top; //top

    document.getElementById(id1).style.left = l_x;
    document.getElementById(id1).style.top = t_y;

    document.getElementById(id2).style.left = empty_x;
    document.getElementById(id2).style.top = empty_y;
    //alert("interchanged ("+empty_x+","+empty_y+") ("+l_x+","+t_y+")");
}