export class Ratio {
  constructor(height_or_width, mode) {
    this.height_or_width = height_or_width;
    this.mode = mode;
  }

  get isWidth() {
    return this.mode === 'w';
  }

  sixteenToNine() {
    const n = (this.isWidth) ? this.height_or_width * 9 / 16 : this.height_or_width * 16 / 9;
    return Math.round(n);
  }

  fourToThree() {
    const n = (this.isWidth) ? this.height_or_width * 3 / 4 : this.height_or_width * 4 / 3;
    return Math.round(n);
  }

  threeToTwo() {
    const n = (this.isWidth) ? this.height_or_width * 2 / 3 : this.height_or_width * 3 / 2;
    return Math.round(n);
  }

  goldenRatio() {
    const n = (this.isWidth) ? this.height_or_width / 1.618: this.height_or_width * 1.618;
    return Math.round(n);
  }
}
