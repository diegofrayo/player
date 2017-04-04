import HttpFetchImplementation from 'utils/components/http/HttpFetchImplementation';
// import HttpJQueryImplementation from 'utils/components/http/HttpJQueryImplementation';

export default class HttpFactory {

	createInstance(className, configuration) {

		if (className === 'HttpFetchImplementation') {
			this.httpInstance = new HttpFetchImplementation(configuration);
		}
		// else if (className === 'HttpJQueryImplementation') {
		// 	this.httpInstance = new HttpJQueryImplementation(configuration);
		// }

		return this.httpInstance;
	}

	getInstance() {
		return this.httpInstance;
	}

}