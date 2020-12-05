/** @jsx jsx */

import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import parseJSON from 'date-fns/parseJSON'
import formatRelative from 'date-fns/formatRelative'
import { useRouteData } from 'react-static'
import { Extension } from 'src/types'
import { Shaded, BORDER_RADIUS_REM, ExtensionTitle, colorScale, BIG_SCREEN_BREAKPOINT_PX } from '../GlobalStyle'
import chroma from 'chroma-js'


export default function () {
  const { extension } = useRouteData<{ extension: Extension }>()
  const latestUpdate = parseJSON(extension.latestUpdate)

  return (
    <main css={css`
        margin: 0;
        width: 100vw;

        @media screen and (min-width: ${BIG_SCREEN_BREAKPOINT_PX}px) {
          margin: 1rem auto;
          width: 80vw;
          border-radius: ${BORDER_RADIUS_REM}rem ${BORDER_RADIUS_REM}rem 0 0;
        }

        overflow: hidden;
      `}>
      <Shaded role="banner" css={css`
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

      <MetaRow>
        Compatible with Paneron v{extension.requiredHostAppVersion}
      </MetaRow>

      <MetaRow title={latestUpdate.toLocaleDateString()}>
        Latest update:
        &emsp;
        {formatRelative(latestUpdate, new Date())}
      </MetaRow>

      {extension.websiteURL
        ? <MetaRow>
            Website:
            &emsp;
            <a href={extension.websiteURL}>{extension.websiteURL}</a>
          </MetaRow>
        : null}

      <section css={css`
          overflow: hidden;
          background: ${chroma.scale(['white', colorScale(0.2)])(0.15).css()};
          padding: 0 1rem;
        `}>
        <p>
          {extension.description}
        </p>
      </section>

      <MetaRow>
        NPM package:
        &emsp;
        <a href={`https://npmjs.com/package/${extension.npm.name}`}>{extension.npm.name}</a>
      </MetaRow>

      {extension.npm.bugs?.url
        ? <MetaRow>
            Bug tracker:
            &emsp;
            <a href={extension.npm.bugs.url}>{extension.npm.bugs.url}</a>
          </MetaRow>
        : null}
    </main>
  )
}


const MetaRow = styled.section`
  padding: .5rem 1rem;
  margin: 1px .15rem;
  background: rgba(255, 255, 255, 0.7);
  font-size: 85%;
`
