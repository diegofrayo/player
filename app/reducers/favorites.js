/* eslint consistent-return: "off" */
/* eslint indent: "off" */

// npm libs
import update from 'immutability-helper';

// redux
import {
	ADD_SONG_TO_FAVORITES,
	FETCH_FAVORITES,
	REMOVE_SONG_FROM_FAVORITES,
	UPDATE_FAVORITE_OPENED_GROUP
} from 'constants/index';

// js utils
import Utilities from 'utils/utilities/Utilities';

export default function favorites(state = {}, action = {}) {

	let updateSongs;

	switch (action.type) {

		case ADD_SONG_TO_FAVORITES:

			updateSongs = {
				$apply: (songs) => {

					const song = Utilities.cloneObject({}, action.song, {
						customTitle: Utilities.getFavoriteSongCustomTitle(action.song.title)
					});

					// add item to source_ids array
					let newSongs = update(songs, {
						source_ids: {
							$push: [song.source_id]
						}
					});

					// increase songs number
					newSongs = update(newSongs, {
						number: {
							$set: newSongs.number + 1
						}
					});

					let group = Utilities.getFavoritesGroupSongsByTitle(newSongs.groups, song.title);

					if (!group) {

						group = Utilities.createFavoritesGroupSongs(song);

						// add new group
						newSongs = update(newSongs, {
							groups: {
								$merge: {
									[group.title]: group
								}
							}
						});

					} else {

						// add new song to group songs
						newSongs = update(newSongs, {
							groups: {
								$merge: {
									[group.title]: update(group, {
										songs: {
											$push: [song]
										}
									})
								}
							}
						});

						// sort group songs by title
						newSongs = update(newSongs, {
							groups: {
								$merge: {
									[group.title]: update(group, {
										songs: {
											$set: newSongs.groups[group.title].songs.sort(Utilities.sortByTitle)
										}
									})
								}
							}
						});

					}

					return newSongs;
				}
			};

			return update(state, {
				songs: updateSongs,
			});

		case FETCH_FAVORITES:
			return update(state, {
				errorMessage: {
					$set: '',
				},
				songs: {
					$set: action.songs
				},
				status: {
					$set: 'SUCCESS',
				}
			});

		case REMOVE_SONG_FROM_FAVORITES:

			updateSongs = {
				$apply: (songs) => {

					const song = action.song;

					// remove item from source_ids array
					let newSongs = update(songs, {
						source_ids: {
							$set: songs.source_ids.filter((sourceId) => {
								if (sourceId !== song.source_id) {
									return song;
								}
							})
						}
					});

					// decrease songs number
					newSongs = update(newSongs, {
						number: {
							$set: newSongs.number - 1
						}
					});

					const group = Utilities.getFavoritesGroupSongsBySourceId(newSongs.groups, song.source_id);

					if (group) {

						// remove song from group songs
						newSongs = update(newSongs, {
							groups: {
								$merge: {
									[group.title]: update(group, {
										songs: {
											$set: group.songs.filter((item) => {
												if (item.source_id !== song.source_id) {
													return song;
												}
											})
										}
									})
								}
							}
						});

						if (newSongs.groups[group.title].songs.length === 0) {
							// TODO: Improve this
							delete newSongs.groups[group.title];
						}

					}

					return newSongs;
				}
			};

			return update(state, {
				songs: updateSongs,
			});

		case UPDATE_FAVORITE_OPENED_GROUP:
			{

				const currentOpenedGroup = action.groupTitle;
				const previousOpenedGroup = state.opened_groups.current;

				return update(state, {
					opened_groups: {
						$set: {
							current: currentOpenedGroup,
							previous: previousOpenedGroup
						}
					},
					songs: {
						$apply: (songs) => {

							let newSongs = songs;

							if (previousOpenedGroup !== '' && state.songs.groups[previousOpenedGroup]) {
								newSongs = update(songs, {
									groups: {
										$merge: {
											[previousOpenedGroup]: update(state.songs.groups[previousOpenedGroup], {
												is_opened: {
													$set: false
												}
											})
										}
									}
								});
							}

							if (state.songs.groups[currentOpenedGroup]) {
								newSongs = update(newSongs, {
									groups: {
										$merge: {
											[currentOpenedGroup]: update(state.songs.groups[currentOpenedGroup], {
												is_opened: {
													$set: (previousOpenedGroup === currentOpenedGroup) ? !state.songs.groups[currentOpenedGroup].is_opened : true
												}
											})
										}
									}
								});
							}

							return newSongs;
						}
					}
				});

			}

		default:
			return state;

	}

}