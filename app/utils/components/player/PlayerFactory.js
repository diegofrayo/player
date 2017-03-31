import JWPlayerImplementation from 'utils/components/player/JWPlayerImplementation';
// import PlyrImplementation from 'utils/components/player/PlyrImplementation';

export default class PlayerFactory {

	createInstance(className) {

		if (className === 'JWPlayerImplementation') {
			this.httpInstance = new JWPlayerImplementation();
		}
		// else if (className === 'PlyrImplementation') {
		// 	this.httpInstance = new PlyrImplementation();
		// }

		return this.httpInstance;
	}

	getInstance() {
		return this.httpInstance;
	}

}