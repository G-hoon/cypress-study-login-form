/// <reference types="cypress" />

// 테스트 시나리오
// ---- 초기 화면 관련 ----
// 1. 초기 화면에 이메일과 비밀번호, 그리고 자동 로그인 체크박스가 모두 빈 칸으로 있는가
// ---- validation 관련 ----
// 2. 이메일을 입력하지 않고 해당 input box를 클릭했다가 다른 곳을 클릭 했을때 에러가 표시되는가
// 3. 비밀번호를 입력하지 않고 해당 input box를 클릭했다가 다른 곳을 클릭 했을때 에러가 표시되는가
// 4. 적절한 이메일을 입력하지 않았을 경우 에러 메시지가 표시 되는가
// 5. 이메일을 입력하지 않았을 경우 로그인 버튼이 비활성화가 되는가
// 6. 적절한 이메일을 입력하지 않았을 경우 로그인 버튼이 비활성화가 되는가
// 7. 비밀번호을 입력하지 않았을 경우 로그인 버튼이 비활성화가 되는가
// 8. 이메일 / 비밀번호 모두 적절하게 입력 했을 경우에 로그인 버튼이 활성화 되는가
// ---- Autocomplete 로직 관련 ----
// 9. 아이디(이메일) 입력 필드에서 @ 키를 눌렀을 시, 자동완성 목록이 표시 되는가
// 10. 아이디(이메일) 입력 필드에서 @ 키가 없을 시, 자동완성 목록이 사라 지는가
// 11. 자동완성 목록이 표시 됐을 때, 아무것도 선택하지 않고 자동완성 밖의 다른 것을 클릭 했을 때, 자동완성이 사라지는가
// 12. 자동완성 목록이 표시 됐을 때, 입력되는 글자에 따라 자동완성 목록이 동적으로 변하는가 (ex: 입력이 test@n -> 목록은 test@naver.com, test@nate.com)
// 13. 자동 완성 목록에서 하나를 클릭할 경우, 아이디(이메일) 입력 필드에 선택된 이메일이 입력되고, 자동완성 목록이 사라지는가
// 14. 자동 완성 목록이 표시된 상태에서 키보드 위/아래 버튼을 누를 경우, 누른 방향에 맞춰서 선택 목록이 움직이는 가
// 15. 키보드 위/아래 로 선택 목록을 움직인 후 Enter Key를 누를 경우, 아이디(이메일) 입력 필드에 선택된 이메일이 입력되는가
// ---- 로그인 로직 관련 ----
// 16. 로그인 버튼을 눌렀을 시, MyPage 경로로 이동하는가
// 17. MyPage에서 현재 로그인 한 유저의 아이디(이메일)가 표시되는가
// 18. MyPage에서 로그 아웃 버튼을 누를 시 로그 아웃 버튼을 눌렀을 시, 로그인 화면으로 돌아 오는가
// 19. 자동 로그인(체크박스)를 체크하지 않고 로그인 했을 시, 새로 고침을 하면 Login 화면으로 돌아 오는가
// 20. 자동 로그인(체크박스)를 클릭하고 로그인 했을 시, 새로 고침을 해도 MyPage 경로에 계속 있는가
// 21. 자동 로그인(체크박스)를 클릭하고 로그인 한 후, 로그 아웃 버튼을 눌렀을 시 로그인 화면으로 돌아 오는가

