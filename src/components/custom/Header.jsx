import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
   const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(user);
  })

  const login = useGoogleLogin({
    onSuccess: async (codeResp) => {
      console.log(codeResp)
      await GetUserProfile(codeResp)
    },
    onError: (error) => console.log(error)
  })


  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    })
  }




  return (
    <div className=' shadow-sm flex justify-between  items-center px-5 '>
      <img className='block ' width={140} src='/logolast.png' />
      <div>
        {user ?
          <div className='flex items-center gap-3' >
            <a href='/create-trip'>
            <Button  variant='outline' className='text-black bg-gray-200' >+ Create Trip</Button>
            </a>

            <a href='/my-trips'>
            <Button  variant='outline' className='text-black bg-gray-200' >My Trips</Button>
            </a>

            <Popover>
              <PopoverTrigger><img className='h-[35px] w-[35px] rounded-full' src={user?.picture} /></PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }} >Logout</h2>
              </PopoverContent>
            </Popover>
            
          </div> : <Button onClick={()=>setOpenDialog(true)} className="mb-6 mr-4" >SignIn</Button>}
      </div>

      <Dialog open={openDialog} >
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img width={120} src='/logolast.png' />
              <h2 className='font-bold text-lg mt-2 mb-2'>Sign in with Google</h2>
              <p className='my-2'>Sign in to the App with Google authentication Securely</p>

              <Button disabled={loading} onClick={login} className="w-full mt-5"> Sign In With Google <FcGoogle /> </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>


  )
}

export default Header