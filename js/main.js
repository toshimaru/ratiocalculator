"use strict";

let mode = 'w';
const boxes = ['A', 'B', 'C', 'D'];
const input = document.getElementById('px-input');
const tooltip = new bootstrap.Tooltip(input);

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

$("#px-input").on('change keyup', function() {
	if (this.value === '') {
		tooltip.disable();
		$('.col-md-2 span').text('');
		return;
	};

	var n = parseInt(this.value);

	if (isNaN(n)) {
		tooltip.enable();
		tooltip.show();
	} else if (n < 0) {
		tooltip.enable();
		tooltip.show();
		changeText(n);
	} else {
		tooltip.disable();
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
$('input:radio').change(function () {
	if ($(this).val() === 'w') {
		mode = 'w';
		$("#px-input").attr('placeholder', 'width')
			.trigger('change');
	} else {
		mode = 'h';
		$("#px-input").attr('placeholder', 'height')
			.trigger('change');
	};
});

$(function () {
	tooltip.disable();
});
