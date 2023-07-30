import {PageTitle} from '@layouts/core'
import React, {useState} from 'react'
import * as Yup from 'yup'
import '../assets/sass/styles/file.css'
import {StatisticsWidget5} from '../components/partials/widgets/StatisticsWidget5'
import {MixedWidget1} from '../components/partials/widgets/MixedWidget1'
import {useFormik} from 'formik'
import post from '@lib/post'
import {useSelector} from 'react-redux'
import {selectUserAuth, selectUserToken} from '@stores/auth/authSlector'

const initialValues = {
  roomTitle: '',
  roomDescription: '',
  roomBanner: '',
  roomBannerFile: [],
}

const ManageRoomSchema = Yup.object().shape({
  roomTitle: Yup.string().required('Title is required'),
  roomDescription: Yup.string().required('Room description is required'),
  roomBanner: Yup.string().required('Room description is required'),
  roomBannerFiles: Yup.mixed(),
})

const ManageRoom = () => {
  const userToken = useSelector(selectUserToken)
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: ManageRoomSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(false)
      setLoading(false)

      const formData = new FormData()

      // formData.append('name', values.productName)
      // formData.append('description', values.productDescription)
      // formData.append('category', values.productCategory)

      formData.append('roomBanner', values.roomBannerFile[0])

      const data = {
        title: values.roomTitle,
        description: values.roomDescription,
      }

      const room = await post('rooms', data, userToken, false)

      const roomID = room.data._id
      formData.append('roomID', roomID)
      post(`rooms/image/${roomID}`, formData, userToken)

      formik.resetForm()
      setSubmitting(false)
      setLoading(false)
    },
  })

  // const handleImagesUpload = (e: any) => {
  //   const files = e.target?.files
  //   console.log(files)
  //   if (files) {
  //     console.log(1)
  //     // setOtherImages(files)
  //     return (formik.values.roomBanner = files)
  //   }
  // }
  const handleProfileUpload = (e: any) => {
    console.log(e)
    const file = e.target?.files[0]
    console.log(file)
    if (file) {
      return (formik.values.roomBannerFile = file)
    }
  }

  return (
    <>
      <div className='card'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Manage Room</h3>
          </div>
        </div>
        <div className='card-body '>
          <form onSubmit={formik.handleSubmit} id='kt_signin_change_email' className='form'>
            <div className='row mb-6'>
              <div className='col-lg-6 mb-4 mb-lg-0'>
                <div className='fv-row mb-0'>
                  <label htmlFor='roomTitle' className='form-label fs-6 fw-bolder mb-3'>
                    Enter Room Title
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    id='roomTitle'
                    placeholder='Room Title'
                    {...formik.getFieldProps('roomTitle')}
                  />
                  {formik.touched.roomTitle && formik.errors.roomTitle && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.roomTitle}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='fv-row mb-0'>
                  <label htmlFor='roomDescription' className='form-label fs-6 fw-bolder mb-3'>
                    Enter Room Description
                  </label>
                  <input
                    type='text'
                    placeholder='Room Description'
                    className='form-control form-control-lg form-control-solid'
                    id='roomDescription'
                    {...formik.getFieldProps('roomDescription')}
                  />
                  {formik.touched.roomDescription && formik.errors.roomDescription && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.roomDescription}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <div className='col-lg-6'>
                <div className='fv-row mb-0'>
                  <label htmlFor='roomBanner' className='form-label fs-6 fw-bolder mb-3'>
                    Upload Room Banner
                  </label>

                  <div className='fv-row'>
                    <input
                      type='file'
                      {...formik.getFieldProps('roomBanner')}
                      value={formik.values.roomBanner}
                      onChange={(event: any) => {
                        if (event.target.files) {
                          formik.setFieldValue('roomBanner', event.target.value)
                          formik.setFieldValue('roomBannerFile', event.target.files)
                        } else {
                          formik.setFieldValue('roomBanner', '')
                          formik.setFieldValue('roomBannerFile', '')
                        }
                      }}
                      name='roomBanner'
                      id='roomBanner'
                    ></input>
                    {formik.touched.roomBanner && formik.errors.roomBanner && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.roomBanner}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex'>
              <button id='kt_signin_submit' type='submit' className='btn btn-primary  me-2 px-6'>
                {!loading && 'Update Room'}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
              <button
                id='kt_signin_cancel'
                type='button'
                onClick={() => {
                  formik.resetForm()
                }}
                className='btn btn-color-gray-400 btn-active-light-primary px-6'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ManageRoom
