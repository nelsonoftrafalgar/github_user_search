export interface IDetails {
	avatar_url: string
	bio: string | null
	login: string
	top_repos: Pick<IRawDataItem, 'html_url' | 'name'>[]
}

export interface IRawDataItem {
	stargazers_count: number
	name: string
	html_url: string
}

export interface IRawData {
	data: IRawDataItem[]
}
