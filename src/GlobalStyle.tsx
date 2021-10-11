/** @jsx jsx */

import { Global, jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import chroma from 'chroma-js'


export const pageContainerSelector = 'body > #root > div:first-of-type'

export const primaryColor = chroma('#495563')
export const colorScale = chroma.scale([primaryColor, '#afafaf']).mode('lab').domain([0, 1])

export const BIG_SCREEN_BREAKPOINT_PX = 800;


export const LOGO_SIDE_REM = 8.5
export const BORDER_RADIUS_REM = .75


export const ItemTitle = styled.span`
  font-size: 140%;
  letter-spacing: -.03rem;
  font-weight: 400;
`


export const Shaded = styled.div`
  position: relative;
  box-shadow:
    0 1px 4px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(0, 0, 0, 0.1) inset;

  &:before, &:after {
    content: "";
    position: absolute;
    z-index: -1;
    box-shadow: 0 0 12px rgba(0,0,0,0.8);
    top: 50%;
    bottom: 0;
    left: 10px;
    right: 10px;
    border-radius: 100px / 10px;
  }
`


export default <Global styles={css`
  * {
    scroll-behavior: smooth;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 17px;
    font-weight: 300;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    margin: 0;
    padding: 0;

    min-height: 100vh;
    background-image: linear-gradient(157deg, ${colorScale(0.15).css()}, ${colorScale(0.5).css()});

  }

  ${pageContainerSelector} {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }

  ${pageContainerSelector} > div:first-of-type {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

    max-width: 100vw;
  }

  p {
    font-size: 100%;
    line-height: 1.5;
  }

  a {
    color: ${primaryColor.css()};
    text-decoration: none;
  }

  :global .svg-inline--fa {
    height: 1em;
    width: 1em;
  }

  img {
    max-width: 100%;
  }
`} />


export const Spinner = styled.div`
  &, &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }

  & {
    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(255, 255, 255, 0.2);
    border-right: 1.1em solid rgba(255, 255, 255, 0.2);
    border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
    border-left: 1.1em solid #ffffff;
    transform: translateZ(0);
    animation: load8 1.1s infinite linear;
  }

  @-webkit-keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
