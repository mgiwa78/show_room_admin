import {useIntl} from 'react-intl'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'

export function MenuInner() {
  return (
    <>
      <MenuItem title='Dashboard' to='/dashboard' />
    </>
  )
}
