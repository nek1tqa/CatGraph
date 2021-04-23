'use strict';

function initMathFunc(){

	Math.fact = function(number){

		for(let i = number-1; i >= 1; i--)
			number *= i;
		return number;

	}

	Math.logb = function(number, base){

		return Math.log(number)/Math.log(base);

	}

	Math.tg = function(x){

		return Math.tan(x);

	}

	Math.ctg = function(x){

		return 1/Math.tan(x);

	}

	Math.arcsin = function(x){

		return Math.asin(x);

	}

	Math.arccos = function(x){

		return Math.acos(x);

	}

	Math.arctg = function(x){

		return Math.atan(x);

	}

	Math.arcctg = function(x){

		return Math.PI/2 - Math.atan(x);

	}

	Math.sqrtn = function(x, n){

		let ans = 0;
		if(n%2 == 1){

			if(x > 0){

				return Math.pow(x, 1/n);

			}else{

				return -Math.pow(-x, 1/n);

			}

		}else{

			return Math.pow(x, 1/n);

		}


	}

}

function log(str){

	console.log(str);

}

function drawGrid(ctx, canvasW, canvasH, scale, kScale, oneRectSize, offsetX, offsetY){

// i = [-offsetX*oneRectSize - canvasW/2, 0.5*canvasW - offsetX*oneRectSize]/oneRectSize

// offsetX-canvasW/2/oneRectSize; canvasW/2/oneRectSize-offsetX;


// +offsetY-canvasH/2/oneRectSize; canvasH/2/oneRectSize+offsetY;


	
	ctx.lineWidth = 1;
	ctx.strokeStyle = "black";
	let q = Math.floor(canvasW/2/oneRectSize);
	for(let i = Math.round(-offsetX-canvasW/2/oneRectSize); i <= Math.round(canvasW/2/oneRectSize-offsetX); i++){
		ctx.beginPath();
		ctx.moveTo((i+offsetX)*oneRectSize, canvasH/2+1);
		ctx.lineTo((i+offsetX)*oneRectSize, -canvasH/2-1);
		ctx.stroke();

		ctx.font = 20*Math.sqrt(scale)+"px serif";
		ctx.fillStyle = "black";
		ctx.fillText(i, (i+offsetX)*oneRectSize+2, -offsetY*oneRectSize-2);

	}

	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(-canvasW/2-1, -offsetY*oneRectSize);
	ctx.lineTo(canvasW/2+1, -offsetY*oneRectSize);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(offsetX*oneRectSize, -canvasH/2-1);
	ctx.lineTo(offsetX*oneRectSize, canvasH/2+1);
	ctx.stroke();

	ctx.lineWidth = 1;
	q = Math.floor(canvasH/2/oneRectSize);
	for(let i = Math.round(-offsetY-canvasH/2/oneRectSize); i <= Math.round(canvasH/2/oneRectSize-offsetY); i++){

		ctx.beginPath();
		ctx.moveTo(-canvasW/2-1, -(i+offsetY)*oneRectSize);
		ctx.lineTo(canvasW/2+1, -(i+offsetY)*oneRectSize);
		ctx.stroke();
		if(!i) continue;
		ctx.font = 20*Math.sqrt(scale)+"px serif";
		ctx.fillText(i, offsetX*oneRectSize+2, -(i+offsetY)*oneRectSize-2);

		// ctx.beginPath();
		// ctx.moveTo(-i*oneRectSize, canvasH/2+1);
		// ctx.lineTo(-i*oneRectSize, -canvasH/2-1);
		// ctx.stroke();
		// ctx.closePath();

	}

}




// function drawGrid(ctx, canvasW, canvasH, scale, kScale, oneRectSize, offsetX, offsetY){

// 	ctx.lineWidth = 1;
// 	ctx.strokeStyle = "black";
// 	let q = Math.floor(canvasW/2/oneRectSize);
// 	for(let i = -q; i <= q; i++){

// 		ctx.beginPath();
// 		ctx.moveTo((i+offsetX)*oneRectSize, canvasH/2+1);
// 		ctx.lineTo((i+offsetX)*oneRectSize, -canvasH/2-1);
// 		ctx.stroke();
// 		ctx.closePath();

