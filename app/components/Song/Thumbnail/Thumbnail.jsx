// npm libs
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// styles
import styles from './Thumbnail.less';

const Thumbnail = ({
	duration,
	thumbnailUrl
}) => (
	<div className={classnames(styles.thumbnailWrapper)}>
		<img src={thumbnailUrl} alt="song-thumbnail" className={classnames(styles.thumbnailImg)} />
		<span className={classnames('u-text-right u-position-right-bottom', styles.thumbnailDuration)}>
			{duration}
		</span>
	</div>
);

Thumbnail.propTypes = {
	duration: PropTypes.string.isRequired,
	thumbnailUrl: PropTypes.string.isRequired
};

export default Thumbnail;