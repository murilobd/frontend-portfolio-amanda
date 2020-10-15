export const prerenderIfAllTrue = (...args) => {
	for (const item of args) {
		// if it's an Array, check if it's not empty
		if (Array.isArray(item) && item.length <= 0) {
			return false;
		}

		// if it's a string, check if it's not empty
		if (
			Object.prototype.toString.call(item) === "[object String]" &&
			item.trim() === ""
		) {
			return false;
		}

		// not null or undefined
		if (item === undefined || item === null || !item) {
			return false;
		}
	}

	// print last argument as it's route name
	console.log("Route", args[args.length - 1]);

	// tells pre-render page is ready
	window.snapshot && window.snapshot();
};

export default prerenderIfAllTrue;
