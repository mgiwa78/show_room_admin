/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {toAbsoluteUrl} from '@helpers/AssetHelpers'
import {KTIcon} from '@helpers/index'
import get from '@lib/get'
import __CONSTANTS__ from '__CONSTANTS__/index'
import {formatDateToWords} from '@helpers/formateDate'
import {Link, Navigate} from 'react-router-dom'
import type Product from '../types/Product'
import {useSelector} from 'react-redux'
import {selectUserToken} from '@stores/auth/authSlector'

type Props = {
  className: string
}

const AllProduct: React.FC<Props> = ({className = 'danger'}) => {
  const {ASSETS_URL} = __CONSTANTS__
  const [products, setProducts] = useState([])
  const userToken = useSelector(selectUserToken)

  const handleFetchProducts = async () => {
    const data = await get('products', userToken)
    if (data) {
      setProducts(data)
    }
  }

  useEffect(() => {
    handleFetchProducts()
  }, [])
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'> All Products</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>
            {products ? `Over ${products.length} new products` : 'No Products'}
          </span>
        </h3>
        <div className='card-toolbar'>
          <Link to={'organization/products/create'} className='btn btn-sm btn-light-primary'>
            <KTIcon iconName='plus' className='fs-2' />
            Create Product
          </Link>
        </div>
      </div>

      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-325px rounded-start'>Image</th>
                <th className='min-w-125px'>Category</th>
                <th className='min-w-200px'>Uploaded By</th>
                <th className='min-w-150px'>Stock</th>
                <th className='min-w-200px text-end rounded-end'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {products.length ? (
                products.map((product: Product) => (
                  <tr key={product._id}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-50px me-5'>
                          <img
                            src={`${ASSETS_URL + 'products/' + product?.profilePicture}`}
                            className=''
                            alt=''
                          />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                          <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                            {product.name}
                          </span>
                          <span className='text-muted fw-semibold text-muted d-block fs-7'>
                            {product.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <a
                        href='#'
                        className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                      >
                        {product.category ? product.category.name : 'No Category'}
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
                        {formatDateToWords(product.createdAt)}
                      </span>
                    </td>
                    <td>
                      <span className='badge badge-light-primary fs-7 fw-semibold'>Approved</span>
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
                    No Products
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

export default AllProduct