// 		ctx.font = "20px serif";
// 		ctx.fillText(i, (i+offsetX)*oneRectSize+2, -offsetY*oneRectSize-2);

// 	}

// 	ctx.lineWidth = 2;
// 	ctx.beginPath();
// 	ctx.moveTo(-canvasW/2-1, -offsetY*oneRectSize);
// 	ctx.lineTo(canvasW/2+1, -offsetY*oneRectSize);
// 	ctx.stroke();
// 	ctx.closePath();

// 	ctx.beginPath();
// 	ctx.moveTo(offsetX*oneRectSize, -canvasH/2-1);
// 	ctx.lineTo(offsetX*oneRectSize, canvasH/2+1);
// 	ctx.stroke();
// 	ctx.closePath();

// 	ctx.lineWidth = 1;
// 	q = Math.floor(canvasH/2/oneRectSize);
// 	for(let i = -q; i <= q; i++){

// 		ctx.beginPath();
// 		ctx.moveTo(-canvasW/2-1, -(i-offsetY)*oneRectSize);
// 		ctx.lineTo(canvasW/2+1, -(i-offsetY)*oneRectSize);
// 		ctx.stroke();
// 		ctx.closePath();
// 		if(!i) continue;
// 		ctx.font = "20px serif";
// 		ctx.fillText(i, offsetX*oneRectSize+2, -(i-offsetY)*oneRectSize-2);

// 		// ctx.beginPath();
// 		// ctx.moveTo(-i*oneRectSize, canvasH/2+1);
// 		// ctx.lineTo(-i*oneRectSize, -canvasH/2-1);
// 		// ctx.stroke();
// 		// ctx.closePath();

// 	}

// }



// 5 x * 25 2 ^ + 14 5 ^ / sqrt x 2 ^ *

function convert(str){

	let re = / /gi;
	str = str.replace(re, '');

	let functions = ["abs", "sqrt", "sqrtn", "ln", "log", "sin", "cos", "tg", "ctg", "arccos", "arcsin", "arctg", "arcctg"];
	let division0 = ["!"];
	let division1 = ["^"];
	let division2 = ["*", "/"];
	let division3 = ["+", "-"];


	let tmp = [];
	let tmpType = [];
	let newArr = [];
	let newArrType = [];
	let arr = [];
	let arrType = [];

	let isWord = -1;
	let isNumber = -1;
	let i;
	for(i = 0; i < str.length; i++){

		if(str[i] == "x" || str[i] == "+" || str[i] == "-" || str[i] == "*" || str[i] == "/" ||
		   str[i] == "^" || str[i] == "!" || str[i] == "(" || str[i] == ")" || str[i] == ","){

			if(isWord != -1){

				arr.push(str.substr(isWord, i-isWord));
				arrType.push("func");
				isWord = -1;

			}else if(isNumber != -1){

				arr.push(parseFloat(str.substr(isNumber, i-isNumber)));
				arrType.push("numb");
				isNumber = -1;

			}
			arr.push(str.substr(i, 1));

			if(str[i] == "x")
				arrType.push("variable");
			else
				arrType.push("operator");

		}else if(str[i] >= "0" && str[i] <= "9" || str[i] == "."){

			if(isNumber == -1)
				isNumber = i;

		}else{

			if(isWord == -1)
				isWord = i;		

		}

	}

	if(isWord != -1){

		arr.push(str.substr(isWord, i-isWord));
		arrType.push("func");
		isWord = -1;

	}else if(isNumber != -1){

		arr.push(parseFloat(str.substr(isNumber, i-isNumber)));
		arrType.push("numb");
		isNumber = -1;

	}	


	for(let i = 0; i < arrType.length; i++){


		if(arrType[i] != "numb" && arrType[i] != "variable"){

			// if(tmp.length)
			// 	if(tmpType[tmp.length-1] == "+" || tmpType[tmp.length-1] == "-"){

			// 		while(tmpType[tmp.length-1])

			// 	}
			// tmp.push(arr[i]);
			// tmpType.push(arrType[i]);
			if(division0.includes(arr[i])){

				newArr.push(arr[i]);
				newArrType.push(arrType[i]);

			}else if(arrType[i] == "func" || arr[i] == "("){

				tmp.push(arr[i]);
				tmpType.push(arrType[i]);

			}else if(arr[i] == ")" || arr[i] == ","){

				while(tmp[tmp.length-1] != "("){
					log("q1");
					newArr.push(tmp[tmp.length-1]);
					newArrType.push(tmpType[tmp.length-1]);

					tmp.pop();
					tmpType.pop();

				}

				if(arr[i] == ")"){

					tmp.pop();
					tmpType.pop();
					if(functions.includes(tmp[tmp.length-1])){

						newArr.push(tmp[tmp.length-1]);
						newArrType.push(tmpType[tmp.length-1]);
						tmp.pop();
						tmpType.pop();

					}

				}

			}else if(division1.includes(arr[i])){

				while(division1.includes(tmp[tmp.length-1]) || functions.includes(tmp[tmp.length-1])){

					newArr.push(tmp[tmp.length-1]);
					newArrType.push(tmpType[tmp.length-1]);
					tmp.pop();
					tmpType.pop();

				}
				tmp.push(arr[i]);
				tmpType.push(arrType[i]);

			}else if(division2.includes(arr[i])){

				while(division2.includes(tmp[tmp.length-1]) || division1.includes(tmp[tmp.length-1])){

					log("q2");
					newArr.push(tmp[tmp.length-1]);
					newArrType.push(tmpType[tmp.length-1]);
					tmp.pop();
					tmpType.pop();

				}
				tmp.push(arr[i]);
				tmpType.push(arrType[i]);

			}else if(division3.includes(arr[i])){

				while(division3.includes(tmp[tmp.length-1]) || division2.includes(tmp[tmp.length-1]) || division1.includes(tmp[tmp.length-1])){

					log("q3");
					newArr.push(tmp[tmp.length-1]);
					newArrType.push(tmpType[tmp.length-1]);
					tmp.pop();
					tmpType.pop();

				}
				tmp.push(arr[i]);
				tmpType.push(arrType[i]);

			}

		}else{

			newArr.push(arr[i]);
			newArrType.push(arrType[i]);

		}



	}

	while(tmp.length){

		newArr.push(tmp[tmp.length-1]);
		newArrType.push(tmpType[tmp.length-1]);
		tmp.pop();
		tmpType.pop();

	}

	return newArr;

}

