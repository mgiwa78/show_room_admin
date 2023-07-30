import {PageTitle} from '@layouts/core'
import React from 'react'
import {StatisticsWidget5} from './partials/widgets/StatisticsWidget5'
import {MixedWidget1} from './partials/widgets/MixedWidget1'
import RecentImpressions from './RecentImpressions'

const AdminDasboard = () => {
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
              title='32'
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
              title='4'
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
              title='12'
              titleColor='white'
              description='Active Rooms'
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
