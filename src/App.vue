<template>
  <div class="min-h-screen bg-white">
    <Navbar :categories="categories" />
    <div class="relative max-w-6xl mx-auto py-10" v-if="categories">
      <header id="content-header" />
      <main>
        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <router-view />
        </div>
      </main>
    </div>
    <PhotoswipeGallery />
  </div>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from "vue";
import { fetchAllCategories } from "./api/api.js";
import Navbar from "./components/Navbar.vue";
import PhotoswipeGallery from "./components/PhotoswipeGallery.vue";
import Category from "./views/Category.vue";
import eventbus from "./eventbus.js";

export default defineComponent({
  name: "App",

  setup() {
    const categories = ref([]);

    onBeforeMount(async () => {
      try {
        categories.value = await fetchAllCategories();
      } catch {
        categories.value = [
          {
            title: "Chocolats",
            slug: "chocolats",
          },
          {
            title: "Pâtisserie",
            slug: "patisserie",
          },
        ];
      } finally {
        eventbus.emit("loadedAllCategories");
      }
    });

    return { categories };
  },

  components: {
    Navbar,
    PhotoswipeGallery,
  },
});
</script>
