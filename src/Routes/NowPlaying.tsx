import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

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

const AdditionalContent = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: black;
  padding: 30px;
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

const TypingExample = () => {
  const text = '현 재 상 영 중'
  const characters = text.split('')

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
      <TypingArea>
        <motion.span
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {characters.map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.span>
      </TypingArea>
      <AdditionalContent>
        <br />
        <br />
        <br />
        HAHAHA
        <br />
        <br />
        <br />
      </AdditionalContent>
    </TypingContainer>
  )
}

export default TypingExample
