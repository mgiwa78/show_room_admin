import {PageTitle} from '@layouts/core'
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import '../assets/sass/styles/file.css'
import {StatisticsWidget5} from '../components/partials/widgets/StatisticsWidget5'
import {MixedWidget1} from '../components/partials/widgets/MixedWidget1'
import {useFormik} from 'formik'
import post from '@lib/post'
import {useSelector} from 'react-redux'
import {selectUserAuth, selectUserToken} from '@stores/auth/authSlector'
import get from '@lib/get'
import {Category} from '../types/Category'

const initialValues = {
  productName: '',
  productDescription: '',
  productCategory: '',
  productImages: '',
  productPrice: '',
  productProfileFile: [],
  productImagesFiles: [],
  productProfile: '',
}

const CreateCategorySchema = Yup.object().shape({
  productName: Yup.string().required('Name is required'),
  productDescription: Yup.string().required('Description is required'),
  productPrice: Yup.string().required('Price is required'),
  productCategory: Yup.string().required('Category is required'),
  productProfile: Yup.mixed().required('Product profile is required'),
  productProfileFile: Yup.mixed(),
  productImages: Yup.mixed().required('Product images is required'),
  productImagesFiles: Yup.mixed(),
})

const CreateCategory = () => {
  const userToken = useSelector(selectUserToken)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  const handleFetchCategories = async () => {
    const RESPONSE = await get('categories', userToken)
    if (RESPONSE) {
      setCategories(RESPONSE)
    }
  }

  useEffect(() => {
    handleFetchCategories()
  }, [])
  const formik = useFormik({
    initialValues,
    validationSchema: CreateCategorySchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(false)
      setLoading(false)

      const formData = new FormData()

      // formData.append('name', values.productName)
      // formData.append('description', values.productDescription)
      // formData.append('category', values.productCategory)

      formData.append('profilePicture', values.productProfileFile[0])

      for (let i = 0; i < values.productImagesFiles.length; i++) {
        formData.append('otherPictures', values.productImagesFiles[i])
      }

      const data = {
        name: values.productName,
        description: values.productDescription,
        category: values.productCategory,
        price: values.productPrice,
      }

      const product = await post('products', data, userToken, false)

      const productID = product.data._id
      formData.append('productID', productID)
      post(`products/image/${productID}`, formData, userToken)

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
  //     return (formik.values.productImages = files)
  //   }
  // }
  // const handleProfileUpload = (e: any) => {
  //   const file = e.target?.files[0]
  //   if (file) {
  //     return (formik.values.productProfile = file)
  //   }
  // }

  return (
    <>
      <div className='card'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Create new product</h3>
          </div>
        </div>
        <div className='card-body '>
          <form onSubmit={formik.handleSubmit} id='kt_signin_change_email' className='form'>
            <div className='row mb-6'>
              <div className='col-lg-6 mb-4 mb-lg-0'>
                <div className='fv-row mb-0'>
                  <label htmlFor='productName' className='form-label fs-6 fw-bolder mb-3'>
                    Enter product Name
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    id='productName'
                    placeholder='Product Name'
                    {...formik.getFieldProps('productName')}
                  />
                  {formik.touched.productName && formik.errors.productName && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.productName}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='fv-row mb-0'>
                  <label htmlFor='productDescription' className='form-label fs-6 fw-bolder mb-3'>
                    Enter product Description
                  </label>
                  <input
                    type='text'
                    placeholder='Product Description'
                    className='form-control form-control-lg form-control-solid'
                    id='productDescription'
                    {...formik.getFieldProps('productDescription')}
                  />
                  {formik.touched.productDescription && formik.errors.productDescription && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.productDescription}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <div className='col-lg-6'>
                <div className='fv-row mb-0'>
                  <label htmlFor='productPrice' className='form-label fs-6 fw-bolder mb-3'>
                    Enter Product Price
                  </label>
                  <input
                    type='text'
                    placeholder='Product Description'
                    className='form-control form-control-lg form-control-solid'
                    id='productPrice'
                    {...formik.getFieldProps('productPrice')}
                  />
                  {formik.touched.productPrice && formik.errors.productPrice && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.productPrice}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='fv-row mb-0'>
                  <label className='form-label fs-6 fw-bolder mb-3'>Category</label>

                  <div className='fv-row'>
                    <select
                      className='form-select form-select-solid form-select-lg'
                      {...formik.getFieldProps('productCategory')}
                    >
                      <option value=''>Select a Category..</option>
                      {categories.length
                        ? categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))
                        : ''}
                    </select>
                    {formik.touched.productCategory && formik.errors.productCategory && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.productCategory}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <div className='col-lg-6'>
                <div className='fv-row mb-0'>
                  <label htmlFor='productProfile' className='form-label fs-6 fw-bolder mb-3'>
                    Upload Product Profile
                  </label>

                  <div className='fv-row'>
                    <input
                      type='file'
                      {...formik.getFieldProps('productProfile')}
                      value={formik.values.productProfile}
                      onChange={(event: any) => {
                        if (event.target.files) {
                          formik.setFieldValue('productProfile', event.target.value)
                          formik.setFieldValue('productProfileFile', event.target.files)
                        } else {
                          formik.setFieldValue('productProfile', '')
                          formik.setFieldValue('productProfileFile', '')
                        }
                      }}
                      name='productProfile'
                      id='productProfile'
                    ></input>
                    {formik.touched.productProfile && formik.errors.productProfile && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.productProfile}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='fv-row mb-0'>
                  <label className='form-label fs-6 fw-bolder mb-3'>Upload Images</label>

                  <div className='fv-row'>
                    <input
                      type='file'
                      multiple
                      {...formik.getFieldProps('productImages')}
                      name='productImages'
                      id='productImages'
                      onChange={(event: any) => {
                        if (event.target.files) {
                          formik.setFieldValue('productImages', event.target.value)
                          formik.setFieldValue('productImagesFiles', event.target.files)
                        } else {
                          formik.setFieldValue('productImages', '')
                          formik.setFieldValue('productImagesFiles', '')
                        }
                      }}
                    ></input>
                    {formik.touched.productImages && formik.errors.productImages && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.productImages}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
