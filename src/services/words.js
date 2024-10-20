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
  "mustard",
  "Mohawk",
  "pyjamas",
  "ticket",
  "wig",
  "medal",
  "dog",
  "nappie",
  "cookie",
  "tennis",
  "jester",
  "teacher",
  "taxes",
  "comic", 
  "dumpling",
  "mailman",
  "rug",
  "cube",
  "chocolate",
  "note",
  "motel",
  "wallet",
  "brick",
  "hockey",
  "dagger",
  "tatoo",
  "boxer",
  "symbol",
  "medusa",
  "jelly",
  "bread",
  "star",
  "mermaid",
  "lipstick",
   "cupcake",
   "ballet",
   "spray",
   "teeth",
   "bleach",
   "tv reporter",
   "tub",
   "shower",
   "homework",
   "firecraker",
   "pixie",
   "school",
   "goat",
   "apple juice",
   "blender",
   "oven",
   

   
   

]

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
