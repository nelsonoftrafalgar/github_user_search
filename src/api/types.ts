export interface IUser {
	avatar_url: string
	bio: string | null
	login: string
	public_repos: number
}

export interface IDetails extends Omit<IUser, 'public_repos'> {
	top_repos: Omit<IRawDataItem, 'stargazers_count'>[]
}

export interface IRawDataItem {
	stargazers_count: number
	name: string
	html_url: string
}

export interface IRawData {
	data: IRawDataItem[]
}

export interface IRawSearchResults {
	items: [{ login: string }]
}
