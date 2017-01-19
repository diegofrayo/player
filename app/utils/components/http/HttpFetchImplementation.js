import APP from 'utils/app';

export default class HttpFetchImplementation {

	constructor(configuration) {
		this.configuration = configuration;
	}

	get(url, params, successCallback, errorCallback, alwaysCallback) {

		const promise = APP.promise.createPromise((resolve, reject) => {

			const requestConfig = {
				method: 'GET'
			};

			fetch(url, requestConfig)
				.then(response => response.json())
				.then((data) => {

					let response;

					if (successCallback) {
						response = successCallback(data);
					} else {
						response = data;
					}

					resolve(response);

				})
				.catch((requestResponse) => {

					let response;

					if (errorCallback) {
						response = errorCallback(requestResponse);
					} else {
						response = requestResponse;
					}

					reject(response);

				});
			// .finally(() => {

			// 	if (alwaysCallback) {
			// 		alwaysCallback();
			// 	}

			// });

			if (alwaysCallback) {
				alwaysCallback();
			}

		});

		return promise;
	}

	post(url, params, successCallback, errorCallback, alwaysCallback) {

		const promise = APP.promise.createPromise((resolve, reject) => {

			const requestConfig = {
				method: 'POST',
				body: JSON.stringify(params)
			};

			fetch(url, requestConfig)
				.then(response => response.json())
				.then((data) => {

					let response;

					if (successCallback) {
						response = successCallback(data);
					} else {
						response = data;
					}

					resolve(response);

				})
				.catch((requestResponse) => {

					let response;

					if (errorCallback) {
						response = errorCallback(requestResponse);
					} else {
						response = requestResponse;
					}

					reject(response);

				});
			// .finally(() => {

			// 	if (alwaysCallback) {
			// 		alwaysCallback();
			// 	}

			// });

			if (alwaysCallback) {
				alwaysCallback();
			}

		});

		return promise;
	}

}