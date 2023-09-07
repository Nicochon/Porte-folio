const canvasCreation = document.querySelector(".container-canvas");
let canvasElement = document.createElement("canvas");
let context = canvasElement.getContext("2d");
canvasCreation.appendChild(canvasElement);
canvasSize();
let score = 0

const stomachPicture = document.querySelector(".stomach-snake");
let ulElement = document.createElement("ul");
let liElement = document.createElement("li");
stomachPicture.appendChild(ulElement);
ulElement.appendChild(liElement);

const displayScoreElement = document.querySelector(".display-score")
let scoreTitle = document.createElement("h2");
scoreTitle.innerHTML = "Score :"
displayScoreElement.appendChild(scoreTitle)

document.getElementById("rejouer").addEventListener("click", function() {
    window.location.reload();
});

const competenceHover = document.getElementById("competences")
function handleArrowKeys(event) {
    event.preventDefault(); // Empêche le comportement par défaut des touches fléchées
    direction(event); // Appel de votre fonction direction
}
competenceHover.addEventListener("mouseenter", function(event){
    document.addEventListener("keydown", handleArrowKeys);
});

competenceHover.addEventListener("mouseleave", function(event){
    document.removeEventListener("keydown", handleArrowKeys);
});

let btnHigh = document.querySelector(".high");
let btnLeft = document.querySelector(".left");
let btnDown = document.querySelector(".down");
let btnRight = document.querySelector(".right");


btnHigh.addEventListener("click", function() {
    if( d != "down"){
        d = "UP";
    }
});
btnLeft.addEventListener("click", function() {
    if( d != "RIGHT"){
        d = "LEFT";
    }
});
btnDown.addEventListener("click", function() {
    if( d != "UP"){
        d = "DOWN"
    }
});
btnRight.addEventListener("click", function() {
    if( d != "LEFT"){
        d = "RIGHT"
    }
});


let images = [
    `../src/image/logo-competences/agile.png`,
    `../src/image/logo-competences/Bootstra.png`,
    `../src/image/logo-competences/css.png`,
    `../src/image/logo-competences/express.png`,
    `../src/image/logo-competences/git.png`,
    `../src/image/logo-competences/github.png`,
    `../src/image/logo-competences/gulp.png`,
    `../src/image/logo-competences/html.png`,
    `../src/image/logo-competences/Js.png`,
    `../src/image/logo-competences/mongodb.png`,
    `../src/image/logo-competences/nodejs.png`,
    `../src/image/logo-competences/react.png`,
    `../src/image/logo-competences/rest-api.png`,
    `../src/image/logo-competences/sass.png`,
];

const foodImage = []
images.forEach(url => {
    const image = new Image();
    image.src = url;
    foodImage.push(image);
});


let d
let isPaused = false;
let pauseTriggered = false;
document.addEventListener("keydown", direction);
function direction(event){
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT"){  //si on appui pour aller a gauche
        d ="LEFT";
    }else if (key == 38 && d != "down"){
        d = "UP"
    }else if (key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if (key == 40 && d != "UP"){
        d = "DOWN";
    }
}

let box = 0
let snake = [];
let food
function mapGame (){
    if (canvasElement.width == 800){
        box = 40;
        snake [0] = {x: 10*box, y: 7*box};
        food = {
            x: Math.floor(Math.random() * 19+1) * box,
            y: Math.floor(Math.random() * 13+1) * box,
        }
    }if (canvasElement.width == 350){
        box = 25;
        snake [0] = {x: 6*box, y: 8*box};
        food = {
            x: Math.floor(Math.random() * 13+1) * box,
            y: Math.floor(Math.random() * 15+1) * box,
        }
    }
}
mapGame()

