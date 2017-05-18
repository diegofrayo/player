// npm libs
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// styles
import styles from './PlayButton.less';

const PlayButton = ({
	changePlayerState,
	playerState
}) => {

	const className = classnames('material-icons u-material-icons--28', styles.controlButtons);

	if (playerState === 'PLAYING') {
		return <i className={className} onClick={changePlayerState}>&#xE034;</i>;
	}

	return <i className={className} onClick={changePlayerState}>&#xE037;</i>;
};

PlayButton.propTypes = {
	changePlayerState: PropTypes.func.isRequired,
	playerState: PropTypes.string.isRequired
};

export default PlayButton;