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
  categoryName: '',
  categoryDescription: '',
  categoryCategory: '',
  categoryProfileFile: [],
  categoryProfile: '',
}

const createCategorySchema = Yup.object().shape({
  categoryName: Yup.string().required('Name is required'),
  categoryDescription: Yup.string().required('Description is required'),
  categoryProfile: Yup.mixed().required('Category profile is required'),
  categoryProfileFile: Yup.mixed(),
})

const CreateCategory = () => {
  const userToken = useSelector(selectUserToken)
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: createCategorySchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(false)
      setLoading(false)

      const formData = new FormData()

      // formData.append('name', values.productName)
      // formData.append('description', values.productDescription)
      // formData.append('category', values.productCategory)

      formData.append('categoryBanner', values.categoryProfileFile[0])

      const data = {
        name: values.categoryName,
        description: values.categoryDescription,
      }

      const category = await post('categories', data, userToken, false)

      const categoryID = category.data._id
      formData.append('categoryID', categoryID)
      post(`categories/image/${categoryID}`, formData, userToken)

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
  //     return (formik.values.ca = files)
  //   }
  // }
  const handleProfileUpload = (e: any) => {
    console.log(e)
    const file = e.target?.files[0]
    console.log(file)
    if (file) {
      return (formik.values.categoryProfile = file)
    }
  }

  return (
    <>
      <div className='card'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Create new category</h3>
          </div>
        </div>
        <div className='card-body '>
          <form onSubmit={formik.handleSubmit} id='kt_signin_change_email' className='form'>
            <div className='row mb-6'>
              <div className='col-lg-6 mb-4 mb-lg-0'>
                <div className='fv-row mb-0'>
                  <label htmlFor='categoryName' className='form-label fs-6 fw-bolder mb-3'>
                    Enter category Name
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    id='categoryName'
                    placeholder='Category Name'
                    {...formik.getFieldProps('categoryName')}
                  />
                  {formik.touched.categoryName && formik.errors.categoryName && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.categoryName}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='fv-row mb-0'>
                  <label htmlFor='categoryDescription' className='form-label fs-6 fw-bolder mb-3'>
                    Enter category Description
                  </label>
                  <input
                    type='text'
                    placeholder='Category Description'
                    className='form-control form-control-lg form-control-solid'
                    id='categoryDescription'
                    {...formik.getFieldProps('categoryDescription')}
                  />
                  {formik.touched.categoryDescription && formik.errors.categoryDescription && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.categoryDescription}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <div className='col-lg-6'>
                <div className='fv-row mb-0'>
                  <label htmlFor='categoryProfile' className='form-label fs-6 fw-bolder mb-3'>
                    Upload category Profile
                  </label>

                  <div className='fv-row'>
                    <input
                      type='file'
                      {...formik.getFieldProps('categoryProfile')}
                      value={formik.values.categoryProfile}
                      onChange={(event: any) => {
                        if (event.target.files) {
                          formik.setFieldValue('categoryProfile', event.target.value)
                          formik.setFieldValue('categoryProfileFile', event.target.files)
                        } else {
                          formik.setFieldValue('categoryProfile', '')
                          formik.setFieldValue('categoryProfileFile', '')
                        }
                      }}
                      name='categoryProfile'
                      id='categoryProfile'
                    ></input>
                    {formik.touched.categoryProfile && formik.errors.categoryProfile && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.categoryProfile}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-lg-6'></div>
            </div>
            <div className='d-flex'>
              <button id='kt_signin_submit' type='submit' className='btn btn-primary  me-2 px-6'>
                {!loading && 'Create Product'}
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

export default CreateCategory