function draw(){
    if (isPaused === false) {
        if(canvasElement.width == 800){
            context.clearRect(0,0,800,560)
        }if(canvasElement.width == 350){
            context.clearRect(0,0,350,400)
        }
        for (let i = 0; i < snake.length; i++) {
            if (i === 0) {
                context.fillStyle = "#6F1A07";
                context.fillRect(snake[i].x, snake[i].y, box, box);
            } else {
                if (score >= foodImage.length) {
                    context.fillStyle = "#2B2118";
                    context.fillRect(snake[i].x, snake[i].y, box, box);
                } else {
                    context.drawImage(foodImage[score - 1], snake[i].x, snake[i].y, box, box);
                }
            }
        }
        if (score >= foodImage.length) {
            context.fillStyle = "#2B2118";
            context.fillRect(food.x, food.y, box, box);
        } else {
            context.drawImage(foodImage[score], food.x , food.y , box, box);
        }

        let snakeX = snake[0].x
        let snakeY = snake[0].y

        if(d== "LEFT") snakeX -= box;
        if(d == "UP") snakeY -= box;
        if (d == "RIGHT") snakeX += box;
        if (d == "DOWN") snakeY += box;

        if (snakeX == food.x && snakeY == food.y){
            score++;
            scoreTitle.innerHTML = "Score :" + " " +score
            if (score-1 < images.length){
                let imageElement = document.createElement("img");
                liElement.appendChild(imageElement);
                imageElement.src = images[score - 1];
            }
            if(canvasElement.width == 800){
                food = {
                    x: Math.floor(Math.random() * 19 + 1) * box,
                    y: Math.floor(Math.random() * 13 + 1) * box
                }
            }if(canvasElement.width == 350){
                food = {
                    x: Math.floor(Math.random() * 13 + 1) * box,
                    y: Math.floor(Math.random() * 15 + 1) * box
                }
            }

        }else{
            snake.pop();
        };

        let newHead = {
            x: snakeX,
            y: snakeY
        }
        if(canvasElement.width == 800){
            if(snakeX < 0 || snakeY < 0 || snakeX > 20*box || snakeY > 14*box || collision(newHead, snake)){
                clearInterval(game);
                document.getElementById("loose").style.display = "block";
                document.getElementById("try-again").addEventListener("click", function() {
                    window.location.reload();
                });
                document.getElementById("stop").addEventListener("click", function() {
                    document.getElementById("loose").style.display = "none";
                });
            }
        }if(canvasElement.width == 350){
            if(snakeX < 0 || snakeY < 0 || snakeX > 14*box || snakeY > 15*box || collision(newHead, snake)){
                clearInterval(game);
                document.getElementById("loose").style.display = "block";
                document.getElementById("try-again").addEventListener("click", function() {
                    window.location.reload();
                });
                document.getElementById("stop").addEventListener("click", function() {
                    document.getElementById("loose").style.display = "none";
                });
            }
        };

        snake.unshift(newHead)

        // context.fillStyle = "#2B2118"
        // context.font = "30px arial"
        // context.fillText(score, 2*box, 1.6*box)

        if (score === 1 && !pauseTriggered) {
            isPaused = true;
            pauseTriggered = true;
            if (isPaused == true && pauseTriggered == true){
                document.getElementById("myModal").style.display = "block";
                document.getElementById("resumeButton").addEventListener("click", function() {
                    isPaused = false;
                    document.getElementById("myModal").style.display = "none";
                });
                document.addEventListener("keydown", function(event) {
                    if (event.keyCode == 16) {
                        isPaused = false;
                        document.getElementById("myModal").style.display = "none";
                    }
                });
            }
        }

    }
}

let game
function speedlevel(){
    if (canvasElement.width == 800){
        game = setInterval(draw, 100)
    }if (canvasElement.width == 350){
        game = setInterval(draw, 150)
    }
};

speedlevel();


function collision(head, array){
    for(let g = 0; g < array.length; g++){
        if(head.x == array[g].x && head.y == array[g].y){
            return true
        }
    }
    return false
}

function canvasSize(){
    if (window.innerWidth > 1300){
        canvasElement.width = 800;
        canvasElement.height = 560;
    }if (window.innerWidth <= 1300){
        canvasElement.width = 750;
        canvasElement.height = 500;
    }if (window.innerWidth < 800) {
        canvasElement.width = 350;
        canvasElement.height = 400;
    }
}

