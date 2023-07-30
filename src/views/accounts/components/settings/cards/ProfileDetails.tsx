import React, {useEffect, useState} from 'react'
import {toAbsoluteUrl} from '@helpers/index'
import {IProfileDetails, profileDetailsInitValues as initialValues} from '../SettingsModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {selectUserAuth, selectUserToken} from '@stores/auth/authSlector'
import {useSelector} from 'react-redux'
import {UserAuth} from '@stores/auth/authSlice'

const profileDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  contactNumber: Yup.string().required('Company name is required'),
  address: Yup.string().required('Contact phone is required'),
  email: Yup.string().required('Country is required'),
})

const profileDefault: UserAuth = {
  firstName: '',
  profile: '',
  lastName: '',
  contactNumber: '',
  address: '',
  email: '',
  roles: [''],
}
const ProfileDetails: React.FC = () => {
  const userToken = useSelector(selectUserToken)
  const userAuth = useSelector(selectUserAuth)

  const [data, setData] = useState<UserAuth>(profileDefault)

  // const [profileDefault, setprofileDefault] = useState(userAuth || ProfileDefault)

  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: profileDefault,
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      // setLoading(true)
      // setTimeout(() => {
      //   values.firstName = userAuth?.firstName ? userAuth?.firstName : ''
      //   setLoading(false)
      // }, 1000)
    },
  })
  const handleFetchProfileDetails = async () => {
    if (userAuth) {
      // formik.setFieldValue('firstName', userAuth?.firstName)
      // formik.setFieldValue('lastName', userAuth?.lastName)
      // formik.setFieldValue('contactNumber', userAuth?.contactNumber)
      // formik.setFieldValue('address', userAuth?.address)
      // formik.setFieldValue('email', userAuth?.email)
    }
  }
  useEffect(() => {
    handleFetchProfileDetails()
  })
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
              <div className='col-lg-8'>
                <div
                  className='image-input image-input-outline'
                  data-kt-image-input='true'
                  style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                >
                  <div
                    className='image-input-wrapper w-125px h-125px'
                    style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                  ></div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='First name'
                      {...formik.getFieldProps('firstName')}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.firstName}</div>
                      </div>
                    )}
                  </div>

                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Last name'
                      {...formik.getFieldProps('lastName')}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.lastName}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Contact Phone</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Contact Number'
                  {...formik.getFieldProps('contactNumber')}
                />
                {formik.touched.contactNumber && formik.errors.contactNumber && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.contactNumber}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Address</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Address'
                  {...formik.getFieldProps('address')}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.address}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {!loading && 'Save Changes'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {ProfileDetails}
