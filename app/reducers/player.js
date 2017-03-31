/* eslint consistent-return: "off" */
/* eslint indent: "off" */

// npm libs
import update from 'immutability-helper';

// redux
import {
	CLOSE_PLAYER,
	UPDATE_PLAYER_STATUS
} from 'constants/index';

export default function player(state = {}, action = {}) {

	switch (action.type) {

		case UPDATE_PLAYER_STATUS:
			return update(state, {
				status: {
					$set: 'READY',
				}
			});

		case CLOSE_PLAYER:
			return update(state, {
				close: {
					$set: action.payload.close,
				}
			});

		default:
			return state;

	}

}