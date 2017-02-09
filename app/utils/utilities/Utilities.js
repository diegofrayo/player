/* eslint no-unused-vars: "off" */

// let duration = durationParam.replace('PT', '');
// let hours = '';
// let minutes;
// let seconds;
// let arrayDuration;

// console.log(durationParam);

// // PT1H11M40S

// if (duration.indexOf('H') !== -1) {
// 	duration = duration.replace('H', ':');
// 	duration = duration.replace('M', ':');
// 	arrayDuration = duration.split(':');
// 	hours = `${parseInt(arrayDuration[0], 10)}:`;
// }

// if (duration.indexOf('M') !== -1 && duration.indexOf('S') !== -1) {

// 	// If the duration have a minutes and seconds
// 	duration = duration.replace('S', '');

// 	if (hours !== '') {

// 		minutes = parseInt(arrayDuration[1], 10);
// 		seconds = parseInt(arrayDuration[2], 10);

// 	} else {

// 		duration = duration.replace('M', ':');
// 		arrayDuration = duration.split(':');
// 		minutes = parseInt(arrayDuration[0], 10);
// 		seconds = parseInt(arrayDuration[1], 10);

// 	}

// } else if (duration.indexOf('M') !== -1 && duration.indexOf('S') === -1) {

// 	// If the duration have a minutes but not seconds
// 	duration = duration.replace('M', '');
// 	minutes = parseInt(duration, 10);
// 	seconds = '00';

// } else if (duration.indexOf('S') !== -1 && duration.indexOf('M') === -1) {

// 	// If the duration have a seconds but not minutes
// 	duration = duration.replace('S', '');
// 	seconds = parseInt(duration, 10);
// 	minutes = '0';

// }

// if (typeof seconds === 'number' && seconds < 10) {
// 	seconds = `0${seconds}`;
// }

// if (typeof minutes === 'number' && minutes < 10) {
// 	minutes = `0${minutes}`;
// }

// return `${hours}${minutes}:${seconds}`;

const Utilities = {

	getDurationInSeconds(duration) {

		const split = duration.split(':');
		const seconds = parseInt(split[1], 10);
		const minutes = parseInt(split[0], 10);

		return seconds + (minutes * 60);
	},

	normalizeDuration(durationParam) {

		let duration = durationParam.replace('PT', '');

		// If the duration video is less than one hour
		if (duration.indexOf('H') === -1) {

			let minutes;
			let seconds;
			let arrayDuration;

			if (duration.indexOf('M') !== -1 && duration.indexOf('S') !== -1) {

				// If the duration have a minutes and seconds
				duration = duration.replace('S', '');
				duration = duration.replace('M', ':');
				arrayDuration = duration.split(':');
				minutes = parseInt(arrayDuration[0], 10);
				seconds = parseInt(arrayDuration[1], 10);


			} else if (duration.indexOf('M') !== -1 && duration.indexOf('S') === -1) {

				// If the duration have a minutes but not seconds
				duration = duration.replace('M', '');
				minutes = parseInt(duration, 10);
				seconds = '00';


			} else if (duration.indexOf('S') !== -1 && duration.indexOf('M') === -1) {

				// If the duration have a seconds but not minutes
				duration = duration.replace('S', '');
				seconds = parseInt(duration, 10);
				minutes = '0';

			}

			if (typeof seconds === 'number' && seconds < 10) {
				seconds = `0${seconds}`;
			}

			return `${minutes}:${seconds}`;
		}

		return null;
	},

	sortPlaylist(a, b) {

		const aIsPlaying = a.is_playing;
		const bIsPlaying = b.is_playing;
		const aVotes = a.votes;
		const bVotes = b.votes;
		const aTimestamp = a.timestamp;
		const bTimestamp = b.timestamp;
		const aType = a.type;
		const bType = b.type;

		const down = -1;
		const up = 1;

		if (aIsPlaying === true && bIsPlaying === false) {
			return down;
		}

		if (aIsPlaying === false && bIsPlaying === true) {
			return up;
		}

		if (aType === 'top' && bType !== 'top') {
			return down;
		}

		if (aType !== 'top' && bType === 'top') {
			return up;
		}

		if ((aType !== 'top' && bType !== 'top') || (aType === 'top' && bType === 'top')) {

			if (aVotes === bVotes) {

				if (aTimestamp === bTimestamp) {
					return 0;
				}

				if (aTimestamp > bTimestamp) {
					return up;
				}

				return down;
			}

			return aVotes > bVotes ? down : up;
		}

		return 0;
	},

	// Order by timestamp desc
	sortByTimestamp(a, b) {

		const aTimestamp = a.timestamp;
		const bTimestamp = b.timestamp;

		if (aTimestamp > bTimestamp) {
			return -1;
		}

		return 1;
	},

	// Order by timestamp asc
	sortByTitle(a, b) {

		const aTitle = a.title;
		const bTitle = b.title;

		if (aTitle > bTitle) {
			return 1;
		}

		return -1;
	},

	jsonToArray(json) {

		const array = [];

		for (const key in json) {
			// no-prototype-builtins
			if (Object.hasOwnProperty.call(json, key)) {
				const object = json[key];
				array.push(object);
			}
		}

		return array;
	},

	getType(object) {
		return ({}).toString.call(object).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
	},

	cloneObject(object) {
		return Object.assign({}, object);
	},

	arrayIndexOf(array, key, value) {

		for (let i = 0, k = array.length; i < k; i += 1) {
			if (array[i][key] === value) {
				return i;
			}
		}

		return -1;
	},

	isGuestUser(environment) {

		const auth = this.getCookie('auth');

		if (auth || environment === 'DEV') {
			return false;
		}

		return true;
	},

	getCookie(cname) {

		const cookieData = document.cookie.split(';');
		const name = `${cname}=`;

		for (let index = 0; index < cookieData.length; index += 1) {

			let cookieChunk = cookieData[index];

			while (cookieChunk.charAt(0) === ' ') {
				cookieChunk = cookieChunk.substring(1);
			}

			if (cookieChunk.indexOf(name) === 0) {
				return cookieChunk.substring(name.length, cookieChunk.length);
			}
		}

		return false;
	},

	updatePageTitle(page) {
		document.title = `player | ${page}`;
		document.getElementById('header-title').innerHTML = page;
	}

};

export default Utilities;