// dependency
import React, { useState } from 'react'

// components
import Input from 'components/atoms/Input'

interface IPasswordProps {
	id?: string
	value?: string
	className?: string
	placeholder?: string
	fullWidth?: boolean
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	onBlur?: React.FocusEventHandler<HTMLInputElement>
}

export default function Password(props: IPasswordProps) {
	const { value, ...otherProps } = props
	const [isPasswordType, setPasswordType] = useState<boolean>(true)
	const toggleInputType = () => {
		setPasswordType((isPasswordType) => !isPasswordType)
	}
	return (
		<>
			<Input
				value={value}
				{...otherProps}
				type={isPasswordType ? 'password' : 'text'}
			/>
			{value && (
				<span
					onClick={toggleInputType}
					style={{
						marginLeft: -50,
						cursor: 'pointer'
					}}
				>
					{isPasswordType ? 'show' : 'hide'}
				</span>
			)}
		</>
	)
}
