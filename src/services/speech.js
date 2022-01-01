const SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;

export default class SpeechService extends EventTarget {
  constructor() {
    super();
    this.recognition = new SpeechRecognition();
    this.started = false;
    this.result = "created";
    this.recognition.lang = "en-EN";
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event) => {
      const last = event.results.length - 1;
      this.result = event.results[last][0].transcript;

      console.log(`Confidence: ${event.results[0][0].confidence}`, this.result);
      this.dispatchEvent(this.createResultEvent(this.result));
    };

    this.recognition.onspeechend = () => {
      this.started = false;
      this.recognition.stop();
      this.dispatchEvent(this.createStopEvent());
    };
  }

  start() {
    if (!this.started) this.recognition.start();
    this.started = true;
  }

  stop() {
    this.started = false;
    this.recognition.stop();
  }

  createResultEvent(result) {
    return new CustomEvent("result", {
      detail: result,
    });
  }

  createStopEvent() {
    return new CustomEvent("stop");
  }
}
