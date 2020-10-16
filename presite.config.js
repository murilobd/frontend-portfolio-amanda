const axios = require("axios");

async function fetchRoutes() {
	return new Promise((resolve) => {
		axios
			.get("https://strapi-portfolio-amanda.herokuapp.com/categories")
			.then((res) => {
				const data = res.data;
				const routes = data.map((category) => `/${category.slug}`);
				resolve(routes);
			});
	});
}

module.exports = {
	// async routes() {
	// 	const routes = await fetchRoutes();
	// 	return ["/", ...routes, "/contact", "/404"];
	// },
	manually: true,
	chromePath: "/Users/murilobd/CerpalLabs/Web/open-source/taki/chrome",
};
