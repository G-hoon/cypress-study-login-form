export interface IToken {
	access_token: string
	refresh_token: string
}

export default function login(req: any, res: any): void {
	const { email, password } = req.body

	if (email === 'test' && password === 'test') {
		res.status(200).json({
			access_token:
				'eyJraWQiOiI0NjE3OWM2MC1hODMyLTRkYTctODQwZC01ZTVlZjA2MGQzYzgiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjdy1zZGstbG9jYWwiLCJhdWQiOiJjdy1zZGstbG9jYWwiLCJuYmYiOjE2MzE4MzkwOTEsImV4cCI6MTYzMTgzOTM5MSwiaWF0IjoxNjMxODM5MDkxfQ.htDKZTwwoiSsh2s3ZPPvO2SztEbJfnkhxwIzFbAGkHevt1mlgFV47425NlAFW1GSprBqSFMKPPUpAg02hvM02MAeKyY-4_4BEomB-SJm22E2vIokm8BjSZnn6gsQvsyf2yDiAM9sGZNVDm3WERwjUbAKQkfbpT1jjjfJIN7i8fY59wEqu9UKW-ZFQnL7P9D3vBY57-6HibwlhHt7YkBP6p8f7eudD5Vm-saOMa7f9i6K_uRWnNWqyXPUh0TD2RZKVtODx0AM8PY4ezoGCbMgc9ATXqaU5O4VO7onDNalBZwH4SfFATPaCX-qogrJad2bmsVViNJ8CzWMpjNjOqJMTg',
			refresh_token:
				'-iSeScIHkBvhtmXSklg_1m9xJhce679a3AKwxdDEXGP0XwAgYgU-T36mCPFFKPZT8TxrraQknT43u96W_fzZNqDKT2pnOaNSWgzYgH9Xzh57H3IVM-270BWdcFB4QtNH'
		})
	} else {
		throw new Error('error')
	}
}
