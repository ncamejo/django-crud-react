import { toast } from 'react-hot-toast';


export const taskNotification = (msj='', color='#fff', position='bottom-right')=>{
    toast.success(msj , {
        position,
        style: {
          background: '#101010',
          color
        }
      })
}



