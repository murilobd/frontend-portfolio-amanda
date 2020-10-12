import axios from "axios";

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

async function fetchFromCategory(category) {
	return axios
		.get(`${STRAPI_URL}/categories`, {
			params: {
				slug: category,
			},
		})
		.then((res) => {
			const resp = res.data[0];

			let images = {
				id: resp.id,
				title: resp.Title,
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

			return images;
		});
}

async function fetchAllCategories() {
	return axios.get(`${STRAPI_URL}/categories`).then((res) => {
		const data = res.data;
		return data.map((category) => ({
			title: category.Title,
			slug: category.slug,
		}));
	});
}

export { fetchFromCategory, fetchHome, fetchAllCategories };
