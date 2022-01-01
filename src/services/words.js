const words = [
  "banana",
  "orange",
  "pear",
  "car",
  "bike",
  "van",
  "house",
  "window",
  "shoes",
];

export default class Words extends EventTarget {
  constructor() {
    super();
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  newWord() {
    return words[this.getRandomInt(words.length)];
  }
}
