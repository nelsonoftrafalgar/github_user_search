import { getTopRepos } from 'utils/getTopRepos'

const mockData = [
	{
		data: [
			{
				stargazers_count: 20,
				name: 'test repo 1',
				html_url: 'test url',
			},
			{
				stargazers_count: 1000,
				name: 'test repo 2',
				html_url: 'test url',
			},
			{
				stargazers_count: 30,
				name: 'test repo 3',
				html_url: 'test url',
			},
		],
	},
	{
		data: [
			{
				stargazers_count: 200,
				name: 'test repo 4',
				html_url: 'test url',
			},
			{
				stargazers_count: 100,
				name: 'test repo 5',
				html_url: 'test url',
			},
			{
				stargazers_count: 300,
				name: 'test repo 6',
				html_url: 'test url',
			},
		],
	},
	{
		data: [
			{
				stargazers_count: 320,
				name: 'test repo 7',
				html_url: 'test url',
			},
			{
				stargazers_count: 110,
				name: 'test repo 8',
				html_url: 'test url',
			},
			{
				stargazers_count: 370,
				name: 'test repo 9',
				html_url: 'test url',
			},
		],
	},
]

test('is should return 2 repos with the most stars', () => {
	expect(getTopRepos(mockData, 2)).toMatchObject([
		{ name: 'test repo 2', html_url: 'test url' },
		{ name: 'test repo 9', html_url: 'test url' },
	])
})

test('is should return the repo with the most stars', () => {
	expect(getTopRepos(mockData, 1)).toMatchObject([{ name: 'test repo 2', html_url: 'test url' }])
})

test('is should not return any repos', () => {
	expect(getTopRepos(mockData, 0)).toMatchObject([])
})

test('is should return 4 repos with the most stars', () => {
	expect(getTopRepos(mockData, 4)).toMatchObject([
		{ name: 'test repo 2', html_url: 'test url' },
		{ name: 'test repo 9', html_url: 'test url' },
		{ name: 'test repo 7', html_url: 'test url' },
		{ name: 'test repo 6', html_url: 'test url' },
	])
})

test('is should return all sorted repos when the second argument is larger than total repos', () => {
	expect(getTopRepos(mockData, 10)).toMatchObject([
		{ name: 'test repo 2', html_url: 'test url' },
		{ name: 'test repo 9', html_url: 'test url' },
		{ name: 'test repo 7', html_url: 'test url' },
		{ name: 'test repo 6', html_url: 'test url' },
		{ name: 'test repo 4', html_url: 'test url' },
		{ name: 'test repo 8', html_url: 'test url' },
		{ name: 'test repo 5', html_url: 'test url' },
		{ name: 'test repo 3', html_url: 'test url' },
		{ name: 'test repo 1', html_url: 'test url' },
	])
})
