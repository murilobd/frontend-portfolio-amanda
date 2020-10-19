<template>
  <teleport to="#content-header">
    <PageHeader v-if="category && category.title">
      <PageTitle> {{ category.title }} </PageTitle>
      <PageSubtitle> {{ category.subtitle }} </PageSubtitle>
    </PageHeader>
  </teleport>
  <!-- Category -->
  <div class="px-4 py-8 sm:px-0">
    <div class="space-y-12">
      <ul
        id="gallery"
        class="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3"
        itemscope
        itemtype="http://schema.org/ImageGallery"
      >
        <template v-for="image in category.images" :key="image.id">
          <GalleryItem
            :item="image"
            @clickedImage="openPhotoswipeGallery($event)"
          />
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, watch, ref } from "vue";
import GalleryItem from "../components/GalleryItem.vue";
import useCategory from "../composables/useCategory.js";
import { useRoute } from "vue-router";
import prerenderIfAllTrue from "../helpers/prerenderView.js";
import sendPageView from "../helpers/googleAnalytics.js";

export default defineComponent({
  name: "Category",

  setup() {
    const route = useRoute();
    const { category, openPhotoswipeGallery, refetchCategory } = useCategory(
      route.path.substring(1)
    );
    let categoryLoaded = true; // starts as true but it will be toggled when refreshed. Used to trigger the prerender function
    sendPageView(route.path.substring(1));

    /**
     * Whenever route changes, refetch new category items
     */
    watch(
      () => route.params,
      async () => {
        categoryLoaded = false;
        if (route.meta.isCategory) {
          await refetchCategory(route.path.substring(1));
          categoryLoaded = true;
          preRenderView();
          sendPageView(route.path.substring(1));
        }
      }
    );

    /**
     * Whenever category changes, trigger prerender function.
     * This will happen usually when change the category, as all categories use the same component
     */
    watch(category, (category, prevCategory) => {
      const images = category.images;
      if (Array.isArray(images) && images.length > 0) {
        preRenderView();
      }
    });

    function preRenderView() {
      prerenderIfAllTrue(
        category.value.images,
        categoryLoaded,
        `Category: ${route.path}`
      );
    }

    return { category, openPhotoswipeGallery };
  },

  components: {
    GalleryItem,
  },
});
</script>

<style>
</style>