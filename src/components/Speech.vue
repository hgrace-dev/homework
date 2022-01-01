<template>
  <div class="container">
    <div class="columns py-3">
      <div class="column">
        <div class="buttons">
          <button
            class="button"
            :class="{ 'is-danger is-focused': listening }"
            @click="listening ? stop() : start()"
          >
            <span class="icon">
              <i class="fas fa-microphone"></i>
            </span>
            <span>
              {{ listenBtnText }}
            </span>
          </button>
          <button class="button" @click="clearText">
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
          class="box textbox is-fullheight is-flex-direction-row is-align-items-center"
        >
          <p class="is-size-1">
            {{ finalText }}
          </p>
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
import SpeechService from "../services/speech";

export default {
  setup() {
    let listenBtnText = ref("Start Listening");
    let listening = ref(false);
    let finalText = ref("");
    let imageUrl = ref();

    const speechService = new SpeechService();

    const start = () => {
      speechService.start();
      listening.value = true;
      listenBtnText.value = "Stop Listening";
    };

    const stop = () => {
      speechService.stop();
      listening.value = false;
      listenBtnText.value = "Start Listening";
    };

    const onResult = (text) => {
      finalText.value = text.detail;
    };

    let callApiTimeout = null;
    watch(finalText, (finalText) => {
      if (!finalText) {
        return;
      }

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

    const clearText = () => {
      finalText.value = null;
      imageUrl.value = null;
    };

    speechService.addEventListener("result", onResult);
    speechService.addEventListener("stop", stop);

    return {
      start,
      stop,
      clearText,
      listenBtnText,
      listening,
      finalText,
      imageUrl,
    };
  },
};
</script>

<style scoped>
.is-fullheight {
  height: 100%;
}
</style>
