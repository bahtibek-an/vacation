import {toast} from 'react-hot-toast'



const toastError = (message: string, toastId?: string) => {
  return toast.error(message, {
    duration: 1500,
    position: "top-center",
    id: toastId
  });
};

const toastSuccess = (message: string, toastId?: string) => {
  return toast.success(message, {
    duration: 1500,
    position: "top-center",
    id: toastId
  });
};

const toastLoading = (message: string) => {
  return toast.loading(message);
}

const toastDismiss = (toastId: string) => {
  return toast.dismiss(toastId);
}

  
export { toastError, toastSuccess, toastLoading, toastDismiss };