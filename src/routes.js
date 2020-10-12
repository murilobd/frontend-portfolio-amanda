import Home from "./views/Home.vue";
import Contact from "./views/Contact.vue";

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
	//   { path: '/:path(.*)', component: NotFound },
];
