import { Dispatch, FC, SetStateAction, createContext, useContext, useState } from 'react'

interface IAppContext {
	searchResults: string[] | null
	isLoading: boolean
	user: string
	isError: boolean
	setSearchResults: Dispatch<SetStateAction<string[] | null>>
	setIsLoading: Dispatch<SetStateAction<boolean>>
	setIsError: Dispatch<SetStateAction<boolean>>
	setUser: Dispatch<SetStateAction<string>>
}

const Context = createContext({} as IAppContext)

const AppContext: FC = ({ children }) => {
	const [searchResults, setSearchResults] = useState<string[] | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [user, setUser] = useState('')
	const [isError, setIsError] = useState(false)

	const contextValue = {
		searchResults,
		setSearchResults,
		isLoading,
		setIsLoading,
		user,
		setUser,
		isError,
		setIsError,
	}

	return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export const useAppContext = () => useContext(Context)
export default AppContext
