/** @jsx jsx */

import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import { useRouteData } from 'react-static'
import { Extension } from 'src/types'
import { Shaded, BORDER_RADIUS_REM, ExtensionTitle, colorScale } from '../GlobalStyle'
import chroma from 'chroma-js'
import { primaryColor } from '../GlobalStyle'


export default function () {
  const { extension } = useRouteData<{ extension: Extension }>()
  return (
    <main css={css`
        margin: 0;
        width: 100vw;

        @media screen and (min-width: 800px) {
          margin: 1rem auto;
          width: 80vw;
          border-radius: ${BORDER_RADIUS_REM}rem;
        }

        overflow: hidden;
      `}>
      <Shaded aria-role="banner" css={css`
          display: flex; flex-flow: row nowrap; align-items: center;
          background: whiteSmoke;
          padding: 1rem;
        `}>
        <img
          src={extension.iconURL}
          css={css`height: 6rem; width: 6rem; display: block; margin-right: .5rem;`} />
        <h2 css={css`font-size: 100%; font-weight: 400; margin-right: 1rem; display: inline;`}>
          <ExtensionTitle>{extension.title}</ExtensionTitle>
          &emsp;
          <span css={css`font-size: 80%; font-weight: 200; white-space: nowrap;`}>
            {extension.npm.version}&ensp;•&ensp;by {extension.author}
          </span>
        </h2>
      </Shaded>
      {extension.npm.bugs?.url
        ? <MetaRow css={css`background: ${chroma.scale(['white', colorScale(0.2)])(0.35).css()};`}>
            Bug tracker: <a href={extension.npm.bugs.url}>{extension.npm.bugs.url}</a>
          </MetaRow>
        : null}
      <MetaRow css={css`background: ${chroma.scale(['white', colorScale(0.2)])(0.45).css()};`}>
        Compatible with Paneron v{extension.requiredHostAppVersion}
      </MetaRow>
      <section css={css`
          overflow: hidden;
          background: ${chroma.scale(['white', colorScale(0.2)])(0.15).css()};
          padding: 0 1rem;
        `}>
        <p>
          {extension.description}
        </p>
      </section>
    </main>
  )
}


const MetaRow = styled.section`
  overflow: hidden;
  padding: .5rem 1rem;

  margin: .05rem .05rem;

  & + & {
    margin-top: 0;
  }

  font-size: 85%;

  _box-shadow: 0 -.05rem 0 ${primaryColor.css()}, 0 .05rem 0 ${primaryColor.css()};
  _z-index: 2;
  _position: relative;
`
