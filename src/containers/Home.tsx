/** @jsx jsx */

import { jsx } from '@emotion/core'
import { useRouteData } from 'react-static'
import { Extension } from 'src/types'


export default function () {
  const { extensions } = useRouteData<{ extensions: Extension[] }>()
  return (
    <pre>
      {extensions.map(e => <p>{JSON.stringify(e)}</p>)}
    </pre>
  )
}
