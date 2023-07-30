/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {KTIcon} from '@helpers/index'
import {
  ChartsWidget1,
  ListsWidget5,
  TablesWidget1,
  TablesWidget5,
} from '@components/partials/widgets'
import {useSelector} from 'react-redux'
import {selectUserAuth, selectUserToken} from '@stores/auth/authSlector'
import get from '@lib/get'

type OrganizationDetails = {
  name: string
  organizationContact: string
  address: string
  description: string
  contactNumber: string
  emial: string
}
export function Overview() {
  const userToken = useSelector(selectUserToken)
  const userAuth = useSelector(selectUserAuth)

  const [organizationDetails, setOrganizationDetails] = useState<OrganizationDetails | null>(null)

  const handleFetchOrganizationDetails = async () => {
    const RESPONSE = await get('organizations/profile', userToken)
    console.log(RESPONSE)
    if (RESPONSE) {
      setOrganizationDetails(RESPONSE)
    }
  }
  useEffect(() => {
    handleFetchOrganizationDetails()
  }, [])
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>

          <Link to='/organization/profile/settings' className='btn btn-primary align-self-center'>
            Edit Profile
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {userAuth?.firstName || userAuth?.lastName
                  ? userAuth?.firstName + ' ' + userAuth?.lastName
                  : 'No Name set'}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Roles</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{userAuth?.roles.map((r) => r + ' ')}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Contact Phone
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Phone number must be active'
              ></i>
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>
                {userAuth?.contactNumber ? userAuth?.contactNumber : 'No Contact set'}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Address</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 me-2'>
                {userAuth?.contactNumber ? userAuth?.contactNumber : 'No Address set'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Organization Details</h3>
          </div>

          <Link to='/organization/profile/settings' className='btn btn-primary align-self-center'>
            Edit Organization Profile
          </Link>
        </div>
        {organizationDetails ? (
          <div className='card-body p-9'>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Name</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>{organizationDetails.name}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Address</label>

              <div className='col-lg-8 fv-row'>
                <span className='fw-bold fs-6'>{organizationDetails.address}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>
                Contact Phone
                <i
                  className='fas fa-exclamation-circle ms-1 fs-7'
                  data-bs-toggle='tooltip'
                  title='Phone number must be active'
                ></i>
              </label>

              <div className='col-lg-8 d-flex align-items-center'>
                <span className='fw-bolder fs-6 me-2'>
                  {organizationDetails?.organizationContact
                    ? organizationDetails?.organizationContact
                    : 'No Contact Set'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}
