import RatioTextUpdator from './modules/ratioTextUpdator.mjs';

let mode = 'w';
const input = document.getElementById('px-input');
const tooltip = document.getElementById('px-input-tooltip');
const updator = new RatioTextUpdator();

function showTooltip(text = '') {
	tooltip.classList.remove('d-none');
}
function hideTooltip() {
	tooltip.classList.add('d-none');
}

// TODO: Block invalid input
// input.addEventListener('keydown', (e) => {
// });

input.addEventListener('input', (e) => {
	if (e.target.value === '') {
		resetRatioText();
		return;
	}

	const n = parseInt(e.target.value);
	if (n < 0) {
		showTooltip();
	} else {
		hideTooltip();
	}
	updator.update(n, mode);
});

function resetRatioText() {
	hideTooltip();
	document.querySelectorAll(".px-text").forEach((textEl) => {
		textEl.innerText = '';
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
