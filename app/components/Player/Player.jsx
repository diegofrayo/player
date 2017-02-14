// import React from 'react';

import APP from 'utils/app.js';

import utilStyles from 'styles/util.less';
import playerStyles from './Player.less';


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
	muteState,
	isOpened
}) => (
	<i className={`material-icons ${playerStyles.controlButtons} ${utilStyles['u-material-icons--28']}`} onClick={changeMuteState} style={isOpened === true ? { display: 'inline-block' } : { display: 'none' }}>
		{muteState === true ? 'volume_off' : 'volume_up'}
	</i>
);

MuteButton.propTypes = {
	changeMuteState: React.PropTypes.func.isRequired,
	isOpened: React.PropTypes.bool.isRequired,
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
			isOpened: true,
			isLoading: true,
			muteState: false,
			playerPosition: 0,
			playerState: 'PAUSED',
			playingSong: {}
		};

		this.isFirstSong = true;

		this.addSongToFavorites = this.addSongToFavorites.bind(this);
		this.changeMuteState = this.changeMuteState.bind(this);
		this.changePlayerState = this.changePlayerState.bind(this);
		this.nextSong = this.nextSong.bind(this);
		this.onPlaylistUpdate = this.onPlaylistUpdate.bind(this);
		this.openPlayer = this.openPlayer.bind(this);

	}

	componentDidMount() {

		APP.songs_storage.initPlaylistWatchers(APP.username);

		APP.songs_storage.registerCallback('playlist', 'player', 'child_added', this.onPlaylistUpdate);
		APP.songs_storage.registerCallback('playlist', 'player', 'child_changed', this.onPlaylistUpdate);
		APP.songs_storage.registerCallback('playlist', 'player', 'child_removed', this.onPlaylistUpdate);

		APP.songs_storage.downloadPlaylist(APP.username)
			.then((playlist) => {

				this.playlist = playlist;

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
					complete: this.nextSong,
					pause: () => {

						this.setState({
							playerState: 'PAUSED'
						});

					},
					play: () => {

						this.setState({
							playerState: 'PLAYING'
						});

					},
					time: () => {

						const songDuration = APP.player.getDuration();
						const playerPosition = (100 * APP.player.getPosition()) / songDuration;

						this.setState({
							playerPosition
						});

					}
				});

				this.updatePlayingSong();

				APP.songs_storage.setPlaylistState();

			});

	}

	onPlaylistUpdate() {

		this.playlist = APP.songs_storage.getPlaylist();

		if (this.playlist.length === 0) {

			this.setState({
				playingSong: {}
			});

			APP.player.stop();

		} else if (!this.state.playingSong.title) {

			this.isFirstSong = true;
			APP.player.stop();
			this.updatePlayingSong();

		} else if (this.waitingForSongs === true && APP.player.getState() !== 'PLAYING') {

			this.nextSong();

		}

	}

	updatePlayingSong() {

		if (this.playlist.length > 0) {

			const [playingSong] = this.playlist;
			playingSong.is_playing = true;

			APP.player.loadSong(playingSong);

			let playerState = 'PLAYING';

			if (this.isFirstSong === true) {
				playerState = 'PAUSED';
			} else {
				APP.player.play();
			}

			this.setState({
				playerPosition: 0,
				playerState,
				playingSong
			});

			this.isFirstSong = false;

			APP.songs_storage.updatePlaylistSong(APP.username, playingSong);

			if (this.state.muteState === true) {
				APP.player.setVolume(0);
			}

		} else {

			this.setState({
				isLoading: false
			});

		}

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

	nextSong() {

		const [playingSong] = this.playlist;

		if (this.playlist.length > 1) {

			this.waitingForSongs = false;

			APP.songs_storage.removeSongFromPlaylist(APP.username, playingSong)
				.then(() => {

					this.updatePlayingSong();

				});

		} else {

			this.waitingForSongs = true;

		}

	}

	addSongToFavorites() {
		APP.songs_storage.addSongToFavorites(APP.username, this.state.playingSong);
	}

	render() {

		return (
			<div id="player" className={this.state.isOpened === true ? playerStyles.player__opened : playerStyles.player}>
				<div className={`text-center ${playerStyles.expandButtonContainer}`}>
					<button onClick={this.openPlayer} className={playerStyles.expandButton}>
						<i className={`material-icons ${utilStyles['u-material-icons--28']}`}>{this.state.isOpened === true ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</i>
					</button>
				</div>
				<div className={`${playerStyles.contentWrapper}`}>
					<div className={`${playerStyles.noPlayingSongContainer} text-center`} style={this.state.playingSong.title ? { display: 'none' } : { display: 'flex' }}>
						{this.state.isLoading === true ? 'Loading...' : 'There are not songs to play'}
					</div>
					<div className={this.state.isOpened === true ? `row text-center ${playerStyles.playingSongContainer}` : `row ${playerStyles.playingSongContainer}`} style={this.state.playingSong.title ? { display: 'block' } : { display: 'none' }}>
						<div className={this.state.isOpened === true ? 'col-xs-12' : 'col-xs-3 col-sm-2 text-center'}>
							<img src={this.state.playingSong.thumbnail} alt="thumbnail" className={playerStyles.songThumbnail} />
							<div id={playerStyles.playerPluginContainer}>{''}</div>
							<ProgressBar progress={this.state.playerPosition} />
						</div>
						<div className={this.state.isOpened === true ? 'col-xs-12' : 'col-xs-5 col-sm-7'}>
							<p className={playerStyles.songTitle}>
								{this.state.playingSong.title}
							</p>
							<p className={playerStyles.songDetail}>
								{this.state.playingSong.duration}
							</p>
						</div>
						<div className={this.state.isOpened === true ? 'col-xs-12' : 'col-xs-4 col-sm-3 text-center'}>
							<PlayButton changePlayerState={this.changePlayerState} playerState={this.state.playerState} />
							<i className={`material-icons ${playerStyles.controlButtons} ${utilStyles['u-material-icons--28']}`} onClick={this.nextSong}>skip_next</i>
							<i className={`material-icons ${playerStyles.controlButtons} ${utilStyles['u-material-icons--28']}`} style={this.state.isOpened === true ? { display: 'inline-block' } : { display: 'none' }} onClick={this.addSongToFavorites}>favorite</i>
							<MuteButton changeMuteState={this.changeMuteState} muteState={this.state.muteState} isOpened={this.state.isOpened} />
						</div>
					</div>
				</div>
			</div>
		);

	}

}

export default Player;