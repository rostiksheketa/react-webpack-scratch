import React from 'react'
import useSwr from 'swr'
import { Link } from 'react-router-dom'

import {moviesPath} from '../api/helpers'

const About = () => {
  const {data: movies} = useSwr(moviesPath)

  return (
    <div>
      About
      <span> {movies?.length} movies</span>
      <div>
        <Link to="/">Home</Link>
      </div>
    </div>
  )
}

export default About
