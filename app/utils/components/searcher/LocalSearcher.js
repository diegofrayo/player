import APP from 'utils/app';
import List from 'utils/classes/List';
import RequestResponse from 'utils/classes/RequestResponse';
import Song from 'utils/classes/Song';
import Utilities from 'utils/utilities/Utilities';

export default class LocalSearcher {

	constructor(configuration) {
		this.configuration = configuration;
	}

	searchSongs() {

		const promise = APP.promise.createPromise((resolve, reject) => {

			const urlRequest = '/assets/json/search.json';

			const errorCallback = (response) => {

				let message = 'GENERAL_ERROR';

				if (response.status === 0) {
					message = 'NETWORK_ERROR';
				}

				return new RequestResponse('Error', message, {});
			};

			const successCallback = (callbackResponse) => {

				const songs = this.getSongsListFromYoutubeResponse(callbackResponse.items);

				let response = {
					songs
				};

				if (songs.size() === 0) {
					response = new RequestResponse('Error', 'SEARCHS_SONGS_NOT_FOUND', response);
				} else {
					response = new RequestResponse('Success', '', response);
				}

				return response;
			};

			APP.http.get(urlRequest, {}, successCallback.bind(this), errorCallback)
				.then((response) => {
					resolve(response);
				})
				.catch((response) => {
					reject(response);
				});

		});

		return promise;
	}

	getSongsListFromYoutubeResponse(items) {

		const songsList = new List();

		items.forEach((item) => {

			if (item.snippet.categoryId === '10') {

				const duration = Utilities.normalizeDuration(item.contentDetails.duration);

				if (duration !== null) {

					const sourceId = item.id;
					const thumbnail = item.snippet.thumbnails.medium.url;
					const {
						title
					} = item.snippet;

					const song = new Song(duration, sourceId, thumbnail, title);

					songsList.add(song);
				}
			}
		});

		return songsList;
	}

}