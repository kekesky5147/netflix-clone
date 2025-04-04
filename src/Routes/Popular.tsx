import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { getPopular, makeImagePath } from '../api.ts'

// 영화 데이터 타입 정의 (요청한 속성 추가)
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
  margin: 80px auto;
  display: block;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  justify-content: center;
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
  margin-top: 40px;
  padding: 30px;
`

// const Body = styled.div`
//   margin-top: 20px;
//   font-size: 16px;
//   color: black;
//   padding: 30px;
// `

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

const MoviePoster = styled.img`
  width: 150px; // 썸네일 크기 임시 설정
  height: auto;
`

const MovieInfo = styled.div`
  max-width: 600px;
`

function Popular () {
  const mainText = '[인.기.작] Popular'
  const charactersMain = mainText.split('')

  const [isScrolled, setIsScrolled] = useState(false)
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    getPopular()
      .then(data => {
        console.log(data.results[0]) // 첫 번째 영화 데이터 확인
        setMovies(data.results)
        setLoading(false)
      })
      .catch(error => {
        console.error('Failed to fetch popular movies:', error)
        setLoading(false)
      })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1
      }
    }
  }

  return (
    <TypingContainer>
      <TypingArea
        style={{ opacity: isScrolled ? 0 : 1, transition: 'opacity 0.3s' }}
      >
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
      <br />
      <br />
      <br />
      <br />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <MovieList>
          {movies.map(movie => (
            <MovieItem key={movie.id}>
              <MoviePoster
                src={makeImagePath(movie.poster_path)}
                alt={movie.title}
              />
              <MovieInfo>
                <h3>{movie.title}</h3>
                <p>Original Title: {movie.original_title}</p>
                <p>Rating: {movie.vote_average} / 10</p>
                <p>Popularity: {movie.popularity}</p>
              </MovieInfo>
            </MovieItem>
          ))}
        </MovieList>
      )}
    </TypingContainer>
  )
}

export default Popular
