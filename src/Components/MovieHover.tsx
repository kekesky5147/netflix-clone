import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getMovie, makeImagePath } from '../api.ts'

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average?: number
  original_title?: string
  popularity?: number
}

interface DetailMovie {
  id: number
  title: string
  backdrop_path: string
  overview: string
  release_date: string
  runtime?: number
  genres?: { id: number; name: string }[]
  tagline?: string
}

const PosterContainer = styled.div`
  position: relative;
  display: inline-block;
`

const Poster = styled.img`
  width: 150px;
  height: auto;
  border-radius: 5px;
`

const DetailBox = styled.div`
  position: absolute;
  top: 0;
  left: 160px; // 썸네일 오른쪽
  width: 300px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 5px;
  z-index: 20;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`

function MovieHover ({ movie }: { movie: Movie }) {
  const [isHovered, setIsHovered] = useState(false)
  const [detail, setDetail] = useState<DetailMovie | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isHovered && !detail) {
      setLoading(true)
      getMovie(movie.id)
        .then(data => {
          console.log('Movie Detail:', data)
          setDetail(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Failed to fetch movie detail:', error)
          setLoading(false)
        })
    }
  }, [isHovered, movie.id, detail])

  return (
    <PosterContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Poster src={makeImagePath(movie.poster_path)} alt={movie.title} />
      {isHovered && (
        <DetailBox>
          {loading ? (
            <p>Loading...</p>
          ) : detail ? (
            <>
              <h3>{detail.title}</h3>
              <p>{detail.overview}</p>
              <p>Release: {detail.release_date}</p>
              {detail.runtime && <p>Runtime: {detail.runtime} min</p>}
              {detail.genres && (
                <p>Genres: {detail.genres.map(g => g.name).join(', ')}</p>
              )}
              {detail.tagline && <p>Tagline: {detail.tagline}</p>}
            </>
          ) : (
            <p>No details available.</p>
          )}
        </DetailBox>
      )}
    </PosterContainer>
  )
}

export default MovieHover
