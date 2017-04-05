// npm libs
import React, {
	PropTypes
} from 'react';
import {
	connect
} from 'react-redux';

// redux
import {
	closePlayer,
	updatePlayerStatus
} from 'actions/player';

// js utils
import APP from 'utils/app.js';

// react components
import Spinner from 'components/Spinner/Spinner.jsx';

// styles
import utilStyles from 'styles/util.less';
import playerStyles from './Player.less';

// -------------------------------------------

const PlayButton = ({
	changePlayerState,
	playerState
}) => {

	const className = `material-icons ${playerStyles.controlButtons} ${utilStyles['u-material-icons--28']}`;

	if (playerState === 'PLAYING') {
		return <i className={className} onClick={changePlayerState}>&#xE034;</i>;
	}

	return <i className={className} onClick={changePlayerState}>&#xE037;</i>;
};

PlayButton.propTypes = {
	changePlayerState: PropTypes.func.isRequired,
	playerState: PropTypes.string.isRequired
};

// -------------------------------------------

const MuteButton = ({
	changeMuteState,
	isOpened,
	muteState
}) => {

	const className = `material-icons ${playerStyles.controlButtons} ${utilStyles['u-material-icons--28']}`;
	const style = isOpened === true ? {
		display: 'inline-block'
	} : {
		display: 'none'
	};

	if (muteState === true) {
		return <i className={className} onClick={changeMuteState} style={style}>&#xE04F;</i>;
	}

	return <i className={className} onClick={changeMuteState} style={style}>&#xE050;</i>;
};

MuteButton.propTypes = {
	changeMuteState: PropTypes.func.isRequired,
	isOpened: PropTypes.bool.isRequired,
	muteState: PropTypes.bool.isRequired
};

// -------------------------------------------

const ProgressBar = ({
	onClick,
	progress
}) => (
	<div className={`${playerStyles.playerProgressBarContainer}`} onClick={onClick}>
		<div className={`${playerStyles.playerProgressBarInner}`}>
			<div className={playerStyles.playerProgressBar} style={{ width: `${progress}%` }}>{''}</div>
		</div>
	</div>
);

ProgressBar.propTypes = {
	onClick: PropTypes.func.isRequired,
	progress: PropTypes.number.isRequired
};

// -------------------------------------------

class Player extends React.Component {

	constructor() {

		super();

		this.state = {
			isOpened: true,
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
		this.progressBarOnClick = this.progressBarOnClick.bind(this);
	}

	componentDidMount() {

		APP.songs_storage.fetchSongsList('playlist', APP.username);
		APP.songs_storage.initPlaylistWatchers(APP.username);

		APP.player.setup({
			container_id: playerStyles.playerPluginContainer,
			source_id: 'aP_-P_BS6KY'
		});

		APP.player.configureCallbacks({
			complete: () => this.nextSong(),
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
			ready: () => {
				this.props.updatePlayerStatusAction();
			},
			time: () => {
				const songDuration = APP.player.getDuration();
				const playerPosition = (100 * APP.player.getPosition()) / songDuration;
				this.setState({
					playerPosition
				});
			}
		});
	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.playerReducer.close === true) {
			this.props.closePlayerAction(false);
			this.setState({
				isOpened: false
			});
		} else if (nextProps.playerReducer.status === 'READY') {
			this.onPlaylistUpdate(nextProps.playlistReducer);
		}
	}

	/*
	 * This function is executed when an change happens in Playlist Store
	 */
	onPlaylistUpdate(playlistReducer) {

		if (playlistReducer.songs.length === 0) {

			this.setState({
				playingSong: {}
			});

			APP.player.stop();

		} else if (!this.state.playingSong.title) {

			this.isFirstSong = true;
			this.updatePlayingSong(playlistReducer);

		} else if (this.waitingForSongs === true && APP.player.getState() !== 'PLAYING') {

			this.nextSong(playlistReducer);

		}
	}

