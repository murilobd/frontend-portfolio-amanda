import axios from "axios";
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

export default axios;
