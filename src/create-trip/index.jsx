import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectedBudgetOptions, SelectedTravelesList } from '@/constants/options.jsx';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import toast from 'react-hot-toast';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { db } from '@/service/firebaseConfig';
import { useNavigate} from 'react-router-dom';




function CreateTrip() {
  const [place, setPlace] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();
  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData)

  }, [formData])


  const login = useGoogleLogin({
    onSuccess: async (codeResp) => {
      console.log(codeResp)
      await GetUserProfile(codeResp)
    },
    onError: (error) => console.log(error)
  })

  const OnGenerateTrip = async () => {
    setLoading(true);
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true)
      return;
    }





    if (formData.noOfDays > 10 && !formData?.location || !formData?.budget || !formData?.traveler) {
      toast.error('Please enter Credentials correctly !')
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    //  console.log("final prompting:",FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("final result after prompting we get:",result);
    const clean=result?.response?.candidates[0]?.content.parts[0].text;
    const jsondata=JSON.parse(clean);  //finally here we get the clean json data after parsing it and clearing it out from many levels
    console.log("json text:",jsondata);
    console.log(formData);
    setLoading(false);
    SaveAiTrip(jsondata);
  }

  const SaveAiTrip = async (TripData) => {
    
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user data:",user);
    console.log("form data:",formData);
    console.log("tripdata:",TripData);
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: TripData,
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);

    navigate('/view-trip/'+docId);


  }

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
      OnGenerateTrip();
    })
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 '>
      <h2 className='font-bold text-3xl' >Tell us your Travel preferences 🏖️</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic basic information, and our trip planner will generate a customized library based on your preferences</p>

      <div className='mt-6'>
        <div>
          <h2 className='text-xl mb-3 font-md font-semibold'>What is your destination of choice ?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip ?</h2>
          <Input placeholder={'example:3'} type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3  font-medium'>What is Your Budget ?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5 ' >
          {
            SelectedBudgetOptions?.map((item, index) => {
              return (
                <div className={`p-4 border rounded-lg hover:shadow-lg hover:cursor-pointer text-center ${formData?.budget == item.title && 'shadow-lg border-black'} `} key={index}
                  onClick={() => handleInputChange('budget', item.title)}

                >
                  <h2 className='text-4xl  '>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              )
            })
          }
        </div>
      </div>


      <div>
        <h2 className='text-xl my-3  font-medium'>Who do you plan on travelling with on your next adventure ?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5 ' >
          {
            SelectedTravelesList?.map((item, index) => {
              return (
                <div className={` p-4 border rounded-lg hover:shadow-lg hover:cursor-pointer text-center  
                  ${formData?.traveler == item.people && 'shadow-lg border-black'} 
                  `} key={index} onClick={() => handleInputChange('traveler', item.people)}  >
                  <h2 className='text-4xl  '>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='my-10 flex justify-end'>
        <Button disabled={loading} onClick={OnGenerateTrip}>

          {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : `Generate Trip`}

        </Button>
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

export default CreateTrip