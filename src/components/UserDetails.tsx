import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

import ListItem from 'components/ListItem'
import Loader from 'components/Loader'
import axios from 'axios'
import { dictionary } from 'dictionary/dictionary'

const calcTotalPages = (totalRepos: number) => {
	if (totalRepos < 100) return 1
	return Math.ceil(totalRepos / 100)
}

interface IDetails {
	avatar_url: string
	bio: string | null
	login: string
	top_repos: Pick<IRawDataItem, 'html_url' | 'name'>[]
}

interface IRawDataItem {
	stargazers_count: number
	name: string
	html_url: string
}

interface IRawData {
	data: IRawDataItem[]
}

interface IProps {
	user: string
	setUser: Dispatch<SetStateAction<string>>
	setIsError: Dispatch<SetStateAction<boolean>>
}

const { about, topRepositories, backToSearch } = dictionary.details

const UserDetails: FC<IProps> = ({ user, setUser, setIsError }) => {
	const [details, setDetails] = useState<IDetails | null>(null)

	useEffect(() => {
		const getUserDetails = async () => {
			try {
				const firstResponse = await axios.get(`https://api.github.com/users/${user}`)
				const { avatar_url, bio, login, public_repos } = firstResponse.data
				const totalPages = calcTotalPages(public_repos)
				const urls = Array.from({ length: totalPages }, (_, page) =>
					axios.get(`https://api.github.com/users/${user}/repos?per_page=100&page=${page + 1}`)
				)

				const secondResponse = await Promise.all(urls)
				const top_repos = secondResponse
					.reduce((acc: IRawDataItem[], val: IRawData) => {
						acc.push(...val.data)
						return acc
					}, [])
					.sort((a: IRawDataItem, b: IRawDataItem) => b.stargazers_count - a.stargazers_count)
					.slice(0, 4)
					.map(({ name, html_url }: IRawDataItem) => ({ name, html_url }))

				setDetails({ avatar_url, bio, login, top_repos })
			} catch (error) {
				setIsError(true)
			}
		}

		getUserDetails()
	}, [user, setIsError])

	if (!details) return <Loader />

	const { avatar_url, bio, login, top_repos } = details

	return (
		<div className='user-details'>
			<img className='user-image' src={avatar_url} alt='user' />
			<h1 className='user-title'>{login}</h1>
			<p className='user-subtitle'>{about}</p>
			<p className='user-bio'>{bio || '...'}</p>
			<p className='user-subtitle'>{topRepositories}</p>
			<ul className='user-repositories'>
				{top_repos.length
					? top_repos.map(({ name, html_url }) => (
							<ListItem key={name} href={html_url} text={name} />
					  ))
					: '...'}
			</ul>
			<button className='user-back-button' onClick={() => setUser('')}>
				{backToSearch}
			</button>
		</div>
	)
}

export default UserDetails
