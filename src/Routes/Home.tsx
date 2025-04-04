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
  font-size: 18px;
`

const AdditionalContent = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: black;
  padding: 30px;
`

const TypingArea = styled.div`
  margin-top: 200px;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TypingExample = () => {
  const mainText = '[영화]. 희극 한스푼, 그리고 비극 한스푼'
  const subText = 'made by Jason'
  const charactersMain = mainText.split('')
  const charactersSub = subText.split('')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.7,
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
          <br />
          <div>
            {charactersSub.map((char, index) => (
              <motion.span
                key={index + charactersMain.length}
                variants={letterVariants}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </TypingArea>
      <AdditionalContent>{/* Rest of your content */}</AdditionalContent>
    </TypingContainer>
  )
}

export default TypingExample
