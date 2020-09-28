<template>
  <teleport to="#content-header">
    <PageHeader v-if="category && category.title">
      <PageTitle> {{ category.title }} </PageTitle>
      <PageSubtitle> {{ category.subtitle }} </PageSubtitle>
    </PageHeader>
  </teleport>
  <div class="px-4 py-8 sm:px-0">
    <div class="bg-white">
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
  </div>
</template>

<script>
import { defineComponent } from "vue";
import GalleryItem from "../components/GalleryItem.vue";
import useCategoryRepository from "../composables/useCategoryRepository.js";

export default defineComponent({
  name: "PatisserieCategory",

  setup() {
    const { category, openPhotoswipeGallery } = useCategoryRepository(
      "patisserie"
    );

    return { category, openPhotoswipeGallery };
  },

  components: {
    GalleryItem,
  },
});
</script>

<style>
</style>