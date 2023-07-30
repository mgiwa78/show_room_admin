/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

const Languages: FC = () => {
  return (
    <div
      className='menu-item px-5'
      data-kt-menu-trigger='hover'
      data-kt-menu-placement='left-start'
      data-kt-menu-flip='bottom'
    >
      <a href='#' className='menu-link px-5'>
        <span className='menu-title position-relative'>Language</span>
      </a>

      <div className='menu-sub menu-sub-dropdown w-175px py-4'></div>
    </div>
  )
}

export {Languages}
