<template>
  <div class="min-h-screen bg-white">
    <Navbar />
    <div class="relative max-w-6xl mx-auto py-10">
      <header id="content-header" />
      <main>
        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <router-view />
        </div>
        <p class="absolute bottom-0 full-right">
          {{ env }}
        </p>
      </main>
    </div>
    <PhotoswipeGallery />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import PhotoswipeGallery from "./components/PhotoswipeGallery.vue";

export default {
  name: "App",

  computed: {
    env() {
      return process.env.NODE_ENV;
    },
  },

  components: {
    Navbar,
    PhotoswipeGallery,
  },
};
</script>
