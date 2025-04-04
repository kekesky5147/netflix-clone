import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import React, { useState, useEffect, useRef } from 'react'

interface NavProps {
  $isScrolled: boolean
  $isMenuOpen?: boolean
}

const Nav = styled.nav<NavProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  color: ${props => (props.$isScrolled ? 'black' : 'black')};
  background-color: ${props =>
    props.$isScrolled ? 'whitesmoke' : 'whitesmoke'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  z-index: 1000;
  transition: background-color 0.3s ease, color 0s ease;
  box-sizing: border-box;
`

const Col = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.div`
  margin-left: 20px;
  margin-right: -50px;
  width: 180px;
`

const Items = styled.ul<NavProps>`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    display: ${props => (props.$isMenuOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 80%;
    max-height: 300px;
    overflow-y: auto;
    background-color: ${props =>
      props.$isScrolled
        ? 'rgba(255, 255, 255, 0.8)'
        : 'rgba(245, 245, 245, 0.8)'};
    padding: 15px 20px;
    z-index: 999;
    width: 40%;
    top: 85%;
    left: 60%;
    opacity: 1;
    border-radius: 20px;
  }
`

const Item = styled.li`
  font-size: 17px;
  margin-right: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0s ease-in-out;
    &:hover {
      color: inherit;
    }
    &:visited {
      color: inherit;
    }
    &:active {
      color: inherit;
    }
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
    width: 100%;
    text-align: center;
  }
`

const Underline = styled(motion.span)<NavProps>`
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: -7px;
  left: 0;
  background-color: black;
  transform-origin: left;

  @media (max-width: 768px) {
    bottom: -2px;
    display: none;
  }
`

const SearchContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  max-width: 600px;
  min-width: 50px;
  padding: 5px;
  background: transparent;
  border-radius: 10px;
  position: relative;
  z-index: 1001;
`

const SearchInputContainer = styled(motion.div)`
  width: 100%;
`

const SearchInput = styled.input`
  width: 100%;
  font-size: 10px;
  padding: 10px 40px 10px 10px;
  border: solid #9f9d9d71;
  border-radius: 10px;
  background: transparent;
  color: #000000;
  outline: none;
  box-sizing: border-box;
`

const SearchButton = styled(motion.button)`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  svg {
    width: 20px;
    height: 20px;
  }
`

const ToggleButton = styled.button<NavProps>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 5px;
    svg {
      width: 24px;
      height: 24px;
      stroke: ${props => (props.$isScrolled ? 'black' : 'black')};
    }
  }
`

const searchVariants = {
  hidden: { width: '50px', opacity: 1 },
  visible: {
    width: '100%',
    opacity: 1,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
}

const underlineVariants = {
  hidden: { width: '0%' },
  visible: { width: '100%', transition: { duration: 0.2, ease: 'easeInOut' } }
}

const introText = {
  title: '희.비',
  desc: ['PORTFOLIO', 'by MINSEOK']
}

function Header () {
  const location = useLocation()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)

  const isHome = location.pathname === '/'
  console.log('Current path:', location.pathname)
  console.log('Is home:', isHome)
  console.log('Rendering SearchContainer:', !isHome)

  const toggleSearch = () => setIsSearchOpen(prev => !prev)
  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      // 홈이 아닌 페이지에서만 모바일 전환 시 닫기
      if (window.innerWidth <= 768 && !isHome) {
        setIsMenuOpen(false)
      }
    }
    handleResize() // 초기 로드 시 체크
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [location.pathname, isHome]) // isHome 추가로 홈 페이지 감지

  useEffect(() => {
    const handleClickOutsideSearch = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        isSearchOpen
      ) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutsideSearch)
    return () =>
      document.removeEventListener('mousedown', handleClickOutsideSearch)
  }, [isSearchOpen])

  useEffect(() => {
    const handleClickOutsideMenu = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isMenuOpen &&
        !toggleButtonRef.current?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutsideMenu)
    return () =>
      document.removeEventListener('mousedown', handleClickOutsideMenu)
  }, [isMenuOpen])

  return (
    <Nav $isScrolled={isScrolled}>
      <Col>
        <Logo>
          <h1 className='intro__title'>{introText.title}</h1>
        </Logo>
        <Items $isScrolled={isScrolled} $isMenuOpen={isMenuOpen} ref={menuRef}>
          <Item>
            <Link to='/' onClick={toggleMenu}>
              Home{' '}
              {isHome && (
                <Underline
                  $isScrolled={isScrolled}
                  variants={underlineVariants}
                  initial='hidden'
                  animate='visible'
                />
              )}
            </Link>
          </Item>
          <Item>
            <Link to='/popular' onClick={toggleMenu}>
              Popular{' '}
              {location.pathname === '/popular' && (
                <Underline
                  $isScrolled={isScrolled}
                  variants={underlineVariants}
                  initial='hidden'
                  animate='visible'
                />
              )}
            </Link>
          </Item>
          <Item>
            <Link to='/comingsoon' onClick={toggleMenu}>
              Coming Soon{' '}
              {location.pathname === '/comingsoon' && (
                <Underline
                  $isScrolled={isScrolled}
                  variants={underlineVariants}
                  initial='hidden'
                  animate='visible'
                />
              )}
            </Link>
          </Item>
          <Item>
            <Link to='/nowplaying' onClick={toggleMenu}>
              Now Playing{' '}
              {location.pathname === '/nowplaying' && (
                <Underline
                  $isScrolled={isScrolled}
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
        {!isHome && (
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
              <svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
            </SearchButton>
          </SearchContainer>
        )}
        <ToggleButton
          $isScrolled={isScrolled}
          onClick={toggleMenu}
          ref={toggleButtonRef}
        >
          <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M4 6h16M4 12h16M4 18h16' strokeWidth='2' />
          </svg>
        </ToggleButton>
      </Col>
    </Nav>
  )
}

export default Header
