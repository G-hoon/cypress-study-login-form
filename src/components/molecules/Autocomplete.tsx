// dependency
import React, { useState } from 'react'
import { useEffect } from 'react'

// components
import Input from '../atoms/Input'

interface IAutocompleteProps {
	id?: string
	value: string
	options: string[]
	isShowOptions: boolean
	prefixTextForOptions?: string
	className?: string
	placeholder?: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	onBlurHander?: () => void
	onClickItem?: (value: string | null) => void
}

export default function Autocomplete(props: IAutocompleteProps) {
	const [isFocus, setIsFocus] = useState<boolean>(false)
	const [activeItemIndex, setActiveItemIndex] = useState<number>(-1)
	const {
		id,
		value,
		options,
		isShowOptions,
		prefixTextForOptions,
		className,
		placeholder,
		onChange,
		onBlurHander,
		onClickItem
	} = props

	useEffect(() => {
		if (activeItemIndex === options.length) {
			setActiveItemIndex(-1)
		}
		if (activeItemIndex < -1) {
			setActiveItemIndex(options.length - 1)
		}
	}, [activeItemIndex])

	const onFocusInput = () => {
		setIsFocus(true)
	}

	const onBlurInput = () => {
		if (activeItemIndex < 0) {
			setIsFocus(false)
		}
		onBlurHander?.()
	}

	const onClickOption = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		onClickItem?.(e.currentTarget.textContent)
		setActiveItemIndex(-1)
		setIsFocus(false)
	}

	const onMouseOver = (
		e: React.MouseEvent<HTMLLIElement, MouseEvent>,
		index: number
	) => {
		setActiveItemIndex(index)
	}

	const onMouseOut = () => {
		setActiveItemIndex(-1)
	}

	const onKeyPressInput: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'ArrowDown' || e.code === 'ArrowDown') {
			setActiveItemIndex((prevIndex) => prevIndex + 1)
		}
		if (e.key === 'ArrowUp' || e.code === 'ArrowUp') {
			setActiveItemIndex((prevIndex) => prevIndex - 1)
		}
		if (
			e.currentTarget.value &&
			activeItemIndex > -1 &&
			(e.key === 'Enter' || e.code === 'Enter')
		) {
			onClickItem?.(prefixTextForOptions + options[activeItemIndex])
			setActiveItemIndex(-1)
		}
	}

	return (
		<div className={className}>
			<Input
				id={id}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				fullWidth
				onFocus={onFocusInput}
				onBlur={onBlurInput}
				onKeyUp={onKeyPressInput}
			/>
			{isShowOptions && isFocus && (
				<div className="option-panel">
					<ul>
						{options.map((item, index) => (
							<li
								key={item}
								className={`option-item ${
									activeItemIndex === index ? 'selected-item' : ''
								}`}
								onClick={(e) => onClickOption(e)}
								onMouseOver={(e) => onMouseOver(e, index)}
								onMouseOut={onMouseOut}
							>
								{prefixTextForOptions}
								<span
									style={{
										color: 'gray'
									}}
								>
									{item}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}
