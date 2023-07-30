import {createRoot} from 'react-dom/client'
// Axios
import React from 'react'
import {Chart, registerables} from 'chart.js'

import './assets/fonticon/fonticon.css'
import './assets/keenicons/duotone/style.css'
import './assets/keenicons/outline/style.css'
import './assets/keenicons/solid/style.css'

import './assets/sass/style.scss'
import './assets/sass/plugins.scss'
import './assets/sass/style.react.scss'
import {AppRoutes} from './router/AppRoutes'

import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store} from './store'
import {persistStore} from 'redux-persist'

Chart.register(...registerables)
let persistor = persistStore(store)

const container = document.getElementById('root')

if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoutes />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )
}
