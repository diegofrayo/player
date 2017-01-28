// import React from 'react';

import APP from 'utils/app.js';

import utilStyles from 'styles/util.css';
import playerStyles from './Player.css';


const PlayButton = ({
	changePlayerState,
	playerState
}) => (
	<i className={`material-icons ${playerStyles.controlButtons} ${utilStyles['u-material-icons--28']}`} onClick={changePlayerState}>
		{playerState === 'PLAYING' ? 'pause' : 'play_arrow'}
	</i>
);

PlayButton.propTypes = {
	changePlayerState: React.PropTypes.func.isRequired,
	playerState: React.PropTypes.string.isRequired
};


const MuteButton = ({
	changeMuteState,
	muteState
}) => (
	<i className={`material-icons ${playerStyles.controlButtons} ${utilStyles['u-material-icons--28']}`} onClick={changeMuteState}>
		{muteState === true ? 'volume_off' : 'volume_up'}
	</i>
);

MuteButton.propTypes = {
	changeMuteState: React.PropTypes.func.isRequired,
	muteState: React.PropTypes.bool.isRequired
};


const ProgressBar = ({
	progress
}) => (
	<div id={playerStyles.playerProgressBar} className={playerStyles.playerProgressBar}>
		<div className={playerStyles.playerProgressBarInner} style={{ width: `${progress}%` }}>{''}</div>
	</div>
);

ProgressBar.propTypes = {
	progress: React.PropTypes.number.isRequired
};


class Player extends React.Component {

	constructor() {

		super();

		this.state = {
			isOpened: false,
			muteState: false,
			playerPosition: 0,
			playerState: 'PAUSED'
		};

		this.changeMuteState = this.changeMuteState.bind(this);
		this.changePlayerState = this.changePlayerState.bind(this);
		this.openPlayer = this.openPlayer.bind(this);

	}

	componentWillMount() {

		setTimeout(() => {

			APP.player.setup({
				container_id: playerStyles.playerPluginContainer,
				source_id: 'aP_-P_BS6KY',
				key: 'h97SPVY9oEJMHKhqc2vKipwiGipeHUoFkXLNNA',
				skin: {
					name: 'custom-skin'
				}
			});

			APP.player.setVolume(100);

			APP.player.configureCallbacks({
				time: () => {

					const songDuration = APP.player.getDuration();
					const playerPosition = (100 * APP.player.getPosition()) / songDuration;

					this.setState({
						playerPosition
					});

				}
			});

		}, 1000);

	}

	openPlayer() {

		this.setState({
			isOpened: !this.state.isOpened
		});

	}

	changePlayerState() {

		let playerState = APP.player.getState();

		if (playerState === 'PLAYING') {
			APP.player.pause();
			playerState = 'PAUSED';
		} else {
			APP.player.play();
			playerState = 'PLAYING';
		}

		this.setState({
			playerState
		});

		if (this.state.muteState === true) {
			APP.player.setVolume(0);
		}

	}

	changeMuteState() {

		let muteState = APP.player.getMute();

		if (muteState === true) {
			APP.player.setVolume(100);
		} else {
			APP.player.setMute();
		}

		muteState = !muteState;

		this.setState({
			muteState
		});

	}

	render() {

		return (
			<div id="player" className={this.state.isOpened === true ? playerStyles.player__opened : playerStyles.player}>
				<div className="text-center">
					<button onClick={this.openPlayer} className={playerStyles.expandButton}>
						<i className="material-icons">{this.state.isOpened === true ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</i>
					</button>
				</div>
				<div className={this.state.isOpened === true ? `row text-center ${playerStyles.contentWrapper__opened}` : `row ${playerStyles.contentWrapper}`}>
					<div className={this.state.isOpened === true ? 'col-xs-12' : 'col-xs-3 col-sm-2 text-center'}>
						<img src="https://i.ytimg.com/vi/aP_-P_BS6KY/mqdefault.jpg" alt="thumbnail" className={playerStyles.songThumbnail} />
						<div id={playerStyles.playerPluginContainer}>{''}</div>
						<ProgressBar progress={this.state.playerPosition} />
					</div>
					<div className={this.state.isOpened === true ? 'col-xs-12' : 'col-xs-5 col-sm-7'}>
						<p className={playerStyles.songTitle}>
							Chet Faker - Dead Body
						</p>
						<p className={playerStyles.songDetail}>
							5:03
						</p>
					</div>
					<div className={this.state.isOpened === true ? 'col-xs-12' : 'col-xs-4 col-sm-3 text-center'}>
						<PlayButton changePlayerState={this.changePlayerState} playerState={this.state.playerState} />
						<i className={`material-icons ${playerStyles.controlButtons} ${utilStyles['u-material-icons--28']}`}>skip_next</i>
						<MuteButton changeMuteState={this.changeMuteState} muteState={this.state.muteState} />
					</div>
				</div>
			</div>
		);

	}

}

export default Player;