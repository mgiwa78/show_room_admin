import {PageTitle} from '@layouts/core'
import React, {useEffect, useState} from 'react'
import {StatisticsWidget5} from './partials/widgets/StatisticsWidget5'
import {MixedWidget1} from './partials/widgets/MixedWidget1'
import RecentImpressions from './RecentImpressions'
import get from '@lib/get'
import {useSelector} from 'react-redux'
import {selectUserToken} from '@stores/auth/authSlector'

const AdminDasboard = () => {
  const userToken = useSelector(selectUserToken)
  const [productsCount, setProductCount] = useState(0)
  const [categoriesCount, setCategorieCount] = useState(0)
  const [usersCount, setUsersCount] = useState(0)

  const usersSummary = [
    {
      colour: 'danger',
      title: 'Sales Summary',
      description: 'You Balance',
      amount: '$37,562.00',
      data: [
        {title: 'Sales', description: '100 Regions', amount: '$2,5b', icon: 'compass'},
        {title: 'Revenue', description: 'Quarter 2/3', amount: '$1,7b', icon: 'category'},
        {title: 'Growth', description: '80% Rate', amount: '$8,8m', icon: 'phone'},
        {title: 'Dispute', description: '3090 Refunds', amount: '$270m', icon: 'document'},
      ],
    },
  ]

  const fetchDashboardData = async () => {
    const products = await get('products', userToken)
    const categories = await get('categories', userToken)
    const users = await get('users', userToken)

    if (products) {
      setProductCount(products.length)
    }
    if (categories) {
      setCategorieCount(categories.length)
    }
    if (users) {
      setUsersCount(users.length)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])
  return (
    <>
      <PageTitle>Organization Admin</PageTitle>
      <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
        <div className='row g-5 g-xl-8'>
          <div className='col-xl-4'>
            <StatisticsWidget5
              className='card-xl-stretch mb-xl-8'
              svgIcon='user'
              color='danger'
              iconColor='white'
              title={`${productsCount}`}
              titleColor='white'
              description='Products'
              descriptionColor='white'
            />
          </div>

          <div className='col-xl-4'>
            <StatisticsWidget5
              className='card-xl-stretch mb-xl-8'
              svgIcon='cheque'
              color='primary'
              iconColor='white'
              title={`${categoriesCount}`}
              titleColor='white'
              description='Categories'
              descriptionColor='white'
            />
          </div>

          <div className='col-xl-4'>
            <StatisticsWidget5
              className='card-xl-stretch mb-5 mb-xl-8'
              svgIcon='chart-simple-3'
              color='success'
              iconColor='white'
              title={`${usersCount}`}
              titleColor='white'
              description='Users'
              descriptionColor='white'
            />
          </div>
        </div>{' '}
        <div className='row mt-0 '>
          <div className='col-12'>
            {' '}
            <RecentImpressions />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDasboard
