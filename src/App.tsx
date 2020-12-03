/** @jsx jsx */

import React from 'react'
import { jsx, css } from '@emotion/core'
import { Root, Routes } from 'react-static'
import { Router, Link } from '@reach/router'
import { Helmet } from 'react-helmet'
import globalStyle, { BORDER_RADIUS_REM, Spinner } from './GlobalStyle'


function App() {
  return (
    <Root>
      {globalStyle}

      <Helmet>
        <title>Paneron extension directory</title>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <h1 css={css`
          margin: 0;

          @media screen and (min-width: 800px) {
            margin: 0 auto;
            width: 80vw;
            border-radius: 0 0 ${BORDER_RADIUS_REM}rem ${BORDER_RADIUS_REM}rem;
          }

          overflow: hidden;
          align-self: stretch;
          background: rgba(0, 0, 0, 0.1);
          font-size: 90%;
          color: rgba(255, 255, 255, 0.7);
          display: flex;
          flex-flow: row nowrap;

          & > * {
            padding: .5rem 1rem .5rem 1rem;
          }
        `}>
        <span css={css`font-weight: 400`}>Paneron</span>
        <Link
            css={css`font-weight: 800; background: rgba(0, 0, 0, 0.2); color: white;`}
            to="/">
          Extensions
        </Link>
      </h1>

      <React.Suspense fallback={<Spinner />}>
        <Router>
          <Routes path="*" />
        </Router>
      </React.Suspense>
    </Root>
  )
}

export default App
