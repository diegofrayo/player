import PromiseImplementation from 'utils/components/promise/PromiseImplementation';

export default class PromiseFactory {

	createInstance(className, configuration) {

		if (className === 'PromiseImplementation') {
			this.promiseInstance = new PromiseImplementation(configuration);
		}

		return this.promiseInstance;
	}

	getInstance() {
		return this.promiseInstance;
	}

}