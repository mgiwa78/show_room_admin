import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {LayoutSplashScreen} from './layouts/core'
import {MasterInit} from './layouts/MasterInit'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Outlet />
      <MasterInit />
    </Suspense>
  )
}

export {App}
