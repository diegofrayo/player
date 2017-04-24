// npm libs
import PropTypes from 'prop-types';
import React from 'react';

// styles
import styles from './Thumbnail.less';

const Thumbnail = ({
	duration,
	thumbnailUrl
}) => (
	<div className={styles.thumbnailWrapper}>
		<img src={thumbnailUrl} alt="song-thumbnail" className={styles.thumbnailImg} />
		<p className={`u-text-right u-position-right-bottom u-gradient ${styles.thumbnailDuration}`}>
			{duration}
		</p>
	</div>
);

Thumbnail.propTypes = {
	duration: PropTypes.string.isRequired,
	thumbnailUrl: PropTypes.string.isRequired
};

export default Thumbnail;