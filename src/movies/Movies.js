import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import useSwr, {mutate} from 'swr'
import {Link} from 'react-router-dom'

import './Movies.scss'

import {moviesPath} from '../api/helpers'

const SHOULD_FETCH = true

const Movies = () => {
  const [movie, setMovie] = useState('')

  const {data: movies} = useSwr(SHOULD_FETCH ? moviesPath : null)
  const {data: moviesWontTrigger1} = useSwr(moviesPath)
  const {data: moviesWontTrigger2} = useSwr(moviesPath)
  const {data: moviesWontTrigger3} = useSwr(moviesPath)

  const onSaveMovie = () => {
    const newMovie = {title: movie, id: uuidv4()}

    mutate(moviesPath, [...movies, newMovie], false)
    axios.post(moviesPath, newMovie)
    setMovie('')
  }

  return (
    <div className="movies-container">
      <img src="images/amaterasuuuuuu.png" alt="lol" width={50} height={50} />
      <div>
        <Link to="/about">About</Link>
      </div>
      <div className="movies-container--form">
        <input
          type="text"
          placeholder="Add new movie"
          className="movies-container--form--input"
          value={movie}
          onChange={e => setMovie(e.target.value)}
        />
        <button
          className="movies-container--form--button"
          onClick={onSaveMovie}
        >
          Add
        </button>
      </div>
      <div>
        {!movies
          ? 'Loading...'
          : movies?.map(movie => {
              return (
                <div key={movie.id} className="movies-container--movie">
                  {movie.title}
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default Movies
