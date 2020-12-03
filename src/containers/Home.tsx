/** @jsx jsx */

import { jsx, css } from '@emotion/core'
import { useRouteData } from 'react-static'
import React from 'react'
import { Link } from '@reach/router'
import { Extension } from 'src/types'
import { ExtensionTitle, BORDER_RADIUS_REM, LOGO_SIDE_REM, Shaded, BIG_SCREEN_BREAKPOINT_PX } from '../GlobalStyle'



export default function () {
  const { extensions } = useRouteData<{ extensions: Extension[] }>()
  return (
    <React.Fragment>
      <h2 css={css`
          font-weight: 200; font-size: 200%; color: white;
          padding: 0 1rem;
          text-align: center;
        `}>
        Extensions for&nbsp;managing structured&nbsp;data
      </h2>
      <div css={css`
          flex: 1;
          align-self: stretch;

          @media screen and (min-width: ${BIG_SCREEN_BREAKPOINT_PX}px) {
            display: flex;
            flex-flow: row wrap;
            align-items: flex-start;
            justify-content: center;

            & > * {
              width: 20rem;
              margin: 0 0 .5rem .5rem;
            }
          }
        `}>
        {extensions.map(e => <ExtensionCard extension={e} />)}
      </div>
    </React.Fragment>
  )
}



const ExtensionCard: React.FC<{ extension: Extension, className?: string }> =
function ({ extension, className }) {
  return (
    <Shaded aria-role="article" className={className} css={css`
        background: white;

        @media screen and (min-width: ${BIG_SCREEN_BREAKPOINT_PX}px) {
          border-radius: ${BORDER_RADIUS_REM}rem ${BORDER_RADIUS_REM}rem ${BORDER_RADIUS_REM}rem ${BORDER_RADIUS_REM}rem;
        }

        display: flex;
        flex-flow: column nowrap;
      `}>
      <div css={css`
          height: ${LOGO_SIDE_REM}rem; width: ${LOGO_SIDE_REM}rem;
          border-radius: 0 ${BORDER_RADIUS_REM}rem 0 0;
          position: absolute;
          overflow: hidden;
          top: 0;
          right: 0;
        `}>
        <img
          src={extension.iconURL}
          css={css`
            height: ${LOGO_SIDE_REM}rem; width: ${LOGO_SIDE_REM}rem;
            display: block;
            position: relative;
            top: -2.5rem;
            right: -2.5rem;
            opacity: .4;
          `}
        />
      </div>
      <header css={css`
          flex: 0;
          padding-right: 1rem;
          padding: 0 1rem;
          margin: 1rem 0;
        `}>
        <ExtensionTitle css={css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
          `}>
          {extension.title}
        </ExtensionTitle>
        <div css={css`font-size: 75%; margin-top: .5rem;`}>
          {extension.npm.version}&ensp;•&ensp;by {extension.author}
        </div>
      </header>

      <main css={css`
          flex: 1; padding: 0 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `}>
        {extension.description}
      </main>

      <footer css={css`
          flex: 0; padding: 0 1rem; margin: 1rem 0 1rem 0;
          font-size: 80%;
        `}>
        <Link
            key={extension.npm.name}
            to={`/e/${extension.npm.name}`}
            css={css`
              color: #444;
              font-weight: 800;
              letter-spacing: .05rem;
              text-transform: uppercase;
            `}>
          Read more
        </Link>
      </footer>
    </Shaded>
  )
}
