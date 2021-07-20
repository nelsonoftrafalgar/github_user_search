import Error from 'components/Error'
import Loader from 'components/Loader'
import Search from 'components/Search'
import SearchResults from 'components/SearchResults'
import UserDetails from 'components/UserDetails'
import { useState } from 'react'

const App = () => {
	const [searchResults, setSearchResults] = useState<string[] | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [user, setUser] = useState('')
	const [isError, setIsError] = useState(false)

	if (isError) return <Error />

	return (
		<div className='app'>
			<Search
				setIsError={setIsError}
				setUser={setUser}
				setIsLoading={setIsLoading}
				setSearchResults={setSearchResults}
			/>
			{isLoading && <Loader />}
			{user && <UserDetails setIsError={setIsError} setUser={setUser} user={user} />}
			{searchResults && !user && <SearchResults setUser={setUser} searchResults={searchResults} />}
		</div>
	)
}

export default App
