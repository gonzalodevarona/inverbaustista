import Swal from 'sweetalert2'
import './style.css'
const ToastAlert = (position, timeInMs) => {
return Swal.mixin({
    toast: true,
    position: position,
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: timeInMs,
    timerProgressBar: true
  })
}

  export default ToastAlert ;