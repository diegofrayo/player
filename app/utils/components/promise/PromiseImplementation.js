export default class PromiseImplementation {

	constructor(configuration) {
		this.configuration = configuration;
	}

	createPromise(fn) {

		// let resolve;
		// let reject;
		// const promise = new Promise((pResolve, pReject) => {
		// 	resolve = pResolve;
		// 	reject = pReject;
		// });

		// return {
		// 	promise,
		// 	resolve,
		// 	reject
		// };

		return new Promise(fn);
	}

}