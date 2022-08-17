import React from 'react'

interface IInputProps {
	id?: string
	type?: 'text' | 'password'
	value?: string
	className?: string
	placeholder?: string
	autoComplete?: 'off' | 'on'
	required?: boolean
	fullWidth?: boolean
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>
	onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>
	onFocus?: React.FocusEventHandler<HTMLInputElement>
	onBlur?: React.FocusEventHandler<HTMLInputElement>
}

export default function Input(props: IInputProps) {
	const { fullWidth, className = '', ...otherProps } = props
	const inputClassName = `${className} ${fullWidth ? 'fullWidth' : ''}`
	return (
		<input
			className={inputClassName}
			style={{
				boxSizing: 'border-box'
			}}
			{...otherProps}
		/>
	)
}

Input.defaultProps = {
	type: 'text',
	autoComplete: 'off'
}
