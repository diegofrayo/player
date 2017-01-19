import APP from 'utils/app';

export default class HttpJQueryImplementation {

	constructor(configuration) {
		this.configuration = configuration;
	}

	get(url, params, successCallback, errorCallback, alwaysCallback) {

		const promise = APP.promise.createPromise((resolve, reject) => {

			const requestConfig = {
				url,
				type: 'GET',
				data: params
			};

			jQuery.ajax(requestConfig)
				.done((requestResponse) => {

					let response;

					if (successCallback) {
						response = successCallback(requestResponse);
					} else {
						response = requestResponse;
					}

					resolve(response);

				})
				.fail((requestResponse) => {

					let response;


					if (errorCallback) {
						response = errorCallback(requestResponse);
					} else {
						response = requestResponse;
					}

					reject(response);

				})
				.always(() => {

					if (alwaysCallback) {
						alwaysCallback();
					}

				});

		});

		return promise;
	}

	post(url, params, successCallback, errorCallback, alwaysCallback) {

		const promise = APP.promise.createPromise((resolve, reject) => {

			const requestConfig = {
				url,
				type: 'POST',
				data: params
			};

			jQuery.ajax(requestConfig)
				.done((requestResponse) => {

					let response;

					if (successCallback) {
						response = successCallback(requestResponse);
					} else {
						response = requestResponse;
					}

					resolve(response);

				})
				.fail((requestResponse) => {

					let response;


					if (errorCallback) {
						response = errorCallback(requestResponse);
					} else {
						response = requestResponse;
					}

					reject(response);

				})
				.always(() => {

					if (alwaysCallback) {
						alwaysCallback();
					}

				});

		});

		return promise;
	}

}