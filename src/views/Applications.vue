<template>
  <div class="columns is-multiline">
    <div class="column is-one-third">
      <Card @click="changeRoute('/app/speech')">
        <template v-slot:image>
          <img :src="speechtotext" alt="SpeechToText" />
        </template>
        <template v-slot:name>
          <p class="title is-4">Speech To Text</p>
        </template>
        <template v-slot:text>
          Learn how to spell by using your voice and have some fun!
          <br />
        </template>
      </Card>
    </div>
    <div class="column is-one-third">
      <Card @click="changeRoute('/app/text')">
        <template v-slot:image>
          <img :src="texttospeech" alt="TextToSpeech" />
        </template>
        <template v-slot:name>
          <p class="title is-4">Text To Speech</p>
        </template>
        <template v-slot:text>
          Learn how to spell by using text and have some fun!
          <br />
        </template>
      </Card>
    </div>
    <div class="column is-one-third">
      <Card />
    </div>
    <div class="column is-one-third">
      <Card />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";

import speechtotext from "../assets/speechtotext.svg";
import texttospeech from "../assets/texttospeech.svg";

export default {
  name: "Applications",
  data() {
    return {
      speechtotext,
      texttospeech,
    };
  },
  components: {
    Card,
  },
  methods: {
    changeRoute(route) {
      this.$router.push(route);
    },
  },
};
</script>
