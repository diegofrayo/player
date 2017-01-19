export default class Song {

	constructor(duration, sourceId, thumbnail, title) {
		this.duration = duration;
		this.source_id = sourceId;
		this.thumbnail = thumbnail;
		this.title = title;
		this.timestamp = +new Date();
	}

}