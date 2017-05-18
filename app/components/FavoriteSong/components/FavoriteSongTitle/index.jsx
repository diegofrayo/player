// npm libs
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// styles
import styles from './FavoriteSongTitle.less';

const FavoriteSongTitle = ({
	children,
	onClickTitle,
	showInput,
	title
}) => (
	<div>
		<p className={classnames('u-cut-text', styles.title, { 'u-hide': showInput === true })} title={title} onClick={onClickTitle}>
			{title}
		</p>
		{children}
	</div>
);

FavoriteSongTitle.propTypes = {
	children: PropTypes.element.isRequired,
	onClickTitle: PropTypes.func.isRequired,
	showInput: PropTypes.bool,
	title: PropTypes.string.isRequired
};

FavoriteSongTitle.defaultProps = {
	showInput: false
};

export default FavoriteSongTitle;