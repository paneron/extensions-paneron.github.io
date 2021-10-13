import chroma from 'chroma-js';

export const pageContainerSelector = 'body > #root > div:first-of-type';

export const primaryColor = chroma('#495563');
export const colorScale = chroma.scale([primaryColor, '#afafaf']).mode('lab').domain([0, 1]);

export const BIG_SCREEN_BREAKPOINT_PX = 800;

export const CARD_ICON_SIDE_REM = 8.5;
export const BORDER_RADIUS_REM = .75;
