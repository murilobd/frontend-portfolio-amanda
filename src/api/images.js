import axios from "axios";

const STRAPI_URL = "https://strapi-portfolio-amanda.herokuapp.com/categories";

async function fetchFromCategory(category) {
	return axios
		.get(STRAPI_URL, {
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
							small: {
								url: curr.image.formats.small.url,
								height: curr.image.formats.small.height,
								width: curr.image.formats.small.width,
							},
							large: {
								url: curr.image.formats.large.url,
								height: curr.image.formats.large.height,
								width: curr.image.formats.large.width,
							},
						},
					];
				}, []),
			};

			return images;
		});
}

export { fetchFromCategory };
