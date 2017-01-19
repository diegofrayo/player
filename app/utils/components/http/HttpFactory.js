import HttpJQueryImplementation from 'utils/components/http/HttpJQueryImplementation';
import HttpFetchImplementation from 'utils/components/http/HttpFetchImplementation';

export default class HttpFactory {

	createInstance(className, configuration) {

		if (className === 'HttpJQueryImplementation') {
			this.httpInstance = new HttpJQueryImplementation(configuration);
		} else if (className === 'HttpFetchImplementation') {
			this.httpInstance = new HttpFetchImplementation(configuration);
		}

		return this.httpInstance;
	}

	getInstance() {
		return this.httpInstance;
	}

}