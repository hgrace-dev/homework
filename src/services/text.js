const SpeechSynthesis = window.speechSynthesis;

export default class TextService extends EventTarget {
  constructor() {
    super();

    this.synthesis = SpeechSynthesis;
  }

  speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    // utterance.rate = 0.8;
    // utterance.pitch = 1;
    utterance.onend = () => {
      this.dispatchEvent(this.createEndEvent());
    };
    this.synthesis.speak(utterance);
  }

  createEndEvent() {
    return new CustomEvent("end");
  }
}
