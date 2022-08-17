// dependency
import { useState, useCallback } from 'react'

export default function useInput<T extends string>(
	initialValue: T,
	isErrorCondtion?: (value: T) => boolean
) {
	const [value, setValue] = useState<T>(initialValue)
	const [isError, setError] = useState<boolean>(false)
	const onChangeHandler = useCallback(
		(e) => {
			setValue(e.target.value)
			setError(Boolean(isErrorCondtion?.(e.target.value)))
		},
		[isErrorCondtion]
	)
	const onBlurHandler = () => {
		if (isInValid(value)) {
			setError(true)
		}
	}
	const isInValid = (inputValue: T): boolean => {
		return Boolean(isErrorCondtion?.(inputValue))
	}
	return {
		value,
		onChange: onChangeHandler,
		onBlur: onBlurHandler,
		isError
	}
}
