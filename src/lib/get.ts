import axios from 'axios'
import {API_URL} from '__CONSTANTS__/index'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const get = async (path: string, authToken = '') => {
  try {
    const RESPONSE = await axios.get(API_URL + path, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    })

    return RESPONSE.data.data
  } catch (error: any) {
    if (error.response.status === 401) {
      MySwal.fire({
        text: 'Unauthorised',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {})
    }
  }
}

export default get
