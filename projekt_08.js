// Two arrays one for user sequnce and one for the game sequence
let userSeq = [];
let gameSeq = [];
let buttonColors = ["yellow", "green", "red", "purple"];


// Two variables one for game started or not other for the variable
let gameStart = false;
let level = 0;
let maxScore=0;

// Event Listener for the document to start game if any key is pressed
document.addEventListener("keypress", function () {
    if (gameStart == false) {
        console.log("game started");
        gameStart = true;

        levelUp();

    }
});

// function for the level up 
let levelUp = function () {
    userSeq = [];
    level++;

    let h3 = document.querySelector("h3");
    h3.innerText = `Level ${level}`;

    //Choosing random color which is used for random flash of button
    let randomIdx = Math.floor(Math.random() * 3);
    let randomColor = buttonColors[randomIdx];
    let randomButton = document.querySelector(`.${randomColor}`)

    // Adding random color generated in the game sequence
    gameSeq.push(randomColor);
    console.log(gameSeq);

    buttonFlash(randomButton);

}

// function for the button flash
let buttonFlash = function (btn) {
    btn.classList.add("flashButtonClass");
    setTimeout(function () {
        btn.classList.remove("flashButtonClass");
    }, 150);
}

// function for the buttons press
let btnPress = function () {
    let btn = this;
    buttonFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    check(userSeq.length - 1);
}

// accesing all buttons
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


// check function to comapre game sequence and user sequence
let check = function (idx) {
    console.log(`Current Level ${level}`);

    if (userSeq[idx] === gameSeq[idx]) {
        // case 1 -> if we are checking the last index value of game sequence
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 10);
        }
    }

    else {
        let h3 = document.querySelector("h3");

        h3.innerHTML = `Game Over! Your Score was <b>${level}</b> <br>Press any key to start the game`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";

        }, 150);

        maximumScore();

        gameReset();
    }

};

// function for maximum Score
let maximumScore=function(){
    if(level>maxScore){
        maxScore=level;
    }
    let h4=document.querySelector("h4");
    h4.innerHTML=`<b>Maximum Score : ${maxScore}</b>`
}

let gameReset = function () {
    gameStart = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}