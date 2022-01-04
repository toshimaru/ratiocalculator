let mode = 'w';
const input = document.getElementById('px-input');
const tooltip = document.getElementById('px-input-tooltip');

function showTooltip(text = '') {
	tooltip.classList.remove('d-none');
}
function hideTooltip() {
	tooltip.classList.add('d-none');
}

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
	updateRatioText(n);
});

function resetRatioText() {
	hideTooltip();
	document.querySelectorAll(".px-text").forEach((textEl) => {
		textEl.innerText = '';
	});
}

function updateRatioText(n) {
	const boxes = ['sixteenToNine', 'goldenRatio', 'threeToTwo', 'fourToThree'];
	
	import('./modules/ratio.mjs').then((Module) => {
		const ratio = new Module.Ratio(n, mode);
		const antiMode = (ratio.isWidth) ? 'h' : 'w';

		boxes.forEach((box) => {
			const ratioBaseText = document.getElementById(`${box}_${mode}`);
			ratioBaseText.innerText = n;
			const ratioText = document.getElementById(`${box}_${antiMode}`);
			ratioText.innerText = ratio[box]();
		});
	})
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
