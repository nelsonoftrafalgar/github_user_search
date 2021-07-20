import { IRawData, IRawDataItem, IUser } from 'api/types'
import axios, { CancelToken } from 'axios'

import { calcTotalPages } from 'utils/calcTotalPages'
import { getTopRepos } from 'utils/getTopRepos'

export const fetchUser = async (user: string, cancelToken: CancelToken) => {
	const firstResponse = await axios.get<IUser>(`https://api.github.com/users/${user}`, {
		cancelToken,
	})
	const { avatar_url, bio, login, public_repos } = firstResponse.data
	const totalPages = calcTotalPages(public_repos)
	const urls = Array.from({ length: totalPages }, (_, page) =>
		axios.get<IRawDataItem[]>(
			`https://api.github.com/users/${user}/repos?per_page=100&page=${page + 1}`,
			{
				cancelToken,
			}
		)
	)
	const secondResponse = await Promise.all<IRawData>(urls)
	const top_repos = getTopRepos(secondResponse, 4)
	return { avatar_url, bio, login, top_repos }
}
