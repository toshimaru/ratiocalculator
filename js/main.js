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
		$('.col-md-2 span').text('');
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
	boxes.forEach(function (box) {
		$(`#${box}_${mode}`).text(n);
	})

	const ratio = new Ratio(n);
	const antimode = (mode === 'w') ? 'h' : 'w';
	$("#A_" + antimode).text(ratio.sixteenToNine());
	$("#B_" + antimode).text(ratio.threeToTwo());
	$("#C_" + antimode).text(ratio.fourToThree());
	$("#D_" + antimode).text(ratio.goldenRatio());
}

// Change mode
document.querySelectorAll('input[type="radio"]').forEach((radio) =>{
	radio.addEventListener('change', (e) => {
		mode = e.target.value;
		input.placeholder = mode === 'w' ? "width" : "height";
		input.dispatchEvent(new Event('input'));
	});
});
