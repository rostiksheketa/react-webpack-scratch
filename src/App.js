import React from 'react'
import './App.scss'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {SWRConfig} from 'swr'
import axios from 'axios'

import Movies from './movies/Movies'
import About from './about/About'

axios.defaults.baseURL = 'http://localhost:3000'

const App = () => {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 10000,
        fetcher: url => axios.get(url).then(resp => resp.data),
        errorRetryCount: 3,
        errorRetryInterval: 10000
      }}
    >
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </div>
    </SWRConfig>
  )
}

export default App
