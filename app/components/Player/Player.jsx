// import React from 'react';

import utilStyles from 'styles/util.css';
import playerStyles from './Player.css';

class Player extends React.Component {

	constructor() {

		super();

		this.state = {
			isOpened: false
		};

		this.openPlayer = this.openPlayer.bind(this);

	}

	openPlayer() {

		this.setState({
			isOpened: !this.state.isOpened
		});

	}

	render() {

		if (this.state.isOpened === true) {

			return (
				<div onClick={this.openPlayer} id="player" className={playerStyles.player__opened}>
					<div className="text-center">
						<button onClick={this.openPlayer} className={playerStyles.expandButton}>
							<i className="material-icons">keyboard_arrow_down</i>
						</button>
					</div>
					<div className={`row text-center ${playerStyles.contentWrapper__opened}`}>
						<div className="col-xs-12">
							<img src="https://i.ytimg.com/vi/aP_-P_BS6KY/mqdefault.jpg" alt="thumbnail" className={playerStyles.songThumbnail__opened} />
						</div>
						<div className="col-xs-12">
							<p className={playerStyles.songTitle__opened}>
								Chet Faker - Dead Body
							</p>
							<p className={playerStyles.songDetail__opened}>
								5:03
							</p>
						</div>
						<div className="col-xs-12">
							<i className={`material-icons ${playerStyles.controlButtons__opened} ${utilStyles['u-material-icons--36']}`}>play_arrow</i>
							<i className={`material-icons ${playerStyles.controlButtons__opened} ${utilStyles['u-material-icons--36']}`}>skip_next</i>
						</div>
					</div>
				</div>
			);

		}

		return (
			<div id="player" className={playerStyles.player}>
				<div className="text-center">
					<button onClick={this.openPlayer} className={playerStyles.expandButton}>
						<i className="material-icons">keyboard_arrow_up</i>
					</button>
				</div>
				<div className={`row ${playerStyles.contentWrapper}`}>
					<div className="col-xs-3 col-sm-2 text-center">
						<img src="https://i.ytimg.com/vi/aP_-P_BS6KY/mqdefault.jpg" alt="thumbnail" className={playerStyles.songThumbnail} />
					</div>
					<div className="col-xs-5 col-sm-7">
						<p className={playerStyles.songTitle}>
							Chet Faker - Dead Body
						</p>
						<p className={playerStyles.songDetail}>
							5:03
						</p>
					</div>
					<div className="col-xs-4 col-sm-3 text-center">
						<i className={`material-icons ${playerStyles.controlButtons} ${utilStyles['u-material-icons--36']}`}>play_arrow</i>
						<i className={`material-icons ${playerStyles.controlButtons} ${utilStyles['u-material-icons--36']}`}>skip_next</i>
					</div>
				</div>
			</div>
		);

	}

}

export default Player;