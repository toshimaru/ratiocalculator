"use strict";

var mode = 'w';
var boxes = ['A', 'B', 'C', 'D'];

var Ratio = function (num) {
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

$("#px").on('change keyup', function() {
	if (this.value === '') {
		$("#px").tooltip('hide');
		$('.span2 span').text('');
		return;
	};

	var n = parseInt(this.value);

	if (isNaN(n)) {
		$("#px").tooltip('show');
	} else {
		$("#px").tooltip('hide');
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
		$("#px").attr('placeholder', 'width')
		        .trigger('change');
	} else {
		mode = 'h';
		$("#px").attr('placeholder', 'height')
		        .trigger('change');
	};
});

$(function () {
	$("#px").tooltip({'title': 'invalid number!', 'trigger': 'manual', 'placement': 'bottom'});

	var boxFade = function () {
		$(".container div:hidden:first").fadeIn(300, function () {
			boxFade();
		});
	}

	boxFade();
});
