/** @jsx jsx */

import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import parseJSON from 'date-fns/parseJSON'
import formatRelative from 'date-fns/formatRelative'
import chroma from 'chroma-js'
import { useRouteData } from 'react-static'
import { Extension } from '../types'
import { Shaded, ItemTitle } from '../common/misc'
import { BORDER_RADIUS_REM, colorScale, BIG_SCREEN_BREAKPOINT_PX } from '../common/constants'


const highlitSectionBackground = chroma.scale(['white', colorScale(0.2)])(0.15).css();


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
        }
      `}>
      <Shaded role="banner" css={css`
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          background: whiteSmoke;
          padding: 1rem;

          @media screen and (min-width: ${BIG_SCREEN_BREAKPOINT_PX}px) {
            border-radius: ${BORDER_RADIUS_REM}rem ${BORDER_RADIUS_REM}rem 0 0;
          }
        `}>
        <img
          src={extension.iconURL}
          css={css`height: 6rem; width: 6rem; display: block; margin-right: .5rem;`} />
        <h2 css={css`font-size: 100%; font-weight: 400; margin-right: 1rem; display: inline;`}>
          <ItemTitle>{extension.title}</ItemTitle>
          &emsp;
          <span css={css`font-size: 80%; font-weight: 200; white-space: nowrap;`}>
            {extension.npm.version}&ensp;•&ensp;by {extension.author}
          </span>
        </h2>
      </Shaded>

      <MetaRow>
        <MetaLabel>Compatible with</MetaLabel>
        &emsp;
        Paneron v{extension.requiredHostAppVersion}
      </MetaRow>

      {extension.websiteURL
        ? <MetaRow>
            <MetaLabel>Website</MetaLabel>
            &emsp;
            <a href={extension.websiteURL}>{extension.websiteURL}</a>
          </MetaRow>
        : null}

      <section css={css`
          overflow: hidden;
          background: ${highlitSectionBackground};
          padding: 0 1rem;
        `}>
        <p>
          {extension.description}
        </p>
      </section>

      <MetaRow>
        <MetaLabel>NPM package</MetaLabel>
        &emsp;
        <a href={`https://npmjs.com/package/${extension.npm.name}`}>{extension.npm.name}</a>
      </MetaRow>

      {extension.npm.bugs?.url
        ? <MetaRow>
            <MetaLabel>Bug tracker</MetaLabel>
            &emsp;
            <a href={extension.npm.bugs.url}>{extension.npm.bugs.url}</a>
          </MetaRow>
        : null}

      <ImportantMetaRow title={latestUpdate.toLocaleDateString()} css={css`
          @media screen and (min-width: ${BIG_SCREEN_BREAKPOINT_PX}px) {
            border-radius: 0 0 ${BORDER_RADIUS_REM}rem ${BORDER_RADIUS_REM}rem;
          }
        `}>
        This extension was updated
        {" "}
        {formatRelative(latestUpdate, new Date())}.
      </ImportantMetaRow>
    </main>
  )
}


const MetaLabel = styled.span`
  font-size: 80%;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: -.01em;
  color: #666;
`


const ImportantMetaRow = styled(Shaded)`
  background: ${highlitSectionBackground};
  padding: 1rem;
`


const MetaRow = styled.section`
  padding: .5rem 1rem;
  font-size: 85%;

  background: rgba(255, 255, 255, 0.7);
  margin: 1px .15rem;
`
