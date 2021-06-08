const canvas = document.getElementById("canvas");
const eraser = document.querySelector("#eraser");
var w = window.innerWidth;
var h = window.innerHeight;
var isDrawStart = false;
var isDot = false;
canvas.width = w;
canvas.height = h;
var prevColor = "#000000";
var ctx = canvas.getContext("2d");
var mouse = {
	x: undefined,
	y: undefined,
};
var mouseMovePosition = { ...mouse };
var mouseDownPosition = { ...mouse };
const config = {
	color: "black",
	thickness: 10,
	capStyle: "round",
	shape: "line",
};

document.querySelector(".btnToggle").addEventListener("click", function () {
	document.querySelector(".settings").classList.toggle("hide");
});
function setUpEraser() {
	console.log(prevColor);
	if (eraser.classList.contains("active")) {
		config.color = prevColor;
		eraser.classList.remove("active");
	} else {
		config.color = "#ffffff";
		eraser.classList.add("active");
	}
}
function changeConfig(param1, param2) {
	eraser.classList.remove("active");
	config[param1] = param2;
	if (param2 != "#ffffff" && param2.substr(0, 1) == "#") {
		prevColor = config.color;
	} else {
		config.color = "#000000";
	}
}
function init() {
	canvas.addEventListener(
		"mousemove",
		function (e) {
			mouse.x = e.x;
			mouse.y = e.y;
			if (isDrawStart) {
				if (config.shape == "line") {
					drawLines();
				}
			}
			mouseMovePosition = { ...mouse };
		},
		false
	);
	canvas.addEventListener(
		"mousedown",
		function (e) {
			isDrawStart = true;
			isDot = true;
			mouse.x = e.x;
			mouse.y = e.y;
			if (isDot) {
				if (config.shape == "line") {
					drawLines();
				} else {
					drawOval();
				}
			}
			isDot = false;
		},
		false
	);
	canvas.addEventListener(
		"mouseup",
		function (e) {
			mouseDownPosition.x = e.x;
			mouseDownPosition.y = e.y;
			isDrawStart = false;
			mouseMovePosition.x = e.x;
			mouseMovePosition.y = e.y;
		},
		false
	);
}

function drawLines() {
	ctx.beginPath();
	ctx.lineWidth = 10;
	ctx.moveTo(mouseMovePosition.x, mouseMovePosition.y);
	ctx.lineTo(mouse.x, mouse.y);
	ctx.lineCap = config.capStyle;
	ctx.lineWidth = config.thickness;
	ctx.strokeStyle = config.color;
	ctx.stroke();
	mouseMovePosition = { ...mouse };
}
function drawOval() {
	ctx.beginPath();
	ctx.moveTo(
		mouseDownPosition.x,
		mouseDownPosition.y + (mouse.y - mouseDownPosition.y) / 2
	);
	ctx.bezierCurveTo(
		mouseDownPosition.x,
		mouseDownPosition.y,
		mouse.x,
		mouseDownPosition.y,
		mouse.x,
		mouseDownPosition.y + (mouse.y - mouseDownPosition.y) / 2
	);
	ctx.bezierCurveTo(
		mouse.x,
		mouse.y,
		mouseDownPosition.x,
		mouse.y,
		mouseDownPosition.x,
		mouseDownPosition.y + (mouse.y - mouseDownPosition.y) / 2
	);
	ctx.closePath();
	ctx.stroke();
}

init();
function saveImage() {
	var link = document.createElement("a");
	link.download = "Canvas Drawing.png";
	link.href = canvas.toDataURL();
	link.click();
	link.delete;
}
