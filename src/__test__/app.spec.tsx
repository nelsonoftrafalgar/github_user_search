import { cleanup, render, screen } from '@testing-library/react'

import App from 'App'
import AppContext from 'context/AppContext'
import userEvent from '@testing-library/user-event'

afterEach(cleanup)

const setup = () => {
	render(
		<AppContext>
			<App />
		</AppContext>
	)
}

test('it performs search and clear search', async () => {
	setup()

	const searchInput = screen.getByTestId('SEARCH_INPUT')
	const searchButton = screen.getByTestId('SEARCH_BUTTON')
	expect(searchButton).toBeDisabled()
	userEvent.type(searchInput, 'mockUser')
	userEvent.click(searchButton)
	expect(screen.queryByTestId('LOADER')).toBeInTheDocument()
	expect(await screen.findAllByTestId('LIST_ITEM_BUTTON')).toHaveLength(3)
	expect(screen.queryByTestId('LOADER')).not.toBeInTheDocument()
	userEvent.click(screen.getByTestId('CLEAR_SEARCH_BUTTON'))
	expect(searchInput).not.toHaveValue()
	expect(screen.queryAllByTestId('LIST_ITEM_BUTTON')).toHaveLength(0)
})

test('it should display user details after clicking on search result', async () => {
	setup()

	const searchInput = screen.getByTestId('SEARCH_INPUT')
	userEvent.type(searchInput, 'mockUser')
	userEvent.click(screen.getByTestId('SEARCH_BUTTON'))
	userEvent.click(await screen.findByText('mockUser'))
	expect(screen.queryByTestId('LOADER')).toBeInTheDocument()
	expect(await screen.findByTestId('USER_DETAILS')).toBeInTheDocument()
})

test('it should be able to go back to search results after displaying user details', async () => {
	setup()

	const searchInput = screen.getByTestId('SEARCH_INPUT')
	userEvent.type(searchInput, 'mockUser')
	userEvent.click(screen.getByTestId('SEARCH_BUTTON'))
	userEvent.click(await screen.findByText('mockUser'))
	expect(await screen.findByTestId('USER_DETAILS')).toBeInTheDocument()
	userEvent.click(screen.getByTestId('BACK_BUTTON'))
	expect(screen.queryByTestId('USER_DETAILS')).not.toBeInTheDocument()
	expect(screen.queryByTestId('LOADER')).not.toBeInTheDocument()
	expect(screen.getAllByTestId('LIST_ITEM_BUTTON')).toHaveLength(3)
})

test('clearing search should return app to initial state', async () => {
	setup()

	const searchInput = screen.getByTestId('SEARCH_INPUT')
	const searchButton = screen.getByTestId('SEARCH_BUTTON')
	userEvent.type(searchInput, 'mockUser')
	userEvent.click(searchButton)
	userEvent.click(await screen.findByText('mockUser'))
	expect(await screen.findByTestId('USER_DETAILS')).toBeInTheDocument()
	userEvent.click(screen.getByTestId('CLEAR_SEARCH_BUTTON'))
	expect(screen.queryByTestId('USER_DETAILS')).not.toBeInTheDocument()
	expect(screen.queryByTestId('LOADER')).not.toBeInTheDocument()
	expect(screen.queryAllByTestId('LIST_ITEM_BUTTON')).toHaveLength(0)
	expect(searchInput).not.toHaveValue()
	expect(searchButton).toBeDisabled()
})
