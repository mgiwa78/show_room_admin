/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {PageTitle} from '../layouts/core'
import {useSelector} from 'react-redux'
import {selectUserAuth} from '@stores/auth/authSlector'
import OrganizationAdmin from '@components/OrganizationAdmin'
import AccountingDasboard from '@components/OrganizationAdmin'

const Dashboard: FC = () => {
  const userAuth = useSelector(selectUserAuth)
  return (
    <>
      {userAuth?.roles.includes('Organization Admin') && (
        <>
          <OrganizationAdmin />
        </>
      )}
    </>
  )
}

export {Dashboard}
