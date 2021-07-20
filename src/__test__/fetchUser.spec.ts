import axios from 'axios'
import { fetchUser } from 'api/fetchUser'

test('it should fetch user details', async () => {
	const mockSource = axios.CancelToken.source()
	const response = await fetchUser('mockUser', mockSource.token)
	expect(response).toMatchObject({
		avatar_url: 'mock avatar url',
		bio: 'mock user bio',
		login: 'mock user login',
		top_repos: [
			{ name: 'test repo 2', html_url: 'test url' },
			{ name: 'test repo 9', html_url: 'test url' },
			{ name: 'test repo 7', html_url: 'test url' },
			{ name: 'test repo 6', html_url: 'test url' },
		],
	})
})
