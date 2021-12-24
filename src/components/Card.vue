<template>
  <div class="card is-clickable">
    <div class="card-image">
      <figure class="image is-4by3">
        <slot name="image"></slot>
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <slot name="name"></slot>
        </div>
      </div>
      <div class="content">
        <slot name="text"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
};
</script>

<style scoped></style>
