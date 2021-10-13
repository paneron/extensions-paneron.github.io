import styled from '@emotion/styled';


export const PageTitle = styled.h2`
  font-weight: 200;
  font-size: 200%;
  color: white;
  padding: 0 1rem;
  text-align: center;
`;


export const ItemTitle = styled.span`
  font-size: 140%;
  letter-spacing: -.03rem;
  font-weight: 400;
`;


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
`;
