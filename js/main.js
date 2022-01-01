import { Ratio } from './modules/ratio.mjs';

let mode = 'w';
const boxes = ['sixteenToNine', 'goldenRatio', 'threeToTwo', 'fourToThree'];
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
	const antiMode = (ratio.isWidth) ? 'h' : 'w';

	boxes.forEach(function(box) {
		const boxText = document.getElementById(`${box}_${mode}`);
		boxText.innerText = n;
		const ratioText = document.getElementById(`${box}_${antiMode}`);
		ratioText.innerText = ratio[box]();
	});
}

// Switch mode
document.querySelectorAll('input[type="radio"]').forEach((radio) =>{
	radio.addEventListener('change', (e) => {
		mode = e.target.value;
		input.placeholder = mode === 'w' ? "width" : "height";
		input.dispatchEvent(new Event('input'));
	});
});
