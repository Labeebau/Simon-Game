var randomNumber, randomchosenColor;
const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [],
  userClickedPattern = [];
var keyPressed = false;
var level = 0;

if (window.innerWidth <= 576) {
  $("h1").text("");

  $(".btn-play").css("display", "block");
} else {
  $("h1").text("Press A Key to Start");

  $(".btn-play").css("display", "none");
}
$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (!compareArrays()) {
    gameOver();
  }
});
$("body").keypress(function (event) {
  if (keyPressed == false) {
    keyPressed = true;
    nextSequence();
  }
});
$(".btn-play").click(function () {
  keyPressed = true;
  nextSequence();
  $(".btn-play").css("display", "none");
});
function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  randomchosenColor = buttonColors[randomNumber];
  gamePattern.push(randomchosenColor);
  $("#" + gamePattern[gamePattern.length - 1])
    .fadeOut(100)
    .fadeIn(100);
  playSound(gamePattern[gamePattern.length - 1]);
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  // audio.muted=muted;
  audio.play();
}
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100); //removes the class'pressed' after a delay of 100 milliseconds.
}
function gameOver() {
  $("body").addClass("game-over");
  if (window.innerWidth <= 576) {
    $("h1").text("Game Over");
    $(".btn-play").css("display", "block");
  } else $("h1").text("Game Over , Press Any Key To Restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100); //removes the class'pressed' after a delay of 100 milliseconds.
  var gameOver = new Audio("sounds/wrong.mp3");
  gameOver.play();
  level = 0;
  keyPressed = false;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer() {
  if (compareArrays()) {
    return true;
  } else {
    return false;
  }
}

function compareArrays() {
  for (let index = 0; index < userClickedPattern.length; index++) {
    if (userClickedPattern[index] != gamePattern[index]) {
      return false;
      break;
    }
    if (index === level - 1) {
      setTimeout(function () {
        nextSequence();
      }, 500);
    }
  }
  return true;
}
