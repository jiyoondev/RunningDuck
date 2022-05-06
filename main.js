var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var runner = {
    x: 100,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.drawImage(ghost, this.x, this.y, this.width, this.height);
    },
};

var ghost = new Image();
ghost.src = "../images/running_ghost.png";

var pumpkin = new Image();
pumpkin.src = "../images/obs_pumpkin.png";

runner.draw();

class Obstacle1 {
    constructor() {
        this.x = window.innerWidth;
        this.y = 200;
        this.height = 50;
        this.width = 50;
    }
    draw() {
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(pumpkin, this.x, this.y, this.width, this.height);
    }
}

var obs1 = new Obstacle1();
obs1.draw();
var timer = 0;
var obstacles = [];
var jumpingTimer = 0;
var animation;

function run() {
    animation = requestAnimationFrame(run);
    timer++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (timer % (50 + Math.floor(Math.random() * 200)) === 0) {
        var obs1 = new Obstacle1();
        obstacles.push(obs1);
        obs1.draw();
    }
    obstacles.forEach((a, i, o) => {
        if (a.x < 0) {
            o.splice(i, 1);
        }
        a.x -= 4;

        isCollide(runner, a);

        a.draw();
    });

    if (jumping == true) {
        runner.y -= 4;
        jumpingTimer++;
    }

    if (jumpingTimer > 36) {
        jumping = false;
        jumpingTimer = 0;
    }

    if (jumping == false) {
        if (runner.y < 200) {
            runner.y += 4;
        }
    }

    runner.draw();
}

run();

var jumping = false;

document.addEventListener("keydown", function (e) {
    if (e.code == "Space") {
        jumping = true;
    }
});

/* 충돌 확인 */
function isCollide(runner, obs1) {
    var xDiff = obs1.x - (runner.x + runner.width);
    var yDiff = obs1.y - (runner.y + runner.height);
    if (xDiff < 0 && yDiff < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}
