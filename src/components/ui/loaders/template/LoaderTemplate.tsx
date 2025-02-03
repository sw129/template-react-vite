import React from 'react';

import styles from './LoaderTemplate.module.css';

type LoaderProps = {
	text?: string;
	isFloating?: boolean;
	isLoading?: boolean;
	borderRadius?: string;
	fontSize?: string;
	size?: 'medium' | 'small';
	shading?: 'full' | 'partial';
};

const LoaderTemplate: React.FC<LoaderProps> = ({
	text,
	isFloating,
	isLoading = true,
	borderRadius,
	size = 'medium',
	shading = 'partial',
}) => (
	<>
		{isLoading && (
			<div
				className={`${styles.container} ${isFloating && styles.floating} ${styles[`shading-${shading}`]}`}
				style={borderRadius ? {borderRadius} : undefined}
			>
				<div className={`${styles['loader-indicator-icon']} ${styles[size]}`}>
					<div className={styles['indicator-segment0']} />
					<div className={styles['indicator-segment1']} />
					<div className={styles['indicator-segment2']} />
					<div className={styles['indicator-segment3']} />
					<div className={styles['indicator-segment4']} />
					<div className={styles['indicator-segment5']} />
					<div className={styles['indicator-segment6']} />
					<div className={styles['indicator-segment7']} />
				</div>
				{text && <span>{text}</span>}
			</div>
		)}
	</>
);

export default LoaderTemplate;
