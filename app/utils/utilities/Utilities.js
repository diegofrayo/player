/* eslint indent: "off" */

const Utilities = {

	getDurationInSeconds(duration) {

		const split = duration.split(':');
		const seconds = parseInt(split[1], 10);
		const minutes = parseInt(split[0], 10);

		return seconds + (minutes * 60);
	},

	convertStringToNumber(numberStr, noPutFirstZero) {

		const number = parseFloat(numberStr, 10);

		if (isNaN(number)) {
			return '00';
		}

		if (number < 10 && !noPutFirstZero) {
			return `0${number}`;
		}

		return number;
	},

	normalizeDuration(durationParam) {

		let hours;
		let minutes;
		let seconds;

		let duration = durationParam.replace('PT', '');
		duration = duration.replace('H', ':');
		duration = duration.replace('M', ':');
		duration = duration.replace('S', '');

		const arrayDuration = duration.split(':');

		switch (arrayDuration.length) {

			case 1:
				// only seconds
				minutes = '0';
				seconds = this.convertStringToNumber(arrayDuration[0]);
				return `${minutes}:${seconds}`;

			case 2:
				// seconds and minutes
				minutes = this.convertStringToNumber(arrayDuration[0], true);
				seconds = this.convertStringToNumber(arrayDuration[1]);
				return `${minutes}:${seconds}`;

			case 3:
				// hours, seconds and minutes
				hours = this.convertStringToNumber(arrayDuration[0], true);
				minutes = this.convertStringToNumber(arrayDuration[1]);
				seconds = this.convertStringToNumber(arrayDuration[2]);
				return `${hours}:${minutes}:${seconds}`;

			default:
				return null;
		}
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

		Object.keys(json).map((key) => {
			const object = json[key];
			if (object !== undefined) {
				array.push(object);
			}
		});

		return array;
	},

	getType(object) {
		return ({}).toString.call(object).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
	},

	cloneObject(source, dest, newData) {
		return Object.assign({}, dest, newData);
	},

	createFavoriteSong(song) {

		const newSong = {
			timestamp: new Date().getTime()
		};
		const properties = [
			'duration',
			'source_id',
			'thumbnail',
			'title',
		];

		properties.forEach((property) => {
			newSong[property] = song[property];
		});

		return newSong;
	},

	createPlaylistSong(song) {

		const newSong = {
			is_playing: false,
			type: 'normal',
			votes: 0
		};
		const properties = [
			'duration',
			'is_playing',
			'source_id',
			'thumbnail',
			'title',
			'type',
			'votes'
		];

		properties.forEach((property) => {
			if (song[property] !== undefined) {
				newSong[property] = song[property];
			}
		});

		return newSong;
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

		if (auth || environment === 'development') {
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
	},

	getFavoriteSongCustomTitle(songTitle) {

		const songTitleWords = songTitle.split('-');

		if (songTitleWords.length >= 2) {
			return songTitleWords[1].trim();
		}

		return songTitle[0].trim();
	},

	getFavoritesGroupSongsByTitle(groups, songTitle) {

		const songTitleWords = songTitle.split('-');

		if (songTitleWords.length >= 2) {
			const artist = songTitleWords[0].trim();
			return groups[artist];
		}

		return groups.Others;
	},

	getFavoritesGroupSongsBySourceId(groups, songSourceId) {

		const keys = Object.keys(groups);

		for (let i = 0, length1 = keys.length; i < length1; i += 1) {

			const group = groups[keys[i]];
			const songs = group.songs;

			for (let j = 0, length2 = songs.length; j < length2; j += 1) {

				const song = songs[j];

				if (song.source_id === songSourceId) {
					return group;
				}
			}
		}

		return undefined;
	},

	createFavoritesGroupSongs(song) {

		const songTitle = song.title;
		const songTitleWords = songTitle.split('-');
		let artist;

		if (songTitleWords.length >= 2) {
			artist = songTitleWords[0].trim();
		} else {
			artist = 'Others';
		}

		return {
			is_opened: false,
			songs: [song],
			title: artist
		};
	},

	structureFavoritesList(favorites) {

		const songs = {
			number: favorites.length,
			groups: {},
			source_ids: []
		};

		favorites.forEach((song) => {

			const songTitle = song.title;
			let group = this.getFavoritesGroupSongsByTitle(songs.groups, songTitle);
			const newSong = this.cloneObject({}, song, {
				customTitle: this.getFavoriteSongCustomTitle(songTitle)
			});

			if (!group) {
				group = this.createFavoritesGroupSongs(newSong);
				songs.groups[group.title] = group;
			} else {
				group.songs.push(newSong);
			}

			songs.source_ids.push(song.source_id);
		});

		return songs;
	}

};

export default Utilities;