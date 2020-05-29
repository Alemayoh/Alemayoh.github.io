/*
	Alemayoh Abrha, ID_No: 611143
	CS472 May 2020
	Maharishi International University
	Lab 6: Ascii Anamination
*/

"use strict";

var currentAnimation; // an array of frames, the first element should be displayed next.
var interval; // an interval object.
var speed = 250; // interval delay for the animation, initially set to normal.
var size; // font size of the output, initially set to medium by the css file.
var heart;
var audio = new Audio('Dance - Royalty.mp3');
window.onload = pageLoad;
audio.playbackRate = 0.5;

function pageLoad() {
    // add a "heart" icon on top-left corner of the Animation Page
    heart = document.createElement("span");
    heart.id = "galleryheart";
    heart.innerHTML = "&hearts;";
    heart.style.color = "red";
    heart.style.backgroundColor = "transparent";
    heart.style.fontFamily = "Arial, sans-serif";
    heart.style.fontSize = "24pt";
    heart.style.lineHeight = "24pt";
    heart.style.position = "fixed";
    heart.style.top = "0px";
    heart.style.left = "0px";
    document.body.appendChild(heart);

    // sets up event handlers for all the controls
    document.getElementById("stopButton").disabled = true;
    document.getElementById("startButton").onclick = start;
    document.getElementById("stopButton").onclick = stop;
    document.getElementById("animation").onchange = changeAnimation;
    document.getElementById("size").onchange = changeSize;
    document.getElementById("myaudio");

    var turboSpeed = document.getElementById("speed"); // add event to the checkbox
    var currentSpeed = turboSpeed.value;
    turboSpeed.onclick = (function(currentSpeed) { // update the speed, keep displaying frames during an animation
        return function() {
            if (turboSpeed.checked) {
                speed = currentSpeed;
                audio.playbackRate = 1;
            } else {
                speed = 250;
                audio.playbackRate = 0.5;
            }
            if (interval) {
                clearInterval(interval);
            }
            if (document.getElementById("startButton").disabled) {
                interval = setInterval(function() { displayNextFrame(currentAnimation); }, speed);
            }
        };
    })(currentSpeed);
}


// change the animation when a different one is selected
function changeAnimation() {
    var newAnimation = document.getElementById("animation").value;
    var textarea = document.getElementById("mytextarea");
    textarea.value = ANIMATIONS[newAnimation];
}

// process the animation and display it
function start() {
    document.getElementById("stopButton").disabled = false;
    document.getElementById("startButton").disabled = true;
    document.getElementById("animation").disabled = true;
    var textarea = document.getElementById("mytextarea");
    var allFrames = textarea.value.split("=====\n");
    currentAnimation = allFrames;
    interval = setInterval(function() { displayNextFrame(currentAnimation); }, speed);

    audio.play();
    audio.volume = 0.1;

}

// stops the animation and displays all frames
function stop() {
    document.getElementById("myaudio").stop;
    document.getElementById("startButton").disabled = false;
    document.getElementById("animation").disabled = false;
    changeAnimation();
    clearInterval(interval);
    document.getElementById("stopButton").disabled = true;
    audio.pause();
}

// a helper function that displays the next frame
function displayNextFrame(animation) {
    var textarea = document.getElementById("mytextarea");
    var currentFrame = animation.shift();
    textarea.value = currentFrame;
    animation.push(currentFrame);
    currentAnimation = animation;
}

// change the font size of the output
function changeSize() {
    var size = document.getElementById("size").value;
    document.getElementById("mytextarea").style.fontSize = size;
}