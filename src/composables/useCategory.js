import { fetchFromCategory } from "../api/api.js";
import { ref, onMounted } from "vue";

export default function useCategories(categorySlug) {
	const category = ref({});
	const photoswipeItems = [];

	/**
	 * Create photoswipe gallery items
	 */
	const createPhotoswipeGallery = () => {
		const images = category.value.images;
		for (const img of images) {
			photoswipeItems.push({
				id: img.id,
				src: img.large.url,
				w: img.large.width,
				h: img.large.height,
			});
		}
	};

	/**
	 * Open Photoswipe gallery with selected image
	 * @param {string|int} imageId Image ID clicked
	 */
	const openPhotoswipeGallery = (imageId) => {
		const index = photoswipeItems.findIndex((img) => img.id === imageId);
		const pswpElement = document.querySelectorAll(".pswp")[0];
		const photoswipe = new window.PhotoSwipe(
			pswpElement,
			window.PhotoSwipeUI_Default,
			photoswipeItems,
			{
				index: Math.max(index, 0),
			}
		);
		photoswipe.init();
	};

	/**
	 * Get category from API
	 */
	const getCategory = async () => {
		category.value = await fetchFromCategory(categorySlug);
		createPhotoswipeGallery();
		window.snapshot && window.snapshot(); // tells pre-render page is ready
	};

	onMounted(getCategory);

	return {
		category,
		openPhotoswipeGallery,
	};
}
