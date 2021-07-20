import { FormEvent, useState } from 'react'

import { dictionary } from 'dictionary/dictionary'
import { fetchSearchResults } from 'api/fetchSearchResults'
import { useAppContext } from 'context/AppContext'

const { placeholder, search, clearSearch } = dictionary.search

const Search = () => {
	const { setSearchResults, setIsLoading, setUser, setIsError } = useAppContext()
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