function solveFromBPN(arr, x){

	let stack = [];
	for(let e of arr){

		if(!isNaN(parseFloat(e))){

			stack.push(e);

		}else if(e == "x"){

			stack.push(x);

		}else{

			if(e == "+"){

				let n2 = stack[stack.length-1];
				stack.pop();
				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(n1 + n2);

			}else if(e == "-"){

				let n2 = stack[stack.length-1];
				stack.pop();
				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(n1 - n2);

			}else if(e == "*"){

				let n2 = stack[stack.length-1];
				stack.pop();
				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(n1*n2);

			}else if(e == "/"){

				let n2 = stack[stack.length-1];
				stack.pop();
				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(n1/n2);

			}else if(e == "!"){

				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.fact(n1));

			}else if(e == "^"){

				let n2 = stack[stack.length-1];
				stack.pop();
				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.pow(n1, n2));

			}else if(e == "sqrt"){

				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.sqrt(n1));

			}else if(e == "sqrtn"){

				let n2 = stack[stack.length-1];
				stack.pop();
				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.sqrtn(n1, n2));

			}else if(e == "ln"){

				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.log(n1));

			}else if(e == "log"){

				let n2 = stack[stack.length-1];
				stack.pop();
				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.logb(n1, n2));

			}else if(e == "abs"){

				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.abs(n1));

			}else if(e == "sin"){

				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.sin(n1));

			}else if(e == "cos"){

				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.cos(n1));

			}else if(e == "tg"){

				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.tg(n1));

			}else if(e == "ctg"){

				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.ctg(n1));

			}else if(e == "arcsin"){

				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.arcsin(n1));

			}else if(e == "arccos"){

				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.arccos(n1));

			}else if(e == "arctg"){

				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.arctg(n1));

			}else if(e == "arcctg"){

				let n1 = stack[stack.length-1];
				stack.pop();
				stack.push(Math.arcctg(n1));

			}

		}

	}
	// console.log(stack);
	return stack[0];

}


