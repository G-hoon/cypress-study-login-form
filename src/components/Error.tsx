// dependency
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logOut } from 'services/login'

// components
import Button from 'components/atoms/Button'

export default function Error() {
	const navigate = useNavigate()
	const onClickHomeButton = () => {
		logOut()
		navigate('/')
	}
	return (
		<>
			<div>잘못된 접근입니다</div>
			<br />
			<Button text="홈으로 돌아가기" onClick={onClickHomeButton} />
		</>
	)
}
