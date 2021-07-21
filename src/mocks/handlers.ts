import { mockPage1, mockPage2, mockPage3 } from 'mocks/mockData'

import { rest } from 'msw'

export const handlers = [
	rest.get('https://api.github.com/users/mockUser', (_, res, ctx) => {
		return res(
			ctx.json({
				avatar_url: 'mock avatar url',
				bio: 'mock user bio',
				login: 'mock user login',
				public_repos: 250,
			})
		)
	}),
	rest.get('https://api.github.com/users/mockUser/repos', (req, res, ctx) => {
		const query = req.url.searchParams
		const page = query.get('page')
		if (page === '1') {
			return res(ctx.json(mockPage1))
		} else if (page === '2') {
			return res(ctx.json(mockPage2))
		} else {
			return res(ctx.json(mockPage3))
		}
	}),
	rest.get('https://api.github.com/search/users/', (req, res, ctx) => {
		const query = req.url.searchParams
		const q = query.get('q')
		if (q === 'mockUser') {
			return res(
				ctx.json({
					items: [{ login: 'mockUser' }, { login: 'mockUser1' }, { login: 'mockUser2' }],
				})
			)
		} else {
			return res(
				ctx.json({
					items: [],
				})
			)
		}
	}),
]
