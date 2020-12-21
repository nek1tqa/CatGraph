'use strict';

function initMathFunc(){

	Math.logb = function(number, base){

		return Math.log(number)/Math.log(base);

	}

	Math.ctan = function(x){

		return 1/Math.tan(x);

	}

	Math.actan = function(x){

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


function initCtx(canvsId, w, h){

	let canvas = document.getElementById(canvsId);
	canvas.width = w;
	canvas.height = h;

	return canvas.getContext('2d');

}

function buttonFunc(str){

	document.getElementById("stringInput").value += str;

}

function strPosReplace(str0, x0, x1, str1){

	return str0.substring(0, x0) + str1 + str0.substring(x1+1, str0.length);

}

function getValueById(id){

	return document.getElementById(id).value;

}

function prepareString(str){

	let functions = [['abs', 'abs'], ['pow', 'pow'], ['sqrt', 'sqrt'], ['cbrt', 'cbrt'], ['sqrtN', 'sqrtN'], 
				 ['sin', 'sin'], ['cos', 'cos'], ['tg', 'tan'], ['ctg', 'ctan'],
				 ['arcsin', 'asin'], ['arccos', 'acos'], ['arctg', 'atan'], ['arcctg', 'actan'],
	 ['log', 'logb'], ['ln', 'log'], ['lg', 'log10']];

	let constants = [['exp', 'E'], ['pi', 'PI']]


	let string = str.toLowerCase();
	string = string.replace(/ /gi, '');
	for(let func of functions){

		let idx = string.indexOf(func[0]);
		while(idx != -1){

			let regExp = new RegExp(`[a-z.]`);
			if(!regExp.test(string.charAt(idx-1))){

				string = strPosReplace(string, idx, idx+func[0].length-1,   'Math.' + func[1]);

			}

			idx = string.indexOf(func[0], idx+5+func[1].length);

		}

	}

	for(let cons of constants){

		let idx = string.indexOf(cons[0]);
		while(idx != -1){

			let regExp = new RegExp(`[a-z]`);
			if(!regExp.test(string.charAt(idx-1))){

				string = strPosReplace(string, idx, idx+cons[0].length-1,   'Math.' + cons[1]);

			}

			idx = string.indexOf(cons[0], idx+5+cons[1].length);

		}

	}

	return string;

}

function solve(preparedString, x){

	return eval(preparedString);

}

function ctxClear(){

	ctx.save();
	ctx.translate(0, -canvasH/2);
	// ctx.fillStyle = "white";
	ctx.clearRect(0, 0, canvasW, canvasH);
	ctx.restore();

}

function gridDraw(xMin, xMax, atp){

	let def = 20, k = -1, cd = 0, delt = 0, i;

	while((def*Math.pow(2, k-1) > b-a) || (def*Math.pow(2, k) < b-a)){

		// console.log(k);
		if(b-a > def*Math.pow(2, k))
			k++;
		else if(b-a < def*Math.pow(2, k-1))
			k--;

	}

	cd = Math.pow(2, k);
	delt = Math.abs(a)%cd;
	console.log(delt);
	// if(a < 0)
	// 	delt = Math.abs(a + delt);
	// else
	// 	delt = a - delt;

	// if(k > 0)
	// 	delt += 1;

	console.log(k);
	ctxClear();
	ctx.save();
	ctx.translate(0, -canvasH/2);
	if((xMin < 0) && (xMax > 0)){

		ctx.fillRect(-atp*xMin-1, 0, 3, canvasH);

	}

	for(i = delt; i < b-a; i += cd){

		console.log(i);
		console.log(-atp*i);
		console.log("");
		ctx.fillRect(atp*i, 0, 1, canvasH);

	}

	ctx.restore();

	for(i = -Math.floor(canvasH/2); i < Math.floor(canvasH/2); i += cd){

		ctx.fillRect(0, atp*i, canvasW-1, 1);

	}
	ctx.fillRect(0, 0, canvasW-1, 3);

}

function drawGraphFast(){

	ctx.beginPath();
	for(let i = 1; i <= def; i++){

		if(!isNaN(arrFunc[i][1])){

			if(isNaN(arrFunc[i-1][1]) || Math.abs(arrFunc[i-1][1] - arrFunc[i][1]) > 1500){

				ctx.moveTo((arrFunc[i][0]-a)*accToPx, -arrFunc[i][1]*accToPx);

			}else{

				lastEl = i;
				ctx.lineTo((arrFunc[i][0]-a)*accToPx, -arrFunc[i][1]*accToPx);

			}

		}

		ctx.stroke();

	}

}

function createGraph(){

	// const divisionVal = 1/10
	// const N = 500;
	let aId = 'aInp';
	let bId = 'bInp';
	let str = getValueById('stringInput');
	str = prepareString(str);
	a = parseFloat(getValueById(aId));
	b = parseFloat(getValueById(bId));

	let max = NaN;
	let min = NaN;
	let maxI = 0;
	let minI = 0;
	// const acc = Math.floor(def/Math.sqrtn(b-a, 4));
	acc = def;
	accToPx = canvasW/(b-a);
	lastEl = 0;

	gridDraw(a, b, accToPx);
	// ctx.fillRect(0, 0, canvasW/acc, 100);
	// console.log(acc);
	// console.log(accToPx);

	if((a != NaN) && (b != NaN)){

		dx = (b-a)/def;
		arrFunc = [];
		let x = a;
		

		arrFunc.push([x, (solve(str, x+dx) - solve(str, x))/dx]);
		x += dx;

		ctx.beginPath();
		ctx.moveTo((arrFunc[0][0]-a)*accToPx, -arrFunc[0][1]*accToPx);

		for(let i = 1; i <= def; i++){

			arrFunc.push([x, (solve(str, x+dx) - solve(str, x))/dx]);

			if(isNaN(max) && !isNaN(arrFunc[i][1])){

				max = arrFunc[i][1];
				maxI = i;

			}
			if(isNaN(min) && !isNaN(arrFunc[i][1])){

				min = arrFunc[i][1];
				minI = i;

			}


			if(arrFunc[i][1] > max){

				max = arrFunc[i][1];
				maxI = i;

			}
			if(arrFunc[i][1] < min){

				min = arrFunc[i][1];
				minI = i;

			}

			x += dx;
			// console.log(arrFunc[i][0]-a);
			// console.log((arrFunc[i][0]-a)*accToPx);
			// console.log('');

		}


		for(let i = 1; i <= acc; i++){

			setTimeout(() => {

				if(!isNaN(arrFunc[i][1])){

					if(isNaN(arrFunc[i-1][1]) || Math.abs(arrFunc[i-1][1] - arrFunc[i][1]) > 1500){

						ctx.moveTo((arrFunc[i][0]-a)*accToPx, -arrFunc[i][1]*accToPx);

					}else{

						lastEl = i;
						ctx.lineTo((arrFunc[i][0]-a)*accToPx, -arrFunc[i][1]*accToPx);

					}

				}

				ctx.stroke();

			}, i*2000/acc)

		}



		// ctx.closePath();
		// ctx.stroke();

		console.log(arrFunc);


	}else{

 		if(a == NaN){

 			alert('ENTER A');

		}

		if(b == NaN){

 			alert('ENTER B');
		
		}

	}
			console.log(max);
			console.log(min);

}

let canvasW = document.documentElement.clientWidth*2/3;
let canvasH = document.documentElement.clientHeight;

let ctx = initCtx('canvas', canvasW, canvasH);
ctx.font = "22px serif";
ctx.translate(0, canvasH/2);
initMathFunc();

let arrFunc = [];
let accToPx = 0;
let acc = 0;
let dx = 0;
let lastEl = 0;
let a = 0;
let b = 0;
const def = 1000;
let fl = false;
// let str = document.getElementById("")
// let x = '4';

// let prStr = prepareString(str);



document.getElementById('canvas').onmousemove = function(){

	if(arrFunc != []){

		let targetCoords = document.getElementById('canvas').getBoundingClientRect();
		let x = event.clientX - targetCoords.left;
		let y = -(event.clientY - targetCoords.top - canvasH/2);
		let n = Math.round(x/(accToPx*dx));

		if(n >= 0 && n <= def){

			// console.log(Math.abs(arrFunc[n][1]*accToPx - y));
			if(Math.abs(arrFunc[n][1]*accToPx - y) <= 15){

				// alert(arrFunc[n][0] + '; ' + arrFunc[n][1]);

				fl = true;
				gridDraw(a, b, accToPx);
				drawGraphFast();
				ctx.fillStyle = "red";
				ctx.beginPath();
				ctx.arc((arrFunc[n][0]-a)*accToPx, -arrFunc[n][1]*accToPx, 5, 0, Math.PI*2, true);
				ctx.fill();
				ctx.fillText(Math.round(arrFunc[n][0]*1000)/1000 + '; ' + Math.round(arrFunc[n][1]*1000)/1000, x+5, -y-10);
				ctx.fillStyle = "black";

			}else{

				if(fl == true){

					fl = false;
					gridDraw(a, b, accToPx);
					drawGraphFast();

				}

			}

		}
		// console.log(x);
		// console.log(y);
		// console.log('');

	}

}
