import React from 'react'

interface IButtonProps {
	id?: string
	text?: string
	colorMode?: 'black' | 'white'
	className?: string
	disabled?: boolean
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button(props: IButtonProps) {
	const { text, colorMode, onClick, disabled, ...otherProps } = props
	const textColor = colorMode === 'black' ? 'white' : 'black'
	return (
		<button
			style={{
				padding: '5px',
				color: textColor,
				backgroundColor: colorMode
			}}
			onClick={onClick}
			disabled={disabled}
			{...otherProps}
		>
			{text}
		</button>
	)
}

Button.defaultProps = {
	text: 'button',
	colorMode: 'white'
}
