import { Link, useMatch } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import React, { useState, useEffect, useRef } from 'react'

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10%;
  color: whitesmoke;
  background-color: black;
  border-bottom: 2px solid #3c3c3c;
`

const Col = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.div`
  margin-left: -40px;
  color: whitesmoke;
  display: block;
  margin-right: -50px;
  width: 180px;
`

const Items = styled.ul`
  display: flex;
  align-items: center;
`

const Item = styled.li`
  font-size: 17px;
  margin-right: 40px;
  color: ${props => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  a {
    color: whitesmoke;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: whitesmoke;
    }
    &:visited {
      color: whitesmoke;
    }
    &:active {
      color: whitesmoke;
    }
  }
`

const Underline = styled(motion.span)`
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: -7px;
  left: 0;
  background-color: whitesmoke;
  transform-origin: left;
`

const SearchContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transform-origin: right;
`

const SearchInputContainer = styled(motion.div)`
  width: 100%;
  position: relative;
`

const SearchInput = styled.input`
  width: 100%;
  font-size: 15px;
  outline: none;
  border: solid 1px #9f9d9d71;
  border-radius: 10px;
  padding: 10px 40px 10px 10px;
  box-sizing: border-box;
  background: transparent;
  color: whitesmoke;
`

const SearchButton = styled(motion.button)`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: white;
  padding: 0;
  cursor: pointer;
  z-index: 10;
  svg {
    height: 20px;
  }
`

const searchVariants = {
  hidden: {
    width: '25px',
    opacity: 1
  },
  visible: {
    width: '100%',
    opacity: 1,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
}

const underlineVariants = {
  hidden: {
    width: '0%',
    x: 0
  },
  visible: {
    width: '100%',
    x: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
}

const introText = {
  title: '출.비.여',
  desc: ['PORTFOLIO', 'by MINSEOK']
}

function Header () {
  const homeMatch = useMatch('/')
  const popularMatch = useMatch('/popular')
  const comingsoonMatch = useMatch('/comingsoon')
  const nowplayingMatch = useMatch('/nowplaying')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        isSearchOpen
      ) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen])

  return (
    <Nav>
      <Col>
        <Logo>
          <h1 className='intro__title'>{introText.title}</h1>
        </Logo>
        <Items>
          <Item>
            <Link to='/'>
              Home{' '}
              {homeMatch && (
                <Underline
                  variants={underlineVariants}
                  initial='hidden'
                  animate='visible'
                />
              )}
            </Link>
          </Item>
          <Item>
            <Link to='/popular'>
              Popular{' '}
              {popularMatch && (
                <Underline
                  variants={underlineVariants}
                  initial='hidden'
                  animate='visible'
                />
              )}
            </Link>
          </Item>
          <Item>
            <Link to='/comingsoon'>
              Coming Soon{' '}
              {comingsoonMatch && (
                <Underline
                  variants={underlineVariants}
                  initial='hidden'
                  animate='visible'
                />
              )}
            </Link>
          </Item>
          <Item>
            <Link to='/nowplaying'>
              Now Playing{' '}
              {nowplayingMatch && (
                <Underline
                  variants={underlineVariants}
                  initial='hidden'
                  animate='visible'
                />
              )}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        {!homeMatch && (
          <SearchContainer
            ref={searchRef}
            variants={searchVariants}
            initial='hidden'
            animate={isSearchOpen ? 'visible' : 'hidden'}
          >
            {isSearchOpen && (
              <SearchInputContainer>
                <SearchInput type='text' placeholder='Search movie' required />
              </SearchInputContainer>
            )}
            <SearchButton onClick={toggleSearch}>
              <svg
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
            </SearchButton>
          </SearchContainer>
        )}
      </Col>
    </Nav>
  )
}

export default Header
