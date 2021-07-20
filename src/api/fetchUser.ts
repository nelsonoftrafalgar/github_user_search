import { IRawData } from 'api/types'
import axios from 'axios'
import { calcTotalPages } from 'utils/calcTotalPages'
import { getTopRepos } from 'utils/getTopRepos'

export const fetchUser = async (user: string) => {
	const firstResponse = await axios.get(`https://api.github.com/users/${user}`)
	const { avatar_url, bio, login, public_repos } = firstResponse.data
	const totalPages = calcTotalPages(public_repos)
	const urls = Array.from({ length: totalPages }, (_, page) =>
		axios.get(`https://api.github.com/users/${user}/repos?per_page=100&page=${page + 1}`)
	)
	const secondResponse = await Promise.all<IRawData>(urls)
	const top_repos = getTopRepos(secondResponse, 4)
	return { avatar_url, bio, login, top_repos }
}
