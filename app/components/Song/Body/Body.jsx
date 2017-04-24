// npm libs
import PropTypes from 'prop-types';
import React from 'react';

// react components
import SongTitle from 'components/Song/Title/Title.jsx';

// styles
import styles from './Body.less';

function updateChildClassName(child, index) {

	const customProps = {
		key: `${child.type}-${index}`
	};

	if (child.type === 'button') {
		customProps.className = styles.button;
	}

	const props = Object.assign({}, child.props, customProps);

	return React.cloneElement(child, props);
}

const Body = ({
	children,
	title,
	titleComponent
}) => (
	<div className={styles.wrapper}>
		{titleComponent && titleComponent}
		{!titleComponent && <SongTitle title={title} />}
		<div className="u-text-center" style={{ margin: '5px 0' }}>
			{children.map((child, index) => updateChildClassName(child, index))}
		</div>
	</div>
);

Body.propTypes = {
	children: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	titleComponent: PropTypes.element
};

export default Body;