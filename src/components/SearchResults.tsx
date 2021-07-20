import ListItem from 'components/ListItem'
import { dictionary } from 'dictionary/dictionary'
import { useAppContext } from 'context/AppContext'

const SearchResults = () => {
	const { searchResults, setUser } = useAppContext()
	return (
		<div className='search-results'>
			{!searchResults?.length && <p>{dictionary.searchResults.emptyResults}</p>}
			<ul className='users-list'>
				{searchResults?.map((result) => (
					<ListItem key={result} onClick={() => setUser(result)} text={result} />
				))}
			</ul>
		</div>
	)
}

export default SearchResults
