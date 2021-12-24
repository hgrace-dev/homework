<template>
  <NavBar />
  <section id="main" class="section">
    <router-view />
  </section>
  <Footer />
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default {
  name: "Home",
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style>
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#main {
  flex: 1;
}
</style>
