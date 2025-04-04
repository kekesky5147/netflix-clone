import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { getComingSoon, makeBgPath, makeImagePath } from '../api.ts'

// 영화 데이터 타입 정의 (썸네일 추가)
interface Movie {
  id: number
  title: string
  backdrop_path: string
  poster_path: string
  overview: string
  release_date: string
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

const MovieList = styled.div`
  padding: 20px;
  text-align: left;
`

const MovieItem = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-size: cover;
  background-position: center;
  color: white;
  border-radius: 10px;
  display: flex; // 가로 배치
  align-items: center;
  gap: 20px; // 썸네일과 정보 사이 간격
`

const MoviePoster = styled.img`
  width: 150px; // 썸네일 크기
  height: auto;
  border-radius: 5px;
`

const MovieInfo = styled.div`
  max-width: 600px;
  background: rgba(0, 0, 0, 0.5); // 텍스트 가독성을 위한 반투명 배경
  padding: 10px;
  border-radius: 5px;
`

function ComingSoon () {
  const mainText = '[커.밍.쑨] Coming Soon'
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
    getComingSoon()
      .then(data => {
        console.log(data.results[0]) // 첫 번째 영화 데이터 확인
        setMovies(data.results)
        setLoading(false)
      })
      .catch(error => {
        console.error('Failed to fetch coming soon movies:', error)
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
            <MovieItem
              key={movie.id}
              style={{
                backgroundImage: `url(${makeBgPath(movie.backdrop_path)})`
              }}
            >
              <MoviePoster
                src={makeImagePath(movie.poster_path)}
                alt={movie.title}
              />
              <MovieInfo>
                <h3>{movie.title}</h3>
                <p>Release Date: {movie.release_date}</p>
                <p>Overview: {movie.overview}</p>
              </MovieInfo>
            </MovieItem>
          ))}
        </MovieList>
      )}
    </TypingContainer>
  )
}

export default ComingSoon
