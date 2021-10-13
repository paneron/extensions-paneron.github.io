import path from 'path'
import callsite from 'callsite'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'


type EntryComponent = React.VoidFunctionComponent<Record<never, never>>;


/** Renders given component, sets up hot reload. */
export default function renderApp(App: EntryComponent, hotReloadRelativePath?: string): EntryComponent {
  // Render your app
  if (typeof document !== 'undefined') {
    const target = document.getElementById('root')

    const renderMethod = target.hasChildNodes()
      ? ReactDOM.hydrate
      : ReactDOM.render

    const render = (Comp: EntryComponent) => {
      renderMethod(
        <AppContainer>
          <Comp />
        </AppContainer>,
        target
      )
    }

    render(App)

    // Hot Module Replacement
    const callerPath = callsite()[1].getFileName?.();
    if (hotReloadRelativePath && callerPath && module && module.hot) {
      module.hot.accept(path.join(callerPath, hotReloadRelativePath), () => {
        render(App)
      })
    }
  }
  return App;
}

/*
// Your top level component
import App from './App'

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const target = document.getElementById('root')

  const renderMethod = target.hasChildNodes()
    ? ReactDOM.hydrate
    : ReactDOM.render

  const render = (Comp: Function) => {
    renderMethod(
      <AppContainer>
        <Comp />
      </AppContainer>,
      target
    )
  }

  // Render!
  render(App)

  // Hot Module Replacement
  if (module && module.hot) {
    module.hot.accept('./App', () => {
      render(App)
    })
  }
}
*/
