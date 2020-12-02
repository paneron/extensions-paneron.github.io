/** @jsx jsx */

import { jsx, css } from '@emotion/core'
import { useRouteData } from 'react-static'
import { Extension } from 'src/types'
import React from 'react'


export default function () {
  const { extension } = useRouteData<{ extension: Extension }>()
  return (
    <React.Fragment>
      <h1>{extension.title}</h1>
      <img src={extension.iconURL} css={css`height: 4rem; width: 4rem; display: block;`} />
      <pre>{JSON.stringify(extension)}</pre>
    </React.Fragment>
  )
}
