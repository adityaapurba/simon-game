var buttonSequence=["red","blue","green","yellow"];
var gamepattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
$(document).keydown(function (){
    if(!started){
    nextsequence();
    }
    started=true;
});

$(".btn").on("click",function(event){
    var buttonClicked=this.id;
    userClickedPattern.push(buttonClicked);
    console.log(userClickedPattern);
    playsound(buttonClicked);
    $("."+buttonClicked).addClass("pressed");
    setTimeout(function(){
        $("."+buttonClicked).removeClass("pressed");
    },100);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(check){
    if(userClickedPattern[check]===gamepattern[check]){
            console.log("sucess");
        
        if(userClickedPattern.length===gamepattern.length){
            setTimeout(function(){
                nextsequence();
            },1000)
        }
    }
    else{
        console.log("wrong");
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        gameOver();
    }
}


function nextsequence(){
    level++;
    userClickedPattern=[];
    $("h1").text("Level  "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonSequence[randomNumber];
    gamepattern.push(randomChosenColour);
    $("."+randomChosenColour).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
    
    
}

function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function gameOver(){
    started=false;
    level=0;
    gamepattern=[];
}


