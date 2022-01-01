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
  "film",
  "bed",
  "cup",
  "mobile",
  "chocolate",
  "milk",
  "computer",
  "glasses",
  "headphones",
  "sleep",
  "book",
  "lamp",
  "pen",
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
