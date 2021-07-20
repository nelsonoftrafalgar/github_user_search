import axios from 'axios'

export const fetchSearchResults = async (value: string) => {
	const response = await axios.get(`https://api.github.com/search/users?q=${value}`)
	return response.data.items.map((item: { login: string }) => item.login)
}
