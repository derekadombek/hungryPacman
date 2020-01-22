"use strict"

//the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 820;
canvas.height = 800;
document.body.appendChild(canvas);

// background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.className = "canvas"

//pacman image
var pacReady = false;
var pacImage = new Image();
pacImage.onload = function () {
	pacReady = true;
};
pacImage.src = "pacman.png";

//cherry image
var cherryReady = false;
var cherryImage = new Image();
cherryImage.onload = function () {
	cherryReady = true;
};
cherryImage.src = "cherry.png";

// objects
var pacman = {
	speed: 256 // movement in pixels per second
};
var cherry = {};
var cherryCaught = 0;

// keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// reset the game when pac eats cherry
var reset = function () {
	
	pacman.x = 32 + (Math.random() * (canvas.width - 64));
	pacman.y = 32 + (Math.random() * (canvas.height - 400));

	// place cherry rendomly on canvas
	cherry.x = 32 + (Math.random() * (canvas.width - 64));
	cherry.y = 32 + (Math.random() * (canvas.height - 400));
};

//key controls
var update = function (modifier) {
	if (38 in keysDown) { // hold up
		pacman.y -= pacman.speed * modifier;
	}
	if (40 in keysDown) { //hold down
		pacman.y += pacman.speed * modifier;
	}
	if (37 in keysDown) { //  hold left
		pacman.x -= pacman.speed * modifier;
	}
	if (39 in keysDown) { //hold right
		pacman.x += pacman.speed * modifier;
	}

	//pacman and cherry touching?
	if (
		pacman.x <= (cherry.x + 32)
		&& cherry.x <= (pacman.x + 32)
		&& pacman.y <= (cherry.y + 32)
		&& cherry.y <= (pacman.y + 32)
	) {
		++cherryCaught;
		reset();
	}
};

// rendern everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (pacReady) {
		ctx.drawImage(pacImage, pacman.x, pacman.y);
	}

	if (cherryReady) {
		ctx.drawImage(cherryImage, cherry.x, cherry.y);
	}
	// Score styles
	ctx.fillStyle = "black";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "bottom";
	ctx.fillText("Cherries: " + cherryCaught, 10, 50);
	ctx.fillText("Instructions:", 10, 700);
	ctx.fillText("-up and down", 10, 725);
	ctx.fillText("-side to side", 10, 745);
	ctx.fillText("-any diagonal", 10, 765);
	ctx.fillText("-eat as many cherries as you can!", 10, 785);
};

//main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// request to do this again
	requestAnimationFrame(main);
};


var then = Date.now();
reset();
main();



/*window.onload = function() {
	var x=400;
	var y=350;
	var key;
	var canvas = document.getElementById("gameCanvas");
	var ctx = canvas.getContext("2d");
	var pac = new Image();
	var ft = new Image();


	pac.onload = function() {
		var x1 = Math.floor( Math.random() * x );
		var y1 = Math.floor( Math.random() * y );
	  ctx.drawImage(pac, x1, y1);
	}
	pac.src = "pacman.png";

	ft.onload = function() {
		var x1 = Math.floor( Math.random() * x );
		var y1 = Math.floor( Math.random() * y );
	  ctx.drawImage(ft, x1, y1);
	}
	ft.src = "cherry.png";


	document.onkeydown = function(e) {
	  pos = 1;
	  key = window.event?e.keyCode:e.which;
	}
	document.onkeyup = function(e) {
		pos = 0;
	}
	setInterval(function() {
	  if (pos == 0) return;
	  if (key == 37) x -= 2;
	  if (key == 38) y -= 2;
	  if (key == 39) x += 2;
	  if (key == 40) y += 2;
		canvas.width = canvas.width;
	  ctx.drawImage(pac, x, y);


	});
}


*/