import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'

import { dictionary } from 'dictionary/dictionary'
import { fetchSearchResults } from 'api/fetchSearchResults'

interface IProps {
	setSearchResults: Dispatch<SetStateAction<string[] | null>>
	setIsLoading: Dispatch<SetStateAction<boolean>>
	setIsError: Dispatch<SetStateAction<boolean>>
	setUser: Dispatch<SetStateAction<string>>
}

const { placeholder, search, clearSearch } = dictionary.search

const Search: FC<IProps> = ({ setSearchResults, setIsLoading, setUser, setIsError }) => {
	const [value, setValue] = useState('')

	const handleSearch = async (e: FormEvent) => {
		e.preventDefault()
		setSearchResults(null)
		setUser('')
		setIsLoading(true)
		try {
			const searchResults = await fetchSearchResults(value)
			setSearchResults(searchResults)
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
					placeholder={placeholder}
					type='text'
				/>
			</label>
			<div className='search-button-wrapper'>
				<button disabled={!value} className='search-submit-button'>
					{search}
				</button>
				<button onClick={handleClearSearch} type='button' className='clear-search-button'>
					{clearSearch}
				</button>
			</div>
		</form>
	)
}

export default Search
