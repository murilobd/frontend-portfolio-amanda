<template>
  <li
    v-if="item"
    class="group rounded shadow-lg overflow-hidden cursor-pointer"
    @click="clickedImage(item.id)"
  >
    <figure class="relative pb-2/3 h-full md:min-h-full min-h-200">
      <img
        class="absolute h-full w-full object-cover object-center"
        :src="item.small.url"
        :alt="item.title"
        itemprop="thumbnail"
      />
      <div
        class="absolute group-hover:opacity-50 bg-black opacity-0 top-0 h-full w-full transition-opacity duration-500 ease-in-out"
      ></div>
      <div
        class="absolute bottom-0 m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
      >
        <figcaption class="text-sm text-white" itemprop="caption description">
          <h4 class="font-medium leading-6" id="title">{{ item.title }}</h4>
          <p class="font-light" id="subtitle" v-if="item.subtitle">
            {{ item.subtitle }}
          </p>
          <span class="hidden" itemprop="copyrightHolder">
            Amanda Medeiros de Freitas
          </span>
        </figcaption>
      </div>
    </figure>
  </li>
</template>

<script>
export default {
  name: "GalleryItem",
  emits: ["clickedImage"],

  props: {
    item: {
      type: Object,
      default: null,
    },
  },

  methods: {
    clickedImage(id) {
      this.$emit("clickedImage", id);
    },
  },
};
</script>

<style>
</style>