import axios from "./axios.js";
import eventbus from "../eventbus.js";

let numRequests = 0;

function startedRequest() {
	numRequests++;
	eventbus.emit("showLoadingSpinner", true);
}

function finishedRequest() {
	numRequests--;
	if (numRequests <= 0) {
		numRequests = 0;
		eventbus.emit("showLoadingSpinner", false);
	}
}

// Add a request interceptor
axios.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		startedRequest();
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		finishedRequest();
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		finishedRequest();
		return Promise.reject(error);
	}
);

const STRAPI_URL = import.meta.env.VITE_API_URL;

function getImageFormat(image, format, returnNullIfFormatNotFound = false) {
	// when in dev mode, Strapi doesn't add http... to image url
	let url;
	if (image.formats[format]) {
		url = image.formats[format].url;
		if (url.indexOf("http") !== 0) url = `${STRAPI_URL}${url}`;
		return {
			url,
			height: image.formats[format].height,
			width: image.formats[format].width,
		};
	}

	if (returnNullIfFormatNotFound) return null;

	// when in dev mode, Strapi doesn't add http... to image url
	url = image.url;
	if (url.indexOf("http") !== 0) url = `${STRAPI_URL}${url}`;
	return {
		url,
		height: image.height,
		width: image.width,
	};
}

async function fetchHome() {
	return axios.get(`${STRAPI_URL}/home`).then((res) => {
		const data = res.data;
		const introduction_text = data.introduction_text;
		const image = {
			title: data.profile_image.title,
			...(getImageFormat(data.profile_image.image, "medium", true) ||
				getImageFormat(data.profile_image.image, "small")),
		};

		return {
			introduction_text,
			image,
		};
	});
}

const fetchedCategories = {};
async function fetchFromCategory(category) {
	if (fetchedCategories[category])
		return Promise.resolve(fetchedCategories[category]);

	return axios
		.get(`${STRAPI_URL}/categories`, {
			params: {
				slug: category,
			},
		})
		.then((res) => {
			const resp = res.data[0];
			if (!resp) throw new Error("Category not found");

			let images = {
				id: resp.id,
				title: resp.name,
				subtitle: resp.description,
			};
			images = {
				...images,
				images: resp.image.reduce((acc, curr) => {
					return [
						...acc,
						{
							id: curr.id,
							title: curr.title,
							subtitle: curr.description,
							small: getImageFormat(curr.image, "small"),
							large: getImageFormat(curr.image, "large"),
						},
					];
				}, []),
			};

			fetchedCategories[category] = images;
			return images;
		})
		.catch((err) => {
			throw err.response;
		});
}

async function fetchAllCategories() {
	return axios.get(`${STRAPI_URL}/categories`).then((res) => {
		const data = res.data;
		return data.map((category) => ({
			title: category.name,
			slug: category.slug,
			image: getImageFormat(category.category_image, "medium"),
		}));
	});
}

export { fetchFromCategory, fetchHome, fetchAllCategories };
