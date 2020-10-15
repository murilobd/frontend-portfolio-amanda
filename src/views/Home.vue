<template>
  <teleport to="#content-header">
    <PageHeader>
      <h1
        class="font-serif text-4xl font-regular leading-tight text-gray-800 text-center"
        id="title"
      >
        Amanda Medeiros de Freitas
      </h1>
    </PageHeader>
  </teleport>
  <div
    class="px-4 py-8 sm:px-0"
    v-if="profile_image !== '' && introduction_text !== ''"
  >
    <div class="bg-white">
      <div class="space-y-12">
        <div
          class="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0"
        >
          <!-- Image -->
          <div class="relative pb-2/3 sm:pt-2/3">
            <img
              class="absolute inset-0 object-cover h-full w-full shadow-lg rounded-lg"
              :src="profile_image.url"
              :alt="profile_image.title"
              :title="profile_image.title"
            />
          </div>

          <div class="sm:col-span-2">
            <div class="space-y-4">
              <div class="prose text-gray-500" v-html="introduction_text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchHome } from "../api/api.js";
import {
  defineComponent,
  ref,
  onBeforeMount,
  onMounted,
  onUnmounted,
} from "vue";
import showdown from "showdown";
import eventbus from "../eventbus.js";
import prerenderIfAllTrue from "../helpers/prerenderView.js";
import sendPageView from "../helpers/googleAnalytics.js";

export default defineComponent({
  name: "Home",

  setup() {
    sendPageView("Home");
    const introduction_text = ref("");
    const profile_image = ref("");
    const categories_loaded = ref(false);

    // all categories are loaded in App.vue component. As prerender will always render Home first, it will prerender only after categories are loaded and displayed on the menu
    eventbus.on("loadedAllCategories", allCategoriesLoaded);

    function allCategoriesLoaded() {
      categories_loaded.value = true;
      preRenderView();
    }

    onBeforeMount(async () => {
      const resp = await fetchHome();
      profile_image.value = resp.image;
      const markdownToHtml = new showdown.Converter();
      introduction_text.value = markdownToHtml.makeHtml(resp.introduction_text);
    });

    onMounted(() => {
      preRenderView();
    });

    onUnmounted(() => {
      eventbus.off("loadedAllCategories", allCategoriesLoaded);
    });

    function preRenderView() {
      prerenderIfAllTrue(
        categories_loaded.value,
        introduction_text.value,
        profile_image.value,
        "Home"
      );
    }

    return { introduction_text, profile_image };
  },
});
</script>

<style>
</style>