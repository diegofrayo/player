// npm libs
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// styles
import styles from './MuteButton.less';

const MuteButton = ({
	changeMuteState,
	isOpened,
	muteState
}) => {

	const className = classnames('material-icons u-material-icons--28', styles.controlButtons, {
		'u-hide': !isOpened
	}, {
		'u-display-inline': isOpened
	});

	if (muteState === true) {
		return <i className={classnames(className)} onClick={changeMuteState}>&#xE04F;</i>;
	}

	return <i className={classnames(className)} onClick={changeMuteState}>&#xE050;</i>;
};

MuteButton.propTypes = {
	changeMuteState: PropTypes.func.isRequired,
	isOpened: PropTypes.bool.isRequired,
	muteState: PropTypes.bool.isRequired
};

export default MuteButton;