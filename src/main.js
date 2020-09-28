import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import { routes } from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";
import PageHeader from "./components/views/PageHeader.vue";
import PageTitle from "./components/views/PageTitle.vue";
import PageSubtitle from "./components/views/PageSubtitle.vue";

let app = createApp(App);

app.component("PageHeader", PageHeader);
app.component("PageTitle", PageTitle);
app.component("PageSubtitle", PageSubtitle);

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

app.use(router);

app.mount("#app");
