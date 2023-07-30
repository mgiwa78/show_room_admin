/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {toAbsoluteUrl} from '@helpers/AssetHelpers'
import {KTIcon} from '@helpers/index'
import get from '@lib/get'
import {ASSETS_URL} from '__CONSTANTS__/index'
import {formatDateToWords} from '@helpers/formateDate'
import {Link, Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {selectUserToken} from '@stores/auth/authSlector'
import {Category} from '../types/Category'

type Props = {
  className: string
}

const AllCategories: React.FC<Props> = ({className = 'danger'}) => {
  const [categories, setCategories] = useState([])
  const userToken = useSelector(selectUserToken)

  const handleFetchCategories = async () => {
    const data = await get('categories', userToken)
    if (data) {
      setCategories(data)
    }
  }

  useEffect(() => {
    handleFetchCategories()
  }, [])
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'> All Categories</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>
            {categories ? `Over ${categories.length} new categories` : 'No Categories'}
          </span>
        </h3>
        <div className='card-toolbar'>
          <Link to={'organization/categories/create'} className='btn btn-sm btn-light-primary'>
            <KTIcon iconName='plus' className='fs-2' />
            Create Category
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-325px rounded-start'>Image</th>
                <th className='min-w-200px'>Date Created</th>
                <th className='min-w-150px'>Total</th>
                <th className='min-w-200px text-end rounded-end'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {categories.length ? (
                categories.map((category: Category) => (
                  <tr key={category._id}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-50px me-5'>
                          <img
                            src={`${ASSETS_URL + 'categories/' + category?.categoryBanner}`}
                            className=''
                            alt=''
                          />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                          <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                            {category.name}
                          </span>
                          <span className='text-muted fw-semibold text-muted d-block fs-7'>
                            {category.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <a
                        href='#'
                        className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                      >
                        {formatDateToWords(category.createdAt)}
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        Rejected
                      </span>
                    </td>
                    <td>
                      <a
                        href='#'
                        className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                      >
                        Admin
                      </a>
                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        {formatDateToWords(category.createdAt)}
                      </span>
                    </td>

                    <td className='text-end'>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='switch' className='fs-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='pencil' className='fs-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <KTIcon iconName='trash' className='fs-3' />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className='text-center'>
                  <td className='fw-bold text-dark bg-light p-10' colSpan={4}>
                    {' '}
                    No Categories
                  </td>
                </tr>
              )}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default AllCategories
