import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { getPopular } from '../api.ts'
import MovieHover from '../Components/MovieHover.tsx'

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  original_title: string
  popularity: number
}

const TypingContainer = styled.div`
  max-width: 80%;
  margin: 100px auto 0;
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  color: #000000;
  padding: 20px 0px;
`

const TypingArea = styled.div`
  border-bottom: 1px solid #989898;
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MovieList = styled.div`
  padding: 20px;
  text-align: left;
`

const MovieItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
`

const MovieInfo = styled.div`
  max-width: 600px;
`

function Popular () {
  const mainText = '[인 기 상 영 작] P O P U L A R'
  const charactersMain = mainText.split('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPopular()
      .then(data => {
        console.log('API Response:', data)
        const sortedMovies = (data.results || []).sort(
          (a: Movie, b: Movie) => b.popularity - a.popularity
        )
        setMovies(sortedMovies)
        setLoading(false)
      })
      .catch(error => {
        console.error('Failed to fetch popular movies:', error)
        setLoading(false)
      })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.1 } }
  }

  return (
    <TypingContainer>
      <TypingArea>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <div>
            {charactersMain.map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </TypingArea>
      {loading ? (
        <div>Loading...</div>
      ) : movies.length > 0 ? (
        <MovieList>
          {movies.map(movie => (
            <MovieItem key={movie.id}>
              <MovieHover movie={movie} />
              <MovieInfo>
                <h3>{movie.title}</h3>
                <p>Original Title: {movie.original_title}</p>
                <p>Rating: {movie.vote_average} / 10</p>
                <p>Popularity: {movie.popularity}</p>
              </MovieInfo>
            </MovieItem>
          ))}
        </MovieList>
      ) : (
        <div>No movies available.</div>
      )}
    </TypingContainer>
  )
}

export default Popular
