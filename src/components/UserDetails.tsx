import ListItem from 'components/ListItem'

const UserDetails = () => {
	return (
		<div className='user-details'>
			<img className='user-image' src='https://via.placeholder.com/150' alt='user' />
			<h1 className='user-title'>Evan Czaplicki</h1>
			<p className='user-subtitle'>About</p>
			<p className='user-bio'>Designer/developer of @elm</p>
			<p className='user-subtitle'>Top repositories</p>
			<ul className='user-repositories'>
				<ListItem href='https://google.com' text='elm-architecture-tutorial' />
				<ListItem href='https://google.com' text='elm-todomvc' />
				<ListItem href='https://google.com' text='functional-programming-in-elm' />
			</ul>
		</div>
	)
}

export default UserDetails
