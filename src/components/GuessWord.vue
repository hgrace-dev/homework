<template>
  <div class="container">
    <div class="columns py-3">
      <div class="column">
        <button
          class="button"
          :class="{ 'is-danger is-focused': gameStarted }"
          @click="gameStarted ? stopGame() : startGame()"
        >
          <span class="icon">
            <i class="fas fa-play"></i>
          </span>
          <span> {{ listenBtnText }} </span>
        </button>
      </div>
    </div>
    <div class="columns">
      <div class="column is-three-fifths">
        <div
          class="box is-fullheight is-flex is-flex-direction-row is-align-items-center"
        >
          <p class="is-size-1">{{ guessWord }}</p>
        </div>
      </div>
      <div class="column">
        <div class="box imagebox">
          <figure class="image is-4by3">
            <img :src="imageUrl" alt="" v-if="imageUrl" />
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import Words from "../services/words";
import axios from "axios";
import SpeechService from "../services/speech";

export default {
  setup() {
    let words = new Words();
    let imageUrl = ref();
    let newWord = ref();
    let replace = ref(false);
    let listenBtnText = ref("Start Game");
    let gameStarted = ref(false);

    watch(newWord, (finalText) => {
      if (!finalText) {
        return;
      }

      let callApiTimeout = null;
      clearTimeout(callApiTimeout);
      callApiTimeout = setTimeout(
        function () {
          const reqURL =
            "https://pixabay.com/api/?key=24924259-0d502b64195f1dccb8979d321&q=" +
            finalText +
            "&image_type=photo";

          axios({
            method: "get",
            url: reqURL,
          }).then((response) => {
            if (
              response.data &&
              response.data.hits &&
              response.data.hits.length > 0
            ) {
              let img = [...response.data.hits].shift();
              imageUrl.value = img.webformatURL;
            }
          });
        }.bind(this),
        250
      );
    });

    const speechService = new SpeechService();

    const startGame = () => {
      console.log("startGame");
      replace.value = true;
      gameStarted.value = true;
      listenBtnText.value = "Stop Game";
      newWord.value = words.newWord();
      speechService.start();
    };

    const stopGame = () => {
      console.log("stopGame");
      gameStarted.value = false;
      listenBtnText.value = "Start Game";
      speechService.stop();
    };

    const onResult = (text) => {
      console.log("onResult");
      if (text.detail.toLowerCase() === newWord.value.toLowerCase()) {
        replace.value = false;
      } else {
        console.log("Nop, next try!!");
      }
    };

    const end = () => {
      console.log("speech end");
      if (gameStarted.value) {
        setTimeout(() => startGame(), 2000);
      }
    };

    let guessWord = computed(() => {
      if (!newWord.value) {
        return "";
      }
      return replace.value
        ? newWord.value.replace(/[aeiou]/gi, " _ ")
        : newWord.value;
    });

    speechService.addEventListener("result", onResult);
    speechService.addEventListener("stop", end);

    return {
      listenBtnText,
      guessWord,
      imageUrl,
      gameStarted,
      startGame,
      stopGame,
    };
  },
};
</script>

<style scoped>
.is-fullheight {
  height: 100%;
}
</style>
