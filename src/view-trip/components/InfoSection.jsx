import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { FaShare } from "react-icons/fa";
import axios from 'axios';

function InfoSection({ trip }) {
  // State to store the image URL
  // const [imageUrl, setImageUrl] = useState('/trip.jpg');  // Default fallback image

  // // Fetch the photo reference on trip change
  // useEffect(() => {
  //   if (trip?.userSelection?.location?.value?.place_id) {
  //     getPlacePhoto();
  //   }
  // }, [trip]);

  // const getPlacePhoto = async () => {
  //   try {
  //     // Fetch place details using the gomaps.pro API
  //     const result = await axios.get(`https://maps.gomaps.pro/maps/api/place/details/json?place_id=${trip?.userSelection?.location?.value?.place_id}&key=${import.meta.env.GO_MAPS_API_KEY}`);
      
  //     // Extract the photo reference from the API response
  //     const photoReference = result?.data?.photos?.[0]?.photo_reference;

  //     if (photoReference) {
  //       // Construct the image URL with gomaps.pro photo endpoint
  //       const fetchedImageUrl = `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoReference}&maxwidth=400&key=${import.meta.env.GO_MAPS_API_KEY}`;
        
  //       // Set the fetched image URL in the state
  //       setImageUrl(fetchedImageUrl);
  //       console.log("Finally getting the image URL:", fetchedImageUrl);
  //     } else {
  //       console.error("No photo reference found.");
  //       // If no photo reference, set a default image
  //       setImageUrl('/trip.jpg');
  //     }
  //   } catch (error) {
  //     console.error("Error fetching place photo:", error);
  //     // In case of error, fallback to default image
  //     setImageUrl('/trip.jpg');
  //   }
  // };

  return (
    <div>
      {/* Use the dynamically fetched image URL */}
      {/* <img className='h-[300px] w-full object-cover rounded-xl' src={imageUrl} alt="Place" /> */}

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md'> 📅 {trip?.userSelection?.noOfDays} Day/s</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md'> 💸 {trip?.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 md:text-md'> ✈️ No. of Travelers : {trip?.userSelection?.traveler}</h2>
          </div>
        </div>

        <Button><FaShare /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
