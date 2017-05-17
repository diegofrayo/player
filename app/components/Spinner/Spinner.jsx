// npm libs
import classnames from 'classnames';
import React from 'react';

// styles
import styles from './Spinner.less';

const Spinner = () => (
	<div className={classnames(styles.container)}>
		<div className={classnames(styles.containerInner)}>
			<img src="/assets/player/images/spinner.svg" alt="spinner" />
		</div>
	</div>
);

export default Spinner;