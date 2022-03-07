export default class RatioTextUpdator {
	update(width_or_height, mode) {
		import('./ratioCalcurator.mjs').then((Module) => {
			const ratio = new Module.RatioCalcurator(width_or_height, mode);
			const antiMode = (ratio.isWidth) ? 'h' : 'w';

			this.constructor.#boxes.forEach((box) => {
				const ratioBaseText = document.getElementById(`${box}_${mode}`);
				ratioBaseText.innerText = width_or_height;
				this.flashBackground(ratioBaseText);

				const ratioText = document.getElementById(`${box}_${antiMode}`);
				ratioText.innerText = ratio[box]();
				this.flashBackground(ratioText);
			});
		})
	}

	flashBackground(el) {
		if (el.classList.contains(this.constructor.#className)) {
			el.style.animation = 'none';
			el.offsetWidth;
			el.style.animation = null;
		} else {
			el.classList.add(this.constructor.#className);
		}
	}

	static #boxes = ['sixteenToNine', 'goldenRatio', 'threeToTwo', 'fourToThree'];
	static #className = 'flash-bg'
}
