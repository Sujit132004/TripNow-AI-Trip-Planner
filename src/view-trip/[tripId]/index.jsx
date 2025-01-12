import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip(){
    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);
    useEffect(()=>{
        // used to get information from firebase
        tripId && GetTripData();
    },[tripId])

    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such document")
            toast.error("No Trip Found!")
        }
    }
    return(
        <div className='p-10 md:px-20 lg:px-44 xl:px-56' >
            {/* INFORMATION SECTION  */}
                <InfoSection trip={trip} />

            {/* RECOMMENDED HOTELS */}
                <Hotels trip={trip} />

            {/* DAILY PLAN */}

                <PlacesToVisit trip={trip} />

            {/* FOOTER  */}
                <Footer trip={trip} />

        </div>
    )
}

export default Viewtrip;
