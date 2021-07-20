import { fetchSearchResults } from 'api/fetchSearchResults'

test('it should fetch user search results', async () => {
	const response = await fetchSearchResults('mockUser')
	expect(response).toMatchObject(['mockUser1', 'mockUser2', 'mockUser3'])
})

test('it should return empty results', async () => {
	const response = await fetchSearchResults('emptyResults')
	expect(response).toMatchObject([])
})
