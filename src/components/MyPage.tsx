// dependency
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logOut, getUserId, getIsAutoLogIn } from 'services/login'

// components
import Button from 'components/atoms/Button'

function MyPage() {
	const userId = getUserId()
	const navigate = useNavigate()
	useEffect(() => {
		if (!userId) {
			return navigate('/')
		}
		// 자동 로그인 체크가 아닐 경우, 새로고침 할 때 메인 페이지로 가는 것을 보여주기 위한 시연 코드.
		if (!getIsAutoLogIn()) {
			logOut()
		}
	}, [userId])
	const onClickLogOutButton = () => {
		logOut()
		navigate('/')
	}
	return (
		<>
			<div id="welcomePanel">
				로그인이 되었습니다. <br />
				{userId} 님 환영합니다.
			</div>
			<br />
			<Button
				id="logoutButton"
				text="로그아웃 하기"
				onClick={onClickLogOutButton}
			/>
		</>
	)
}

export default MyPage
