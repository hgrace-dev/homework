<template>
  <div class="container">
    <div class="columns py-3">
      <div class="column">
        <div class="buttons">
          <button
            class="button"
            :class="{ 'is-danger is-focused': speaking }"
            @click="start"
          >
            <span class="icon">
              <i class="fas fa-microphone"></i>
            </span>
            <span> {{ listenBtnText }}</span>
          </button>
          <button class="button" @click="clear">
            <span class="icon">
              <i class="fas fa-eraser"></i>
            </span>
            <span>Clear</span>
          </button>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-three-fifths">
        <div
          class="box textbox is-fullheight is-flex is-flex-direction-row is-align-items-center"
        >
          <input
            class="input is-large is-borderless is-shadowless is-size-2"
            type="text"
            placeholder="Type something here..."
            v-model="word"
          />
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
import { ref, watch } from "vue";
import axios from "axios";
import TextService from "../services/text";

export default {
  setup() {
    let word = ref("");
    let finalWord = ref("");
    let imageUrl = ref();
    let speaking = ref(false);
    let listenBtnText = ref("Start Speaking");

    const textService = new TextService();

    const start = () => {
      if (!word.value) return;
      speaking.value = true;
      finalWord.value = word.value;
      textService.speak(word.value);
    };

    const stop = () => {
      speaking.value = false;
    };

    const clear = () => {
      word.value = null;
    };

    let callApiTimeout = null;
    watch(finalWord, (finalText) => {
      if (!finalText) return;

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

    textService.addEventListener("end", stop);
    return {
      start,
      clear,
      word,
      imageUrl,
      speaking,
      listenBtnText,
    };
  },
};
</script>

<style scoped>
.is-fullheight {
  height: 100%;
}

.is-borderless {
  border: none;
}
</style>
