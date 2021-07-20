import 'styles/index.scss'

import App from './App'
import AppContext from 'context/AppContext'
import ReactDOM from 'react-dom'
import { StrictMode } from 'react'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
	<StrictMode>
		<AppContext>
			<App />
		</AppContext>
	</StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
