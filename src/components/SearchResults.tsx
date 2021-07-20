import { Dispatch, FC, SetStateAction } from 'react'

import ListItem from 'components/ListItem'

interface IProps {
	searchResults: string[]
	setUser: Dispatch<SetStateAction<string>>
}

const SearchResults: FC<IProps> = ({ searchResults, setUser }) => {
	return (
		<div className='search-results'>
			<ul className='users-list'>
				{searchResults.map((result) => (
					<ListItem key={result} onClick={() => setUser(result)} text={result} />
				))}
			</ul>
		</div>
	)
}

export default SearchResults
