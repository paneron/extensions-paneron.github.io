/** @jsx jsx */

import styled from '@emotion/styled'
import { Link } from '@reach/router'
import { BIG_SCREEN_BREAKPOINT_PX, BORDER_RADIUS_REM } from './constants'


export const TopBar = styled.span`
  align-self: stretch;

  display: flex;
  flex-flow: row nowrap;
  margin: 0;

  @media screen and (min-width: ${BIG_SCREEN_BREAKPOINT_PX}px) {
    margin: 0 auto;
    width: 80vw;
    border-radius: 0 0 ${BORDER_RADIUS_REM}rem ${BORDER_RADIUS_REM}rem;
  }

  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
  font-size: 90%;
  color: rgba(255, 255, 255, 0.7);

  & > * {
    padding: .5rem 1rem .5rem 1rem;
  }
`


const ITEM = `font-weight: 400;`
const ITEM_SELECTED = `font-weight: 800; background: rgba(0, 0, 0, 0.2); color: white;`


export const TopBarItem = styled.span`
  ${ITEM}
`
export const TopBarInternalLink = styled(Link)`
  color: inherit;
  ${ITEM}
`
export const TopBarLink = styled.a`
  color: inherit;
  ${ITEM}
`


export const TopBarItemSelected = styled.span`
  ${ITEM_SELECTED}
`
export const TopBarInternalLinkSelected = styled(Link)`
  ${ITEM_SELECTED}
`
export const TopBarLinkSelected = styled.a`
  ${ITEM_SELECTED}
`
