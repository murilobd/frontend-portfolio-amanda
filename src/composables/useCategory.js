import { fetchFromCategory } from "../api/api.js";
import { ref, onMounted } from "vue";

export default function useCategories(categorySlug) {
	let slug = categorySlug;
	const category = ref({});
	let photoswipeItems = [];

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
		try {
			category.value = await fetchFromCategory(slug);
			createPhotoswipeGallery();
			return true;
		} catch (error) {
			throw error;
		}
	};

	/**
	 * Refetch category
	 *
	 * @param {string} categorySlug Category slug
	 */
	const refetchCategory = async (categorySlug = null) => {
		slug = categorySlug || slug;
		photoswipeItems = [];
		category.value = {};
		return await getCategory();
	};

	onMounted(getCategory);

	return {
		category,
		openPhotoswipeGallery,
		refetchCategory,
	};
}
