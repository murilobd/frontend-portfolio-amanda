<template>
  <div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
    <p class="text-xl font-light leading-7 text-gray-500" id="subtitle">
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  name: "PageSubtitle",
};
</script>

<style>
</style>