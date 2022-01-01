import { Ratio } from './modules/ratio.mjs';

let mode = 'w';
const input = document.getElementById('px-input');
const tooltip = new bootstrap.Tooltip(input);

tooltip.disable();

input.addEventListener('input', (e) => {
	if (e.target.value === '') {
		resetText();
		return;
	}

	const n = parseInt(e.target.value);
	if (n < 0) {
		tooltip.enable();
		tooltip.show();
		changeText(n);
	} else {
		tooltip.disable();
		tooltip.hide();
		changeText(n);
	}
});

function resetText() {
	tooltip.disable();
	tooltip.hide();
	document.querySelectorAll(".px-text").forEach((textEl) => {
		textEl.innerText = '';
	});
}

function changeText(n) {
	const ratio = new Ratio(n, mode);
	const antiMode = (ratio.isWidth) ? 'h' : 'w';
	const boxes = ['sixteenToNine', 'goldenRatio', 'threeToTwo', 'fourToThree'];

	boxes.forEach((box) => {
		const boxText = document.getElementById(`${box}_${mode}`);
		boxText.innerText = n;
		const ratioText = document.getElementById(`${box}_${antiMode}`);
		ratioText.innerText = ratio[box]();
	});
}

// Switch mode
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
	radio.addEventListener('change', (e) => {
		mode = e.target.value;
		input.placeholder = mode === 'w' ? "width" : "height";
		input.dispatchEvent(new Event('input'));
	});
});

if (input.value !== '') {
	input.dispatchEvent(new Event('input'));
}
