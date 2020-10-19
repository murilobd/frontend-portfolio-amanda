<template>
  <teleport to="#content-header">
    <PageHeader>
      <PageTitle> Portfolio </PageTitle>
    </PageHeader>
  </teleport>
  <div class="px-4 py-8 sm:px-0" v-if="categories.length > 0">
    <div class="">
      <div class="space-y-12">
        <ul
          class="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-2"
        >
          <li
            v-for="category in categories"
            :key="`category_${category.slug}`"
            class="group rounded shadow-lg overflow-hidden"
          >
            <figure class="relative pb-full h-full md:min-h-full min-h-200">
              <img
                class="absolute h-full w-full object-cover object-center"
                :src="category.image.url"
                :alt="category.title"
              />
              <div
                class="absolute opacity-50 md:opacity-25 group-hover:opacity-50 bg-black top-0 h-full w-full transition-opacity duration-500 ease-in-out"
              ></div>
              <div
                class="absolute top-0 opacity-1 w-full flex-row align-middle items-center text-center justify-items-center"
              >
                <div
                  class="font-serif p-3 text-white md:text-5xl text-4xl mt-10"
                >
                  {{ category.title }}
                </div>
                <div class="flex justify-center">
                  <router-link
                    :to="`/${category.slug}`"
                    class="w-max-content p-2 rounded font-sans text-base border border-white text-white bg-transparent hover:bg-cool-gray-50 hover:text-gray-900 transition-colors duration-500 ease-in-out cursor-pointer"
                  >
                    Voir
                  </router-link>
                </div>
              </div>
            </figure>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onBeforeMount, onMounted } from "vue";
import prerenderIfAllTrue from "../helpers/prerenderView.js";
import sendPageView from "../helpers/googleAnalytics.js";
import { useLink } from "vue-router";
import { fetchAllCategories } from "../api/api.js";

export default defineComponent({
  name: "Home",

  setup() {
    const categories = ref([]);
    const {
      route,
      href,
      isActive,
      isExactActive,
      navigate,
      routerLink,
    } = useLink();
    sendPageView("Home");

    onBeforeMount(async () => {
      const resp = await fetchAllCategories();
      categories.value = resp;
    });

    onMounted(() => {
      preRenderView();
    });

    function preRenderView() {
      prerenderIfAllTrue(categories.value, "Home");
    }

    return { categories };
  },
});
</script>

<style>
</style>