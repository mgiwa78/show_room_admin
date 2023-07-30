import React, {useEffect, useState} from 'react'
import {toAbsoluteUrl} from '@helpers/index'
// import {IProfileDetails, profileDetailsInitValues as initialValues} from '../SettingsModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {Organization} from '../../../../../types/Organization'
import {useSelector} from 'react-redux'
import {selectUserAuth, selectUserToken} from '@stores/auth/authSlector'
import get from '@lib/get'
import put from '@lib/put'
import post from '@lib/post'
import {ASSETS_URL} from '__CONSTANTS__/index'

const organizationDetailsSchema = Yup.object().shape({
  name: Yup.string().required('Company Name is required'),
  logo: Yup.mixed().required('Logo is required'),
  description: Yup.string().required('Company name is required'),
  organizationContact: Yup.string().required('Contact phone is required'),
  email: Yup.string().required('Contact phone is required'),
  address: Yup.string().required('Address is required'),
})

interface OrgaizationDefault {
  name: string
  logo: string
  logoFile: string
  description: string
  organizationContact: string
  address: string
  email: string
  verificationToken: string
}

const orgaizationDefault = {
  name: '',
  logo: '',
  logoFile: '',
  description: '',
  organizationContact: '',
  address: '',
  email: '',
  verificationToken: '',
}

const OrganizationDetails: React.FC = () => {
  const userAuth = useSelector(selectUserAuth)
  const userToken = useSelector(selectUserToken)

  // const [data, setData] = useState<Organization>(orgaizationDefault)
  // const updateData = (fieldsToUpdate: Partial<Organization>): void => {
  //   const updatedData = Object.assign(data, fieldsToUpdate)
  //   setData(updatedData)
  // }

  const [loading, setLoading] = useState(false)
  const [logo, setLogo] = useState(null)

  const formik = useFormik<OrgaizationDefault>({
    initialValues: orgaizationDefault,
    validationSchema: organizationDetailsSchema,
    onSubmit: async (values) => {
      setLoading(true)
      const formData = new FormData()

      const data = {
        name: values.name,
        address: values.address,
        description: values.description,
        email: values.email,
        organizationContact: values.organizationContact,
      }

      const RESPONSE = await put(
        'organizations',
        data,
        userToken,
        true,
        'Organization Profile Update Success'
      )

      console.log(values.logoFile)
      const organizationID = RESPONSE.data._id
      formData.append('organizationID', organizationID)
      formData.append('organizationLogo', values.logoFile[0])

      post(`organizations/image/${organizationID}`, formData, userToken)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    },
  })

  const handleFetchOrganizationDetails = async () => {
    const RESPONSE = await get('organizations/profile', userToken)

    if (RESPONSE) {
      formik.setFieldValue('name', RESPONSE?.name)
      setLogo(RESPONSE.logo)
      formik.values.name = RESPONSE.name ? RESPONSE?.name : ''
      formik.values.address = RESPONSE.address ? RESPONSE?.address : ''
      formik.values.description = RESPONSE.description ? RESPONSE?.description : ''
      formik.values.email = RESPONSE.email ? RESPONSE?.email : ''
      formik.values.organizationContact = RESPONSE.organizationContact
        ? RESPONSE?.organizationContact
        : ''
    }
  }

  useEffect(() => {
    handleFetchOrganizationDetails()
  })
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_organization_details'
        aria-expanded='true'
        aria-controls='kt_account_organization_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Organization Details</h3>
        </div>
      </div>

      <div id='kt_account_organization_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <div className='col-lg-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
                <div className='col-lg-8'>
                  <div
                    className='image-input image-input-outline'
                    data-kt-image-input='true'
                    style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                  >
                    <div
                      className='image-input-wrapper w-125px h-125px'
                      style={{
                        backgroundImage: `url(${ASSETS_URL + 'organizationLogo/' + logo})`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <label htmlFor='logo' className='form-label fs-6 fw-bolder mb-3'>
                  Company Logo
                </label>

                <div>
                  <input
                    type='file'
                    {...formik.getFieldProps('logo')}
                    value={formik.values.logo}
                    onChange={(event: any) => {
                      if (event.target.files) {
                        formik.setFieldValue('logo', event.target.value)
                        formik.setFieldValue('logoFile', event.target.files)
                      } else {
                        formik.setFieldValue('logo', '')
                        formik.setFieldValue('logoFile', '')
                      }
                    }}
                    name='logo'
                    id='logo'
                  ></input>
                  {formik.touched.logo && formik.errors.logo && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.logo}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Company Name</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='First name'
                      {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.name}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Description</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Description'
                      {...formik.getFieldProps('description')}
                    />
                    {formik.touched.description && formik.errors.description && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.description}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Company address
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

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Organization Contact</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Organization Contact'
                  {...formik.getFieldProps('organizationContact')}
                />
                {formik.touched.organizationContact && formik.errors.organizationContact && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.organizationContact}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Email</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Email'
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.email}</div>
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

export {OrganizationDetails}
