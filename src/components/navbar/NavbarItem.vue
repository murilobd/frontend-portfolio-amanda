<template>
  <router-link v-bind="$props" v-slot="{ isActive, href, navigate }">
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="
        !isMobile
          ? !isActive
            ? 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm leading-5 text-cool-gray-500 hover:text-indigo-900 hover:border-indigo-300 focus:outline-none focus:text-cool-gray-500 focus:border-indigo-300 transition duration-150 ease-in-out'
            : 'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-indigo-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
          : !isActive
          ? 'block pl-3 pr-4 py-2 border-l-4 border-transparent text-base text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 hover:border-indigo-300 focus:outline-none focus:text-indigo-800 focus:bg-indigo-50 focus:border-indigo-300 transition duration-150 ease-in-out'
          : 'block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-cool-gray-500 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out'
      "
    >
      <slot />
    </a>
  </router-link>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "NavbarItem",

  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    ...RouterLink.props,
  },
};
</script>

<style>
</style>