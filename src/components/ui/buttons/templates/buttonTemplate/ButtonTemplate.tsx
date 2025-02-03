import React, {type CSSProperties,type ReactNode, useRef} from 'react';

// ToDo
// import Loader from '../../../../Loader/Loader';
// import {type TooltipPosition, TooltipTemplate} from '../../../Message';
import styles from './ButtonTemplate.module.css';

export type ButtonTemplateCommonProps = {
	// States
	disable?: boolean;
	isActive?: boolean;
	isLoading?: boolean;
	isError?: boolean;
	// Tooltip
	// tooltipMessage?: string;
	// tooltipPosition?: TooltipPosition;
	// Button
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	title?: string;
	type?: 'submit' | 'reset' | 'button';
	role?: React.AriaRole;
	style?: CSSProperties;
	id?: string;
	children?: ReactNode;
}

export type ButtonTemplateProps = {
	className?: string;
} & ButtonTemplateCommonProps;

const ButtonTemplate: React.FC<ButtonTemplateProps> = ({
	onClick,
	className,
	// tooltipMessage,
	// tooltipPosition = 'top',
	children,
	type = 'button',
	role = 'button',
	isLoading = false,
	isError,
	isActive,
	disable,
	...props
}) => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	return (
		<button
			type={type}
			className={`${styles.template}${className ? ` ${className}` : ''}`}
			onClick={e => {
				if (onClick) {
					e.stopPropagation();
					onClick(e);
				}
			}}
			disabled={isLoading || disable}
			role={role}
			ref={buttonRef}
			data-loading={isLoading}
			data-error={isError}
			data-active={isActive}
			{...props}
		>
			<div className={styles['button-content']}>
				{children}
			</div>
			{/* <Loader isLoading={isLoading} isFloating />
			{tooltipMessage && (
				<TooltipTemplate
					targetRef={buttonRef}
					position={tooltipPosition}
				>
					{<span>{tooltipMessage}</span>}
				</TooltipTemplate>
			)} */}
		</button>
	);
};

export default ButtonTemplate;
