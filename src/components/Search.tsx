import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'

import axios from 'axios'

interface IProps {
	setSearchResults: Dispatch<SetStateAction<string[] | null>>
	setIsLoading: Dispatch<SetStateAction<boolean>>
	setIsError: Dispatch<SetStateAction<boolean>>
	setUser: Dispatch<SetStateAction<string>>
}

const Search: FC<IProps> = ({ setSearchResults, setIsLoading, setUser, setIsError }) => {
	const [value, setValue] = useState('')

	const handleSearch = async (e: FormEvent) => {
		e.preventDefault()
		setSearchResults(null)
		setUser('')
		setIsLoading(true)
		try {
			const response = await axios.get(`https://api.github.com/search/users?q=${value}`)
			setSearchResults(response.data.items.map((item: { login: string }) => item.login))
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			setIsError(true)
		}
	}

	const handleClearSearch = () => {
		setSearchResults(null)
		setUser('')
		setValue('')
	}

	return (
		<form onSubmit={handleSearch} className='search-form'>
			<label className='search-input-label'>
				<input
					value={value}
					onChange={(e) => setValue(e.currentTarget.value)}
					className='search-input'
					placeholder='Search github users'
					type='text'
				/>
			</label>
			<div className='search-button-wrapper'>
				<button disabled={!value} className='search-submit-button'>
					Search
				</button>
				<button onClick={handleClearSearch} type='button' className='clear-search-button'>
					Clear search
				</button>
			</div>
		</form>
	)
}

export default Search
