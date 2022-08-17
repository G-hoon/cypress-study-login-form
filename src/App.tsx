// dependency
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

// components
import Routes from './Routes'

function App() {
	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	)
}

export default App
