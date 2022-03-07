export class RatioCalcurator {
  constructor(width_or_height, mode) {
    this.width_or_height = width_or_height;
    this.mode = mode;
  }

  get isWidth() {
    return this.mode === 'w';
  }

  sixteenToNine() {
    const n = (this.isWidth) ? this.width_or_height * 9 / 16 : this.width_or_height * 16 / 9;
    return Math.round(n);
  }

  fourToThree() {
    const n = (this.isWidth) ? this.width_or_height * 3 / 4 : this.width_or_height * 4 / 3;
    return Math.round(n);
  }

  threeToTwo() {
    const n = (this.isWidth) ? this.width_or_height * 2 / 3 : this.width_or_height * 3 / 2;
    return Math.round(n);
  }

  goldenRatio() {
    const n = (this.isWidth) ? this.width_or_height / 1.618: this.width_or_height * 1.618;
    return Math.round(n);
  }
}
