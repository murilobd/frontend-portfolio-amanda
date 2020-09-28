const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	purge: {
		enabled: process.env.NODE_ENV === "production",
		content: [
			"./index.html",
			"./src/**/*.vue",
			"./src/**/*.js",
			// etc.
		],
	},
	theme: {
		minHeight: {
			200: "200px",
		},
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
				serif: ["Cinzel", ...defaultTheme.fontFamily.serif],
			},
		},
	},
	variants: {
		opacity: ["responsive", "hover", "focus", "active", "group-hover"],
	},
	plugins: [require("@tailwindcss/ui")],
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
};
