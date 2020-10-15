export const sendPageView = (page_title) => {
	console.log(page_title);
	window.gtag &&
		window.gtag("event", "page_view", {
			page_title,
			page_location: window.location.href,
			page_path: window.location.pathname,
		});
};

export default sendPageView;
