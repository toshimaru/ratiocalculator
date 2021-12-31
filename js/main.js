"use strict";

let mode = 'w';
const boxes = ['A', 'B', 'C', 'D'];
const input = document.getElementById('px-input');
const tooltip = new bootstrap.Tooltip(input);

tooltip.disable();

// TODO: convert to a class
const Ratio = function (num) {
	if (!(this instanceof Ratio)) {
		return new Ratio(num);
	};

	this.num = num;

	this.isWidth = (mode === 'w') ? true : false;

	this.sixteenToNine = function () {
		const a = (this.isWidth) ? this.num * 9 / 16 : this.num * 16 / 9;
		return Math.round(a);
	}

	this.fourToThree = function () {
		const a = (this.isWidth) ? this.num * 3 / 4 : this.num * 4 / 3;
		return Math.round(a);
	}

	this.threeToTwo = function () {
		const a = (this.isWidth) ? this.num * 2 / 3 : this.num * 3 / 2;
		return Math.round(a);
	}

	this.goldenRatio = function () {
		const a = (this.isWidth) ? this.num / 1.618: this.num * 1.618;
		return Math.round(a);
	}
}

input.addEventListener('input', (e) => {
	if (e.target.value === '') {
		tooltip.disable();
		tooltip.hide();
		document.querySelectorAll(".px-text").forEach(function(el) {
			el.innerText = '';
		});
		return;
	};

	const n = parseInt(e.target.value);
	if (isNaN(n)) {
		tooltip.enable();
		tooltip.show();
	} else if (n < 0) {
		tooltip.enable();
		tooltip.show();
		changeText(n);
	} else {
		tooltip.disable();
		tooltip.hide();
		changeText(n);
	}
});

function changeText (n) {
	const ratio = new Ratio(n);
	const antiMode = (mode === 'w') ? 'h' : 'w';

	// TODO: rename box IDs
	const fnMap = {
		'A': 'sixteenToNine',
		'B': 'threeToTwo',
		'C': 'fourToThree',
		'D': 'goldenRatio',
	};

	boxes.forEach(function(box) {
		const boxText = document.getElementById(`${box}_${mode}`);
		boxText.innerText = n;
		const ratioText = document.getElementById(`${box}_${antiMode}`);
		ratioText.innerText = ratio[fnMap[box]]();
	});
}

// Change mode
document.querySelectorAll('input[type="radio"]').forEach((radio) =>{
	radio.addEventListener('change', (e) => {
		mode = e.target.value;
		input.placeholder = mode === 'w' ? "width" : "height";
		input.dispatchEvent(new Event('input'));
	});
});
