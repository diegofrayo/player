import APP from 'utils/app';

export default class HttpFetchImplementation {

	constructor(configuration) {
		this.configuration = configuration;
	}

	executeAllwaysCallback(alwaysCallback) {
		if (alwaysCallback) {
			alwaysCallback();
		}
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

					this.executeAllwaysCallback(alwaysCallback);
					resolve(response);
				})
				.catch((requestResponse) => {

					let response;

					if (errorCallback) {
						response = errorCallback(requestResponse);
					} else {
						response = requestResponse;
					}

					this.executeAllwaysCallback(alwaysCallback);
					reject(response);
				});

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

					this.executeAllwaysCallback(alwaysCallback);
					resolve(response);
				})
				.catch((requestResponse) => {

					let response;

					if (errorCallback) {
						response = errorCallback(requestResponse);
					} else {
						response = requestResponse;
					}

					this.executeAllwaysCallback(alwaysCallback);
					reject(response);
				});

		});

		return promise;
	}

}