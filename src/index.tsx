import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RecoilRoot } from 'recoil'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from './theme.ts'

const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
}`

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
)
