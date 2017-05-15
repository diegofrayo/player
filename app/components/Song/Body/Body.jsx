// npm libs
import PropTypes from 'prop-types';
import React from 'react';

// js utils
import Utilities from 'utils/utilities/Utilities';

// react components
import SongTitle from 'components/Song/Title/Title.jsx';

// styles
import styles from './Body.less';

function updateChildClassName(child, index) {

	const customProps = {
		key: `${child.type}-${index}`
	};

	if (child.type === 'button') {
		customProps.className = `${styles.button} ${(customProps.className ? customProps.className : '')}`.trim();
	}

	const props = Utilities.cloneObject({}, child.props, customProps);

	return React.cloneElement(child, props);
}

const Body = ({
	children,
	hideButtons,
	title,
	titleComponent
}) => (
	<div className={styles.wrapper}>
		{titleComponent && titleComponent}
		{!titleComponent && <SongTitle title={title} />}
		<div className="u-text-center" style={{ margin: '5px 0', display: hideButtons === false ? 'block' : 'none' }}>
			{children.map((child, index) => updateChildClassName(child, index))}
		</div>
	</div>
);

Body.propTypes = {
	children: PropTypes.array.isRequired,
	hideButtons: PropTypes.bool,
	title: PropTypes.string.isRequired,
	titleComponent: PropTypes.element
};

Body.defaultProps = {
	hideButtons: false
};

export default Body;