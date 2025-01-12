import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import React from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';

function PlaceCardItem({ place }) {
  const navigate = useNavigate();

  // Function to handle external link navigation
  const handleExternalNavigation = () => {
    const url = 'https://www.google.com/maps/search/?api=1&query=' + place?.placeName;
    window.open(url, '_blank');
  };

  return (
    <div
      className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-lg"
      onClick={handleExternalNavigation}
    >
      {/* <img className="w-[130px] h-[130px] rounded-xl" src="/trip.jpg" alt={place?.placeName || 'Place Image'} /> */}

      <div>
        <h2 className="font-bold text-lg">{place?.placeName}</h2>
        <p className="text-sm text-gray-400">{place?.placeDetails}</p>
        <h2 className="mt-2">🕒 Time to travel: {place?.timeTravel}</h2>
        {/* Uncomment this to add a button */}
        {/* <Button size="small"><FaMapLocationDot /></Button> */}
        <h2 className='font-medium text-sm text-blue-600 mt-2' >Visit of : {place.time}</h2>
      </div>
    </div>
  );
}

export default PlaceCardItem;
