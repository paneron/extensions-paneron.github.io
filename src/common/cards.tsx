/** @jsx jsx */

import type React from 'react';
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled';
import { Link } from '@reach/router';

import { BIG_SCREEN_BREAKPOINT_PX, BORDER_RADIUS_REM, CARD_ICON_SIDE_REM } from './constants';
import { Shaded } from './misc';



export const CardStack = styled.div`
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
`;

export const Card = styled(Shaded)`
  background: white;

  @media screen and (min-width: ${BIG_SCREEN_BREAKPOINT_PX}px) {
    border-radius: ${BORDER_RADIUS_REM}rem;
  }

  display: flex;
  flex-flow: column nowrap;
`;

export const CardHeader = styled.header`
  flex: 0;
  padding-right: 1rem;
  padding: 0 1rem;
  margin: 1rem 0;
`;

export const CardBody: React.FC<{ allowWrap?: true; }> = function ({ allowWrap, children }) {
  return <main css={css`
    flex: 1;
    padding: 0 1rem;
    ${allowWrap !== true
      ? `
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `
      : null}
  `}>
    {children}
  </main>;
};

export const CardActions = styled.footer`
  flex: 0;
  padding: 0 1rem;
  margin: 1rem 0 1rem 0;
  font-size: 80%;
`;

export const CardActionLink = styled(Link)`
  color: #444;
  font-weight: 800;
  letter-spacing: .05rem;
  text-transform: uppercase;
`;

export const CardBackgroundIcon: React.VoidFunctionComponent<{ imgURL: string; wrapperClassName?: string; className?: string; }> = function ({ imgURL, wrapperClassName, className }) {
  return (
    <div className={wrapperClassName} css={css`
        height: ${CARD_ICON_SIDE_REM}rem; width: ${CARD_ICON_SIDE_REM}rem;
        border-radius: 0 ${BORDER_RADIUS_REM}rem 0 0;
        position: absolute;
        overflow: hidden;
        top: 0;
        right: 0;
      `}>
      <img
        src={imgURL}
        className={className}
        css={css`
          height: ${CARD_ICON_SIDE_REM}rem; width: ${CARD_ICON_SIDE_REM}rem;
          display: block;
          position: relative;
          top: -2.5rem;
          right: -2.5rem;
          opacity: .4;
        `} />
    </div>
  );
};
