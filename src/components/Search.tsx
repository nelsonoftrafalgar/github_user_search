import { useState } from 'react'

const Search = () => {
	const [value, setValue] = useState('')
	return (
		<form className='search-form'>
			<label className='search-input-label'>
				<input
					value={value}
					onChange={(e) => setValue(e.currentTarget.value)}
					className='search-input'
					placeholder='Search github users'
					type='text'
				/>
			</label>
			<button disabled={!value} className='search-submit-button'>
				Search
			</button>
		</form>
	)
}

export default Search
