// dependency
import React from 'react'
import { Routes, Route } from 'react-router-dom'

// components
import Login from 'components/Login'
import MyPage from 'components/MyPage'
import Error from 'components/Error'

function Router() {
	return (
		<div className="container">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/mypage" element={<MyPage />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</div>
	)
}
export default Router
