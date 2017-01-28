import JWPlayerImplementation from 'utils/components/player/JWPlayerImplementation';

export default class PlayerFactory {

	createInstance(className) {

		if (className === 'JWPlayerImplementation') {
			this.httpInstance = new JWPlayerImplementation();
		}

		return this.httpInstance;
	}

	getInstance() {
		return this.httpInstance;
	}

}