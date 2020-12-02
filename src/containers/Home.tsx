/** @jsx jsx */

import { jsx } from '@emotion/core'
import { useRouteData } from 'react-static'
import React from 'react'
import { Extension } from 'src/types'
import { Link } from '@reach/router'


export default function () {
  const { extensions } = useRouteData<{ extensions: Extension[] }>()
  return (
    <React.Fragment>
      {extensions.map(e =>
        <Link key={e.npm.name} to={`/e/${e.npm.name}`}>
          {e.title}
        </Link>
      )}
    </React.Fragment>
  )
}
