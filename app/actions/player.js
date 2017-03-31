// redux
import {
	CLOSE_PLAYER,
	UPDATE_PLAYER_STATUS
} from 'constants/index';

export function closePlayer(close) {
	return {
		type: CLOSE_PLAYER,
		payload: {
			close
		}
	};
}

export function updatePlayerStatus() {
	return {
		type: UPDATE_PLAYER_STATUS
	};
}