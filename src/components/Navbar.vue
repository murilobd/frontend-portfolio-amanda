<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link
              to="/"
              class="cursor-pointer font-medium text-grey-500 hover:text-indigo-800 transition duration-150 ease-in-out"
            >
              Amanda Medeiros de Freitas
            </router-link>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
          <NavbarItem
            :key="`navbar_item_${category.slug}`"
            :to="{ path: `/${category.slug}` }"
            v-for="category of categories"
          >
            {{ category.title }}
          </NavbarItem>
          <NavbarItem to="/contact">Contact</NavbarItem>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button
            @click="showMenu = !showMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
          >
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg
              class="block h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg
              class="hidden h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!--
	      Mobile menu, toggle classes based on menu state.
	
	      Open: "block", closed: "hidden"
	    -->
    <div :class="`${showMenu ? 'block' : 'hidden'} sm:hidden`" id="mobile-menu">
      <div class="pt-2 pb-3 space-y-1">
        <NavbarItem
          :key="`navbar_item_mobile_${category.slug}`"
          :to="{ path: `/${category.slug}` }"
          :isMobile="true"
          v-for="category of categories"
        >
          {{ category.title }}
        </NavbarItem>
        <NavbarItem :isMobile="true" to="/contact">Contact</NavbarItem>
      </div>
    </div>
  </nav>
</template>

<script>
import NavbarItem from "./navbar/NavbarItem.vue";

export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      showMenu: false,
    };
  },

  components: {
    NavbarItem,
  },
};
</script>

<style>
</style>