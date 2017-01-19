import {
	FirebaseImplementationClass,
	FIREBASE_CONNECTION
} from 'utils/components/songs-storage/FirebaseImplementation';

export default class SongsStorageFactory {

	createInstance(className) {

		if (className === 'FirebaseImplementationClass') {
			this.songsStorageInstance = new FirebaseImplementationClass(FIREBASE_CONNECTION);
		}

		return this.songsStorageInstance;
	}

	getInstance() {
		return this.songsStorageInstance;
	}

}