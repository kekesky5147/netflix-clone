// eslint-disable-next-line no-unused-vars
import React from 'react'
import styled from 'styled-components'

const FooterCSS = styled.div`
  text-align: center;
  margin: auto;
  max-width: 80%;
  border-top: 1px solid #989898;
  padding: 50px 0px;
  font-size: 13px;
`

const Footer = () => {
  return (
    <FooterCSS>
      <p>Copyright @ 2025, 출.비.여 - All Right Reserver.</p>
    </FooterCSS>
  )
}

export default Footer
