import { Ratio } from './modules/ratio.mjs';

let mode = 'w';
const boxes = ['A', 'B', 'C', 'D'];
const input = document.getElementById('px-input');
const tooltip = new bootstrap.Tooltip(input);

tooltip.disable();

input.addEventListener('input', (e) => {
	if (e.target.value === '') {
		tooltip.disable();
		tooltip.hide();
		document.querySelectorAll(".px-text").forEach(function(el) {
			el.innerText = '';
		});
		return;
	}

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
	const ratio = new Ratio(n, mode);
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
