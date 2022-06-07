var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var runner = {
    x: 100,
    y: 250,
    width: 80,
    height: 80,
    draw() {
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(ghost, this.x, this.y, this.width, this.height);
    },
};

var background = new Image();

var ghost = new Image();
ghost.src = "../images/running_ghost.png";

var pumpkin = new Image();
pumpkin.src = "../images/obs_pumpkin.png";

class Obstacle1 {
    constructor() {
        this.x = window.innerWidth;
        this.y = 265;
        this.height = 60;
        this.width = 60;
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

        isCollide(runnerHitbox1, a);
        isCollide(runnerHitbox2, a);
        isCollide(runnerHitbox3, a);

        a.draw();
    });

    if (jumping == true) {
        runner.y -= 4;
        runnerHitbox1.y -= 4;
        runnerHitbox2.y -= 4;
        runnerHitbox3.y -= 4;
        jumpingTimer++;
    }

    if (jumpingTimer > 36) {
        jumping = false;
        jumpingTimer = 0;
    }

    if (jumping == false) {
        if (runner.y < 250) {
            runner.y += 4;
            runnerHitbox1.y += 4;
            runnerHitbox2.y += 4;
            runnerHitbox3.y += 4;
        }
    }

    runner.draw();
    // runnerHitbox2.draw();
    // runnerHitbox3.draw();
    // runnerHitbox1.draw();
}
//setInterval(run, 10);
run();

var jumping = false;

document.addEventListener("keydown", function (e) {
    if (e.code == "Space") {
        jumping = true;
    }
});

/* 충돌 확인 */
function isCollide(runnerHitbox1, obs1) {
    var xDiff = obs1.x - (runnerHitbox1.x + runnerHitbox1.width);
    var yDiff = obs1.y - (runnerHitbox1.y + runnerHitbox1.height);
    if (xDiff < 0 && yDiff < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}
