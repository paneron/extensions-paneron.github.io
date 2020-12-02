/** @jsx jsx */

import { jsx } from '@emotion/core'
import { useRouteData } from 'react-static'
import { Extension } from 'src/types'


export default function () {
  const { extension } = useRouteData<{ extension: Extension }>()
  return (
    <pre>
      {JSON.stringify(extension)}
    </pre>
  )
}