	updatePlayingSong(playlistReducer) {

		if (playlistReducer.songs.length > 0) {

			const [playingSong] = playlistReducer.songs;
			playingSong.is_playing = true;

			APP.player.loadSong(playingSong);

			if (this.isFirstSong !== true) {
				APP.player.play();
			}

			this.isFirstSong = false;

			this.setState({
				playerPosition: 0,
				playerState: 'PLAYING',
				playingSong
			});

			APP.songs_storage.updatePlaylistSong(APP.username, playingSong);

			if (this.state.muteState === true) {
				APP.player.setVolume(0);
			}
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

	nextSong(reducer) {

		const playlistReducer = reducer || this.props.playlistReducer;
		const [playingSong] = playlistReducer.songs;

		if (playlistReducer.songs.length > 1) {

			this.waitingForSongs = false;

			APP.songs_storage.removeSongFromPlaylist(APP.username, playingSong)
				.then(() => {
					this.updatePlayingSong(this.props.playlistReducer);
				});

		} else {
			this.waitingForSongs = true;
		}
	}

	progressBarOnClick(event) {
		if (this.state.isOpened === true && this.props.playerReducer.status === 'READY') {
			const clickPosition = event.nativeEvent.offsetX;
			const clickPositionPercent = parseInt((100 / 150) * clickPosition, 0);
			const songDuration = APP.player.getDuration();
			const position = (songDuration / 100) * clickPositionPercent;
			APP.player.setPosition(position);
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
						{this.state.isOpened === true &&
							(<i className={`material-icons ${utilStyles['u-material-icons--28']}`}>&#xE313;</i>)
						}
						{this.state.isOpened !== true &&
							(<i className={`material-icons ${utilStyles['u-material-icons--28']}`}>&#xE316;</i>)
						}
					</button>
				</div>
				<div className={`${playerStyles.contentWrapper}`}>
					<div className={`${playerStyles.noPlayingSongContainer} text-center`} style={this.props.playerReducer.status !== 'READY' ? { display: 'flex' } : { display: 'none' }}>
						<Spinner />
					</div>
					<div className={`${playerStyles.noPlayingSongContainer} text-center`} style={this.props.playlistReducer.status === 'SUCCESS' && this.props.playlistReducer.songs.length === 0 ? { display: 'flex' } : { display: 'none' }}>
						There are not songs to play
					</div>
					<div className={this.state.isOpened === true ? `row text-center ${playerStyles.playingSongContainer}` : `row ${playerStyles.playingSongContainer}`} style={this.props.playlistReducer.songs.length > 0 ? { display: 'block' } : { display: 'none' }}>
						<div className={this.state.isOpened === true ? 'col-xs-12' : 'col-xs-3 col-sm-2 text-center'}>
							<div className={playerStyles.columnPlayerInner}>
								<img src={this.state.playingSong.thumbnail} alt="thumbnail" className={playerStyles.songThumbnail} />
								<div className={playerStyles.playerPluginContainer}>
									<div id={playerStyles.playerPluginContainer}>{''}</div>
									{/*
										<div id={playerStyles.playerPluginContainer} data-video-id="aP_-P_BS6KY" data-type="youtube">{''}</div>
									*/}
								</div>
								<ProgressBar progress={this.state.playerPosition} onClick={this.progressBarOnClick} />
							</div>
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
							<i className={`material-icons ${playerStyles.controlButtons} ${utilStyles['u-material-icons--28']}`} onClick={() => this.nextSong()}>&#xE044;</i>
							<i className={`material-icons ${playerStyles.controlButtons} ${utilStyles['u-material-icons--28']}`} style={this.state.isOpened === true ? { display: 'inline-block' } : { display: 'none' }} onClick={this.addSongToFavorites}>&#xE87D;</i>
							<MuteButton changeMuteState={this.changeMuteState} muteState={this.state.muteState} isOpened={this.state.isOpened} />
						</div>
					</div>
				</div>
			</div>
		);
	}

}

const mapStateToProps = state => ({
	playerReducer: state.player,
	playlistReducer: state.playlist
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	closePlayerAction: close => dispatch(closePlayer(close)),
	updatePlayerStatusAction: () => dispatch(updatePlayerStatus())
});

Player.propTypes = {
	playerReducer: PropTypes.object.isRequired,
	playlistReducer: PropTypes.object.isRequired,
	closePlayerAction: PropTypes.func.isRequired,
	updatePlayerStatusAction: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);