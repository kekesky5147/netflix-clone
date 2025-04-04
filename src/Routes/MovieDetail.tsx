import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getMovie, makeBgPath } from '../api.ts'
import React from 'react'

// 영화 데이터 타입 정의
interface Movie {
  id: number
  title: string
  backdrop_path: string
  overview: string
  release_date: string
}

const Wrapper = styled.div`
  padding-top: 80px;
`

const Detail = styled.div`
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  align-items: center;
  padding: 20px;
  color: white;
`

const Info = styled.div`
  padding: 20px;
`

function MovieDetail () {
  const { id } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMovie(id).then(data => {
      setMovie(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!movie) return <div>Movie not found</div>

  return (
    <Wrapper>
      <Detail
        style={{ backgroundImage: `url(${makeBgPath(movie.backdrop_path)})` }}
      >
        <h1>{movie.title}</h1>
      </Detail>
      <Info>
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
      </Info>
    </Wrapper>
  )
}

export default MovieDetail