describe('login 페이지 테스트', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/')
	})

	it('1. 초기 화면에 이메일과 비밀번호, 그리고 자동 로그인 체크박스가 모두 빈 칸으로 있는가', () => {
		cy.get('#email').should('have.value', '')
		cy.get('#password').should('have.value', '')
		cy.get('#autoLoginCheck').should('not.be.checked')
	})

	it('2. 이메일을 입력하지 않고 해당 input box를 클릭했다가 다른 곳을 클릭 했을때 에러가 표시되는가', () => {
		cy.get('#email').click()
		cy.get('body').click(0, 0, { force: true })
		cy.get('#requiredEmail').should(
			'have.text',
			'아이디(이메일)을 입력해주세요'
		)
	})

	it('3. 비밀번호를 입력하지 않고 해당 input box를 클릭했다가 다른 곳을 클릭 했을때 에러가 표시되는가', () => {
		cy.get('#password').click()
		cy.get('body').click(0, 0, { force: true })
		cy.get('#requiredPassword').should('have.text', '비밀번호를 입력해주세요')
	})

	it('4. 적절한 이메일을 입력하지 않았을 경우 에러 메시지가 표시 되는가', () => {
		cy.get('#email').click()
		cy.get('#email').type(`abcdefg`)
		cy.get('body').click(0, 0, { force: true })
		cy.get('#validEmail').should(
			'have.text',
			'올바른 이메일 형식을 입력해주세요'
		)

		cy.get('#email').click()
		cy.get('#email').type(`@abcd`)
		cy.get('body').click(0, 0, { force: true })
		cy.get('#validEmail').should(
			'have.text',
			'올바른 이메일 형식을 입력해주세요'
		)

		cy.get('#email').click()
		cy.get('#email').type(`@com`)
		cy.get('body').click(0, 0, { force: true })
		cy.get('#validEmail').should(
			'have.text',
			'올바른 이메일 형식을 입력해주세요'
		)
	})

	it('5. 이메일을 입력하지 않았을 경우 로그인 버튼이 비활성화가 되는가', () => {
		cy.get('#email').type('asdasd')
		cy.get('#email').clear()
		cy.get('body').click(0, 0, { force: true })
		cy.get('#loginButton').should('be.disabled')
	})

	it('6. 적절한 이메일을 입력하지 않았을 경우 로그인 버튼이 비활성화가 되는가', () => {
		cy.get('#email').type(`abcdefg`)
		cy.get('body').click(0, 0, { force: true })
		cy.get('#loginButton').should('be.disabled')
	})

	it('7. 비밀번호을 입력하지 않았을 경우 로그인 버튼이 비활성화가 되는가', () => {
		cy.get('#password').type('asdasd')
		cy.get('#password').clear()
		cy.get('body').click(0, 0, { force: true })
		cy.get('#loginButton').should('be.disabled')
	})

	it('8. 이메일 / 비밀번호 모두 적절하게 입력 했을 경우에 로그인 버튼이 눌리는가', () => {
		cy.get('#email').type(`abcdefg@naver.com`)
		cy.get('#password').type('asdasd')
		cy.get('body').click(0, 0, { force: true })
		cy.get('#loginButton').should('not.be.disabled')
	})

	it('9. 아이디(이메일) 입력 필드에서 @ 키를 눌렀을 시, 자동완성 목록이 표시 되는가', () => {
		cy.get('#email').type(`abcdefg@`)
		cy.get('.option-panel').should('be.visible')
	})

	it('10. 아이디(이메일) 입력 필드에서 @ 키가 없을 시, 자동완성 목록이 사라 지는가', () => {
		cy.get('#email').type(`abcdefg@`)
		cy.get('.option-panel').should('be.visible')
		cy.get('#email').type(`{backspace}`)
		cy.get('.option-panel').should('not.exist')
	})

	it('11. 자동완성 목록이 표시 됐을 때, 아무것도 선택하지 않고 자동완성 밖의 다른 것을 클릭 했을 때, 자동완성이 사라지는가', () => {
		cy.get('#email').type(`abcdefg@`)
		cy.get('.option-panel').should('be.visible')
		cy.get('body').click(0, 0, { force: true })
		cy.get('.option-panel').should('not.exist')
	})

	it('12. 자동완성 목록이 표시 됐을 때, 입력되는 글자에 따라 자동완성 목록이 동적으로 변하는가', () => {
		// (ex: 입력이 test@n -> 목록은 test@naver.com, test@nate.com)
		cy.get('#email').type(`test@n`)
		cy.get('.option-panel').should('be.visible')
		cy.get('.option-panel .option-item').contains('naver.com').should('exist')
		cy.get('.option-panel .option-item').contains('nate.com').should('exist')
	})

	it('13. 자동 완성 목록에서 하나를 클릭할 경우, 아이디(이메일) 입력 필드에 선택된 이메일이 입력되고, 자동완성 목록이 사라지는가', () => {
		cy.get('#email').type(`test@`)
		cy.get('.option-panel').should('be.visible')
		cy.get('.option-panel .option-item').contains('hanmail.net').click()
		cy.get('.option-panel .option-item').contains('hanmail.net').click()
		cy.get('.option-panel').should('not.exist')
		cy.get('#email').should('have.value', 'test@hanmail.net')
	})

	it('14. 자동 완성 목록이 표시된 상태에서 키보드 위/아래 버튼을 누를 경우, 누른 방향에 맞춰서 선택 목록이 움직이는 가', () => {
		cy.get('#email').type(`test@`)
		cy.get('#email').type(`{downArrow}`)
		cy.get('#email').type(`{downArrow}`)
		cy.get('#email').type(`{downArrow}`)
		cy.get('#email').type(`{upArrow}`)
		cy.get('.option-panel .selected-item').should('have.text', 'test@naver.com')
	})

	it('15. 키보드 위/아래 로 선택 목록을 움직인 후 Enter Key를 누를 경우, 아이디(이메일) 입력 필드에 선택된 이메일이 입력되는가', () => {
		cy.get('#email').type(`test@`)
		cy.get('#email').type(`{downArrow}`)
		cy.get('#email').type(`{downArrow}`)
		cy.get('#email').type(`{downArrow}`)
		cy.get('#email').type(`{upArrow}`)
		cy.get('.option-panel .selected-item').should('have.text', 'test@naver.com')
		cy.get('#email').type(`{enter}`)
		cy.get('#email').should('have.value', 'test@naver.com')
	})

	it('16. 로그인 버튼을 눌렀을 시, MyPage 경로로 이동하는가', () => {
		cy.get('#email').type(`test@naver.com`)
		cy.get('#password').type(`test`)
		cy.get('#loginButton').click()
		cy.url().should('include', '/mypage')
	})

	it('17. MyPage에서 현재 로그인 한 유저의 아이디(이메일)가 표시되는가', () => {
		cy.get('#email').type(`test@naver.com`)
		cy.get('#password').type(`test`)
		cy.get('#loginButton').click()
		cy.get('#welcomePanel').contains('test@naver.com')
	})

	it('18. MyPage에서 로그 아웃 버튼을 누를 시, 로그인 화면으로 돌아가는 가', () => {
		cy.get('#email').type(`test@naver.com`)
		cy.get('#password').type(`test`)
		cy.get('#loginButton').click()
		cy.get('#logoutButton').click()
		cy.url().should('eq', 'http://localhost:3000/')
	})

	it('19. 자동 로그인(체크박스)를 체크하지 않고 로그인 했을 시, 새로 고침을 하면 Login 화면으로 돌아 오는가', () => {
		cy.get('#email').type(`test@naver.com`)
		cy.get('#password').type(`test`)
		cy.get('#loginButton').click()
		cy.reload()
		cy.url().should('eq', 'http://localhost:3000/')
	})

	it('20. 자동 로그인(체크박스)를 클릭하고 로그인 했을 시, 새로 고침을 해도 MyPage 경로에 계속 있는가', () => {
		cy.get('#email').type(`test@naver.com`)
		cy.get('#password').type(`test`)
		cy.get('#autoLoginCheck').check()
		cy.get('#loginButton').click()
		cy.reload()
		cy.url().should('include', '/mypage')
		cy.get('#welcomePanel').contains('test@naver.com')
	})

	it('21. 자동 로그인(체크박스)를 클릭하고 로그인 한 후, 로그 아웃 버튼을 눌렀을 시 로그인 화면으로 돌아 오는가', () => {
		cy.get('#email').type(`test@naver.com`)
		cy.get('#password').type(`test`)
		cy.get('#autoLoginCheck').check()
		cy.get('#loginButton').click()
		cy.url().should('include', '/mypage')
		cy.get('#logoutButton').click()
		cy.url().should('eq', 'http://localhost:3000/')
	})
})
