// import {FC, Suspense} from 'react'
import {Route, Routes, Navigate, Outlet} from 'react-router-dom'
import {MasterLayout} from '../layouts/MasterLayout'
// import TopBarProgress from 'react-topbar-progress-indicator'
import {Dashboard} from '../views/Dashboard'

import {AccountHeader} from '@views/accounts/AccountHeader'
import {PageLink, PageTitle} from '@layouts/core'
import {Overview} from '@views/accounts/components/Overview'
import {Settings} from '@views/accounts/components/settings/Settings'
import CreateProduct from '@views/CreateProduct'
import AllProduct from '@views/AllProducts'
import CreateCategory from '@views/CreateCategory'
import AllCategories from '@views/AllCategories'
import ManageRoom from '@views/ManageRoom'

// import {getCSSVariableValue} from '../types/_utils'
// import {WithChildren} from '../helpers/index'

const PrivateRoutes = () => {
  // const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  // const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  // const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  // const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  // const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  // const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const accountBreadCrumbs: Array<PageLink> = [
    {
      title: 'Profile',
      path: '/profile/overview',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  return (
    <Routes>
      <Route path='/*' element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        {/* <Route path='auth/*' element={<Navigate to='organization/dashboard' />} /> */}

        <Route path='organization'>
          {/* Pages */}
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='products'>
            <Route path='create' element={<CreateProduct />} />
            <Route path='all' element={<AllProduct className='danger' />} />
          </Route>
          <Route path='categories'>
            <Route path='create' element={<CreateCategory />} />
            <Route path='all' element={<AllCategories className='danger' />} />
          </Route>

          <Route path='room' element={<ManageRoom />} />

          <Route
            path='profile'
            element={
              <>
                <AccountHeader />
                <Outlet />
              </>
            }
          >
            <Route
              path='overview'
              element={
                <>
                  <PageTitle breadcrumbs={accountBreadCrumbs}>Overview</PageTitle>
                  <Overview />
                </>
              }
            />
            <Route
              path='settings'
              element={
                <>
                  <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle>
                  <Settings />
                </>
              }
            />
            <Route index element={<Navigate to='/overview' />} />
          </Route>
        </Route>

        {/* <Route path='*' element={<Navigate to='/error/404' />} /> */}
      </Route>
    </Routes>
  )
}

// const SuspensedView: FC<WithChildren> = ({children}) => {
//   const baseColor = getCSSVariableValue('--bs-primary')
//   TopBarProgress.config({
//     barColors: {
//       '0': baseColor,
//     },
//     barThickness: 1,
//     shadowBlur: 5,
//   })
//   return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
// }

export {PrivateRoutes}
