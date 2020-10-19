const axios = require("axios");
const shell = require("shelljs");
const fs = require("fs");

axios
	.get("https://strapi-portfolio-amanda.herokuapp.com/categories")
	.then(getCategories)
	.then(moveCategoryFilesToRoot)
	.then(replaceGoogleAnalyticsSnippet)
	.catch((err) => console.error(err.response || err));

function getCategories(resp) {
	const categories = resp.data.map((category) => category.slug);
	return [...categories, "contact"];
}

function moveCategoryFilesToRoot(categories) {
	for (const category of categories) {
		const path = `./.presite/${category}/index.html`;
		// Check if file exists in path
		if (shell.test("-f", path)) {
			shell.mv(path, `./.presite/${category}.html`);
			shell.rm("-rf", `./.presite/${category}`);
		}
	}

	return categories;
}

function replaceGoogleAnalyticsSnippet(categories) {
	categories.push("index");
	for (const category of categories) {
		const path = `./.presite/${category}.html`;
		fs.readFile(path, "utf8", function (err, data) {
			if (err) {
				return console.log(err);
			}

			const result = data.replace(
				"<!-- Global site tag (gtag.js) - Google Analytics -->",
				'<script async src="https://www.googletagmanager.com/gtag/js?id=UA-180659102-1"></script><script>window.dataLayer = window.dataLayer || [];function gtag() { dataLayer.push(arguments); }gtag("js", new Date());gtag("config", "UA-180659102-1");</script>'
			);

			fs.writeFile(path, result, "utf8", function (err) {
				if (err) return console.log(err);
			});
		});
	}
}
