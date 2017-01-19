import APP from 'utils/app';
import List from 'utils/classes/List';
import RequestResponse from 'utils/classes/RequestResponse';
import Song from 'utils/classes/Song';
import SongUtilities from 'utils/utilities/SongUtilities';

export default class YoutubeSearcher {

	constructor(configuration) {
		this.configuration = configuration;
	}

	searchSongs(query) {

		const promise = APP.promise.createPromise((resolve, reject) => {

			const apiKey = this.configuration.api_key;
			const urlRequest1 = `https://www.googleapis.com/youtube/v3/search?videoEmbeddable=true&order=relevance&part=id&q=${query}&type=video&maxResults=20&key=${apiKey}`;

			const errorCallback = (response) => {

				let message = 'GENERAL_ERROR';

				if (response.status === 0) {
					message = 'NETWORK_ERROR';
				}

				return new RequestResponse('Error', message, {});
			};

			const successCallback1 = (response) => {

				const resourcesId = this.getResourcesIdFromYoutubeResponse(response.items);

				if (resourcesId === '') {
					return new RequestResponse('Error', 'SEARCHS_SONGS_NOT_FOUND', {});
				}

				return new RequestResponse('Success', '', {
					resources_id: resourcesId
				});
			};

			APP.http.get(urlRequest1, {}, successCallback1.bind(this), errorCallback)
				.then((response) => {

					const urlRequest2 = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails&id=${response.data.resources_id}&key=${apiKey}`;

					const successCallback2 = (callbackResponse) => {

						const songs = this.getSongsListFromYoutubeResponse(callbackResponse.items);

						let finalResponse = {
							songs
						};

						if (songs.size() === 0) {
							finalResponse = new RequestResponse('Error', 'SEARCHS_SONGS_NOT_FOUND', finalResponse);
						} else {
							finalResponse = new RequestResponse('Success', '', finalResponse);
						}

						return finalResponse;
					};

					APP.http.get(urlRequest2, {}, successCallback2.bind(this), errorCallback)
						.then((callbackResponse) => {
							resolve(callbackResponse);
						})
						.catch((callbackResponse) => {
							reject(callbackResponse);
						});

				})
				.catch((response) => {
					reject(response);
				});

		});

		return promise;
	}

	getResourcesIdFromYoutubeResponse(items) {

		let resourcesId = '';

		items.forEach((item) => {
			resourcesId += `${item.id.videoId},`;
		});

		resourcesId = resourcesId.substring(0, resourcesId.length - 1);

		return resourcesId;
	}

	getSongsListFromYoutubeResponse(items) {

		const songsList = new List();

		items.forEach((item) => {

			if (item.snippet.categoryId === '10') {

				const duration = SongUtilities.normalizeDuration(item.contentDetails.duration);

				if (duration !== null) {

					const sourceId = item.id;
					const thumbnail = item.snippet.thumbnails.medium.url;
					const title = item.snippet.title;

					const song = new Song(duration, sourceId, thumbnail, title);

					songsList.add(song);
				}
			}
		});

		return songsList;
	}

}