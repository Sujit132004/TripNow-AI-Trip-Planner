import React from 'react'
import { Link } from 'react-router-dom'

function UserTripCardItem({trip}) {
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div>
        <div className='border border-gray-300 p-3 bg-gray-200 rounded-xl hover:scale-105 hover:shadow-lg cursor-pointer transition-all'>
            <h2>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500' >{trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget} Budget </h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem