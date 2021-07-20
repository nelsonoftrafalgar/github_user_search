import { IRawData, IRawDataItem } from 'api/types'

export const getTopRepos = (repos: IRawData[], numerOfRepos: number) => {
	return repos
		.reduce((acc: IRawDataItem[], val: IRawData) => [...acc, ...val.data], [])
		.sort((a: IRawDataItem, b: IRawDataItem) => b.stargazers_count - a.stargazers_count)
		.slice(0, numerOfRepos)
		.map(({ name, html_url }: IRawDataItem) => ({ name, html_url }))
}
