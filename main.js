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
        // ctx.beginPath();
        // ctx.moveTo(98, 318); // Move pen to bottom-left corner
        // ctx.lineTo(120, 200); // Line to top corner
        // ctx.closePath(); // Line to bottom-left corner
        // ctx.stroke();
        ctx.drawImage(ghost, this.x, this.y, this.width, this.height);
    },
};

var runnerHitbox = {
    x: 100,
    y: 250,
    color: "red",
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(98, 318); // Move pen to bottom-left corner
        ctx.lineTo(115, 290); // Line to top corner
        ctx.lineTo(126, 260); // Line to top corner
        ctx.lineTo(140, 250); // Line to top corner
        ctx.lineTo(150, 248); // Line to top corner
        ctx.lineTo(150, 248); // Line to top corner
        ctx.lineTo(160, 248); // Line to top corner
        ctx.lineTo(176, 263); // Line to top corner
        ctx.lineTo(180, 283); // Line to top corner
        ctx.lineTo(173, 303); // Line to top corner
        ctx.lineTo(163, 323); // Line to top corner
        ctx.lineTo(139, 331); // Line to top corner
        //ctx.lineTo(119, 331); // Line to top corner
        ctx.closePath(); // Line to bottom-left corner
        ctx.stroke();
        ctx.fillStyel = this.color;
        ctx.fill();
    },
};

var background = new Image();

var ghost = new Image();
ghost.src = "../images/running_ghost.png";

var pumpkin = new Image();
pumpkin.src = "../images/obs_pumpkin.png";

runner.draw();
runnerHitbox.draw();

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

        isCollide(runnerHitbox, a);

        a.draw();
    });

    if (jumping == true) {
        runner.y -= 4;
        runnerHitbox.y -= 4;
        jumpingTimer++;
    }

    if (jumpingTimer > 36) {
        jumping = false;
        jumpingTimer = 0;
    }

    if (jumping == false) {
        if (runner.y < 250) {
            runner.y += 4;
        }
        if (runnerHitbox.y < 250) {
            runnerHitbox.y += 4;
        }
    }

    runnerHitbox.draw();
    runner.draw();
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
function isCollide(runnerHitbox, obs1) {
    var xDiff = obs1.x - (runnerHitbox.x + runnerHitbox.width);
    var yDiff = obs1.y - (runnerHitbox.y + runnerHitbox.height);
    if (xDiff < 0 && yDiff < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}
