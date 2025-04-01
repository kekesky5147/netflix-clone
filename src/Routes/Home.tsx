import React from 'react'
import styled from 'styled-components'

const HomeTitle = styled.div`
  max-width: 600px;
  margin: 80px auto;
  display: block;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  justify-content: center;
`

function Home () {
  return (
    <HomeTitle
      style={{
        backgroundColor: 'white',
        height: '200vh'
      }}
    >
      <h1>WELCOME TO</h1>
      <h2> 출발 비디오 여행</h2>
      <p>made by Jason</p>
    </HomeTitle>
  )
}

export default Home
