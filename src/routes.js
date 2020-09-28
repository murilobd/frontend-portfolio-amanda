import Home from "./views/Home.vue";
import Chocolat from "./views/Chocolat.vue";
import Patisserie from "./views/Patisserie.vue";
import Contact from "./views/Contact.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
	{
		path: "/",
		component: Home,
		meta: { title: "Amanda Medeiros de Freitas" },
	},
	{
		path: "/chocolat",
		component: Chocolat,
		meta: { title: "Chocolat" },
	},
	{
		path: "/patisserie",
		component: Patisserie,
		meta: { title: "Patisserie" },
	},
	{
		path: "/contact",
		component: Contact,
		meta: { title: "Contact" },
	},
	//   { path: '/:path(.*)', component: NotFound },
];
