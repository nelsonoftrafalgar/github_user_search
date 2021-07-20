import ListItem from 'components/ListItem'

const SearchResults = () => {
	return (
		<div className='search-results'>
			<ul className='users-list'>
				<ListItem onClick={() => {}} text='dan abramov' />
				<ListItem onClick={() => {}} text='kent c dots' />
				<ListItem onClick={() => {}} text='lee robinson' />
				<ListItem onClick={() => {}} text='ben awad' />
			</ul>
		</div>
	)
}

export default SearchResults
