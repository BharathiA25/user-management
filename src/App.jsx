import React from 'react'
import UserManagement from './pages/UserManagement.jsx'
import {Provider} from 'react-redux'
import { store } from './app/store.js'
function App() {
  return (
    <>
    <Provider store={store}> 
    <UserManagement />
    </Provider>
    </>
  
  )
}

export default App
