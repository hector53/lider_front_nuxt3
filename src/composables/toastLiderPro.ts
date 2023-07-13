
export const dataToast = reactive({
  toast: {
    show: false, 
    position: "bottom", 
    message: "",
    duration: 3000
  }
})

export function disableToast(){
  dataToast.toast.show = false
}

export function showToast(message: string, position:string, duration: number ){
  dataToast.toast.show = true 
  dataToast.toast.message = message
  dataToast.toast.position = position 
  dataToast.toast.duration = duration 
}