# Frontend Amanda's Portfolio

This project is the frontend for Amanda's portfolio. [Backend](https://github.com/murilobd/strapi-portfolio-amanda) was built using [Strapi](https://strapi.io/).
Frontend using [Vue 3](https://v3.vuejs.org), [TailwindCSS](http://tailwindcss.com) and [Photoswipe](https://photoswipe.com/).

You can find the backend for this project [here](https://github.com/murilobd/strapi-portfolio-amanda)

## How to add new categories?

Simple enough: duplicate views/Chocolat.vue file and replace the parameter from `useCategory` function to the slug of the category.

## How to point to another strapi endpoint?

Replace `VITE_API_URL` from .env[.production] file.
