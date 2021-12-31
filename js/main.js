"use strict";

let mode = 'w';
const boxes = ['A', 'B', 'C', 'D'];
const input = document.getElementById('px-input');
const tooltip = new bootstrap.Tooltip(input);

const Ratio = function (num) {
	if (!(this instanceof Ratio)) {
		return new Ratio(num);
	};

	this.num = num;

	this.isWidth = (mode === 'w') ? true : false;

	this.sixteenToNine = function () {
		var a = (this.isWidth) ? this.num * 9 / 16 : this.num * 16 / 9;
		return Math.round(a);
	}

	this.fourToThree = function () {
		var a = (this.isWidth) ? this.num * 3 / 4 : this.num * 4 / 3;
		return Math.round(a);
	}

	this.threeToTwo = function () {
		var a = (this.isWidth) ? this.num * 2 / 3 : this.num * 3 / 2;
		return Math.round(a);
	}

	this.goldenRatio = function () {
		var a = (this.isWidth) ? this.num / 1.618: this.num * 1.618;
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
	var ratio = new Ratio(n);

	$.each(boxes, function(i, val){
		$('#' + val + '_' + mode).text(n);
	});

	var antimode = (mode === 'w') ? 'h' : 'w';
	$("#A_" + antimode).text(ratio.sixteenToNine());
	$("#B_" + antimode).text(ratio.threeToTwo());
	$("#C_" + antimode).text(ratio.fourToThree());
	$("#D_" + antimode).text(ratio.goldenRatio());
}

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

	var boxFade = function () {
		$(".container div:hidden:first").fadeIn(300, function () {
			boxFade();
		});
	}

	boxFade();
});
