export function logIn({
	id,
	isAutoLogin
}: {
	id: string
	isAutoLogin: boolean
}) {
	localStorage.setItem('loginInfo', JSON.stringify({ id, isAutoLogin }))
}

export function logOut() {
	localStorage.removeItem('loginInfo')
}

export function getIsAutoLogIn(): boolean {
	const authInfo = localStorage.getItem('loginInfo')
	if (authInfo) {
		return JSON.parse(authInfo).isAutoLogin
	}
	return false
}

export function getUserId(): string {
	const authInfo = localStorage.getItem('loginInfo')
	if (authInfo) {
		return JSON.parse(authInfo).id
	}
	return ''
}
