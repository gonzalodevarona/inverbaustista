import Swal from 'sweetalert2'
import CONSTANTS from '../../../utils/Constants';

function ConfirmationAlert(data, title, text, titleSuccess, textSuccess, handleSuccess) {

  const handleConfirmed = async() =>{

    handleSuccess(data.id);
    
    await Swal.fire({
      title: titleSuccess,
      text: textSuccess,
      icon: 'success',
      timer: 6000,
      timerProgressBar: true}
    )

    window.location.reload(false);
  }

  return (
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: CONSTANTS.secondaryMain,
      cancelButtonColor: CONSTANTS.primaryMain,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      console.log(result);

      if (result.isConfirmed) {
         handleConfirmed();
      }
    })
  )
}

export default ConfirmationAlert