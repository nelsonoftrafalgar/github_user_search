import Error from 'components/Error'
import Loader from 'components/Loader'
import Search from 'components/Search'
import SearchResults from 'components/SearchResults'
import UserDetails from 'components/UserDetails'
import { useAppContext } from 'context/AppContext'

const App = () => {
	const { isError, isLoading, user, searchResults } = useAppContext()
	if (isError) return <Error />

	return (
		<div className='app'>
			<Search />
			{isLoading && <Loader />}
			{user && <UserDetails />}
			{searchResults && !user && <SearchResults />}
		</div>
	)
}

export default App
