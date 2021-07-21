import { useEffect, useState } from 'react'

import { IDetails } from 'api/types'
import ListItem from 'components/ListItem'
import Loader from 'components/Loader'
import axios from 'axios'
import { dictionary } from 'dictionary/dictionary'
import { fetchUser } from 'api/fetchUser'
import { useAppContext } from 'context/AppContext'

const { about, topRepositories, backToSearch } = dictionary.details

const UserDetails = () => {
	const { user, setUser, setIsError } = useAppContext()
	const [details, setDetails] = useState<IDetails | null>(null)

	useEffect(() => {
		const source = axios.CancelToken.source()
		const getUserDetails = async () => {
			try {
				const { avatar_url, bio, login, top_repos } = await fetchUser(user, source.token)
				setDetails({ avatar_url, bio, login, top_repos })
			} catch (error) {
				if (!axios.isCancel(error)) setIsError(true)
			}
		}

		getUserDetails()
		return () => {
			source.cancel()
		}
	}, [user, setIsError])

	if (!details) return <Loader />

	const { avatar_url, bio, login, top_repos } = details

	return (
		<div data-testid='USER_DETAILS' className='user-details'>
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
			<button data-testid='BACK_BUTTON' className='user-back-button' onClick={() => setUser('')}>
				{backToSearch}
			</button>
		</div>
	)
}

export default UserDetails
