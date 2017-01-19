export default class RequestResponse {

	// var type;
	// var message;
	// var data;

	constructor(type, message, data = {}) {
		this.type = type;
		this.message = message;
		this.data = data;
	}

}