class Graph{

	constructor(str, color, colorD){

		this.graphFunc = convert(str);
		this.color = color;
		this.colorD = colorD;
		let zn = NaN;

	}

	getData(iLeft, iRight, dx){

		this.zn = [];
		for(let i = iLeft-dx; i <= iRight+dx; i += dx)
			this.zn.push([i, solveFromBPN(this.graphFunc, i)]);
		return [this.zn, this.color];

	}

	getDiffData(dx){

		let znD = [];
		for(let i = 1; i < this.zn.length; i++)
			znD.push([this.zn[i][0], (this.zn[i][1] - this.zn[i-1][1])/dx]);
		return [znD, this.colorD];

	}

}

function drawGraph(cnv, ctx, data, offsetX, offsetY, oneRectSize, dx){


	ctx.lineWidth = 2.5;
	ctx.strokeStyle = data[1];
	let w = cnv.width/oneRectSize/2;
	let fl = true;
	ctx.beginPath();

	let i = 0;
	while(isNaN(data[0][i][1]))
		i++;
	ctx.moveTo((data[0][i][0]+offsetX)*oneRectSize, -(data[0][i][1]+offsetY)*oneRectSize);
	i++;
	for(i; i < data[0].length; i++){

		if(isNaN(data[0][i][1]) && fl){

			// let qw = (data[0][i-1][1] - data[0][i-2][1])/dx;
			// console.log("========" + qw);
			// if(qw > 0)
			// 	ctx.lineTo((data[0][i][0]+offsetX)*oneRectSize, -cnv.height/2-1);
			// else
			// 	ctx.lineTo((data[0][i][0]+offsetX)*oneRectSize, +cnv.height/2+1);

			ctx.stroke();
			fl = false;
			continue;


		}else if(!isNaN(data[0][i][1]) && !fl){

			fl = true;
			ctx.beginPath();
			ctx.moveTo((data[0][i][0]+offsetX)*oneRectSize, -(data[0][i][1]+offsetY)*oneRectSize);

		}else if(!isNaN(data[0][i][1]) && fl){

			ctx.lineTo((data[0][i][0]+offsetX)*oneRectSize, -(data[0][i][1]+offsetY)*oneRectSize);

		}



	}
	ctx.stroke();

}

function clearCtx(cnv, ctx){

	ctx.fillStyle = "white";
	ctx.fillRect(-1, -1, cnv.width+1, cnv.height+1);

}

function updateCtx(ctx, cnv, graphFuncArr, w, offsetX, offsetY, oneRectSize, dx){

	clearCtx(cnv, ctx);
	ctx.translate(cnv.width/2, cnv.height/2);
	drawGrid(ctx, cnv.width, cnv.height, scale, kScale, oneRectSize, offsetX, offsetY);

	for(let e of graphFuncArr){

		drawGraph(cnv, ctx, e, offsetX, offsetY, oneRectSize, dx);

	}

	ctx.translate(-cnv.width/2, -cnv.height/2);

}

function update(ctx, cnv, func, w, offsetX, offsetY, oneRectSize, dx){

	gfa = [];
	gfa.push(func.getData(-w-offsetX, w-offsetX, dx));
	gfa.push(func.getDiffData(dx));
	updateCtx(ctx, cnv, gfa, w, offsetX, offsetY, oneRectSize, dx);

}


const idName = "cnv";
let cnv = document.getElementById(idName);
cnv.height = window.innerHeight;
cnv.width = window.innerWidth;
let ctx = cnv.getContext("2d");



initMathFunc();

let scale = 1;
let kScale = 10/scale;

let graphLineWidth = 40/kScale;
let oneRectSize = cnv.height/kScale;
let offsetX = 0;
let offsetY = 0;
let w = cnv.width/oneRectSize/2;
let dx = 1/500/scale;
let gfa = [];


let graph1 = new Graph("x^2", "red", "blue");
update(ctx, cnv, graph1, w, offsetX, offsetY, oneRectSize, dx);

// ctx.strokeStyle = "red";
// ctx.lineWidth = graphLineWidth;
// for(let i = -w-offsetX; i <= w+offsetX; i += dx){

// 	if(zn.length){

