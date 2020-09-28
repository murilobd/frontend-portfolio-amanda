# Frontend Amanda's Portfolio

This project is the frontend for Amanda's portfolio. Backend was built using [Strapi](https://strapi.io/).
Frontend using [Vue 3](https://v3.vuejs.org), [TailwindCSS](http://tailwindcss.com) and [Photoswipe](https://photoswipe.com/).

## How to add new categories?

Simple enough: duplicate views/Chocolat.vue file and replace the parameter from `useCategoryRepository` function to the slug of the category.

## How to point to another strapi endpoint?

Replace `STRAPI_URL` from api/images.js file.