var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; 
var userClickedPattern = []; 
var started = false; 
var level = 0; 


$(document).on("keypress click", function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userClickedPattern = []; 
    level++; 

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour); 

    console.log("Game Pattern:", gamePattern);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColour); 
    $("#level-title").text("Level " + level); 
}

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour); 

    playSound(userChosenColour); 
    checkAnswer(userClickedPattern.length - 1); 
});

function playSound(colour) {
    var audio = new Audio("sounds/" + colour + ".mp3"); 
    audio.play().catch(error => console.log("Audio blocked:", error)); 
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Correct!");

        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        console.log("Wrong choice! Game Over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

         setTimeout(startOver, 1000);

        $("body").css("background-color", "red");
        
         setTimeout(startOver, 1000);

    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    $("body").css("background-color", "#011F3F");
}