// 		ctx.beginPath();
// 		ctx.moveTo((zn[zn.length-1][0]+offsetX)*oneRectSize, -(zn[zn.length-1][1]+offsetY)*oneRectSize);

// 	}
// 	zn.push([i, solveFromBPN(ca, i)]);
// 	if(isNaN(zn[zn.length-1][1]))
// 		continue;

// 	if(zn.length >= 2){

// 		ctx.lineTo((zn[zn.length-1][0]+offsetX)*oneRectSize, -(zn[zn.length-1][1]+offsetY)*oneRectSize);
// 		ctx.stroke();
// 		ctx.closePath();
// 		znD.push([zn[zn.length-1][0], (zn[zn.length-1][1] - zn[zn.length-2][1])/dx])

// 	}

// }

// ctx.strokeStyle = "green";
// for(let i = 1; i < znD.length; i++){

// 	ctx.beginPath();
// 	ctx.moveTo((znD[i-1][0]+offsetX)*oneRectSize, (-znD[i-1][1]-offsetY)*oneRectSize);

// 	if(isNaN(znD[i-1][1]))
// 		continue;

// 	ctx.lineTo((znD[i][0]+offsetX)*oneRectSize, (-znD[i][1]-offsetY)*oneRectSize);
// 	ctx.stroke();
// 	ctx.closePath();


// }
// console.log(znD)
// // сновные принципы оздоровительно-тренировочных занятий


// let graph1 = new Graph("sin(x)", "red", "blue");






let md = false;
let lastMouseCoords = [0, 0];


cnv.addEventListener("mousedown", function(event){

	md = true;
	lastMouseCoords[0] = event.clientX;
	lastMouseCoords[1] = event.clientY;

});


cnv.addEventListener("mouseup", function(event){

	md = false;
	lastMouseCoords[0] = 0;
	lastMouseCoords[1] = 0;

});

cnv.addEventListener("mousemove", function(event){

	if(md){

		offsetX += (event.clientX - lastMouseCoords[0])/oneRectSize;
		offsetY -= (event.clientY - lastMouseCoords[1])/oneRectSize;
		lastMouseCoords[0] = event.clientX;
		lastMouseCoords[1] = event.clientY;
		update(ctx, cnv, graph1, w, offsetX, offsetY, oneRectSize, dx);

	}else{

		// if()

	}

});

cnv.addEventListener("mousewheel", function(event){

	let kMax = 1.25;
	let kMin = 1;

	let dy = Math.abs(event.deltaY);

	if(dy > 100)
		dy = 100;
	dy /= 100;
	let k = kMin + dy*(kMax-kMin);

	if(!md){

		if(event.deltaY > 0)
			k = 1/k;

		scale *= k;
		// offsetX *= k;
		// offsetY *= k;


		kScale = 10/scale;

		oneRectSize = cnv.height/kScale;
		w = cnv.width/oneRectSize/2;
		dx = 1/500/scale;
		update(ctx, cnv, graph1, w, offsetX, offsetY, oneRectSize, dx);


	}

});

let menu = document.getElementById("bl");
let menuD = false;
let lmcm = [0, 0];
let menuCoords = [100, 100];



menu.style.right = menuCoords[0] + "px";
menu.style.bottom = menuCoords[1] + "px";







menu.addEventListener("mousedown", function(event){

	if(document.elementFromPoint(event.clientX, event.clientY) == menu){

		menuD = true;
		lmcm[0] = event.clientX;
		lmcm[1] = event.clientY;

	}

});


menu.addEventListener("mouseup", function(event){

	menuD = false;
	lmcm[0] = 0;
	lmcm[1] = 0;

});

document.addEventListener("mousemove", function(event){

	if(menuD){

		menuCoords[0] -= event.clientX - lmcm[0];
		menuCoords[1] -= event.clientY - lmcm[1];
		menu.style.right = menuCoords[0] + "px";
		menu.style.bottom = menuCoords[1] + "px";

		lmcm[0] = event.clientX;
		lmcm[1] = event.clientY;

	}else{

		// if()

	}

});

function setFunc(){

	let str = document.getElementById("f").value;
	graph1 = new Graph(str, "red", "blue");

	update(ctx, cnv, graph1, w, offsetX, offsetY, oneRectSize, dx);

}