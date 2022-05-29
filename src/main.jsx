import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, HashRouter, Outlet } from 'react-router-dom'

import App from './App'
import App2 from './App2'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<App />} path="/"></Route>
        <Route element={<App2 />} path="/app2"></Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
