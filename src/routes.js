import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Contact from "./views/Contact.vue";
import Category from "./views/Category.vue";
import NotFound from "./views/NotFound.vue";
import { fetchFromCategory } from "./api/api.js";

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
	{
		path: "/",
		component: Home,
		meta: { title: "Amanda Medeiros de Freitas" },
	},
	{
		path: "/contact",
		component: Contact,
		meta: { title: "Contact" },
	},
	{ path: "/404", component: NotFound },
	{
		path: "/:category",
		component: Category,
		meta: {
			isCategory: true,
		},
	},
];

let router = createRouter({
	history: createWebHistory(),
	routes: import.meta.hot ? [] : routes,
});

if (import.meta.hot) {
	let removeRoutes = [];

	for (let route of routes) {
		removeRoutes.push(router.addRoute(route));
	}

	import.meta.hot.acceptDeps("./routes.js", ({ routes }) => {
		for (let removeRoute of removeRoutes) removeRoute();
		removeRoutes = [];
		for (let route of routes) {
			removeRoutes.push(router.addRoute(route));
		}
		router.replace("");
	});
}

router.beforeEach(async (to, from, next) => {
	if (to.meta.isCategory) {
		console.log("isCategory", to.path);
		try {
			await fetchFromCategory(to.path.substr(1));
			return next();
		} catch (error) {
			return next("/404");
		}
	}

	next();
});

export default router;
