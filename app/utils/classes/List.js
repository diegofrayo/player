export default class List {

	/* eslint-disable */

	// ECMA 7 - Class properties
	// items = [];

	/* eslint-enable */

	constructor() {
		this.items = [];
	}

	add(object) {
		this.items.push(object);
	}

	addAtFirstPosition(object) {
		this.items.unshift(object);
	}

	get(index) {
		return this.items[index];
	}

	remove(index) {
		this.items.splice(index, 1);
	}

	size() {
		return this.items.length;
	}

	setList(list) {
		this.items = list;
	}

	toArray() {
		return this.items;
	}

}