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
    class="bg-cool-gray-100"
    v-if="profile_image !== '' && introduction_text !== ''"
  >
    <div class="space-y-12 px-4 py-8 sm:px-0">
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
  name: "About",

  setup() {
    sendPageView("About");
    const introduction_text = ref("");
    const profile_image = ref("");

    onBeforeMount(async () => {
      const resp = await fetchHome();
      profile_image.value = resp.image;
      const markdownToHtml = new showdown.Converter();
      introduction_text.value = markdownToHtml.makeHtml(resp.introduction_text);
      preRenderView();
    });

    onMounted(() => {
      preRenderView();
    });

    function preRenderView() {
      prerenderIfAllTrue(introduction_text.value, profile_image.value, "About");
    }

    return { introduction_text, profile_image };
  },
});
</script>

<style>
</style>