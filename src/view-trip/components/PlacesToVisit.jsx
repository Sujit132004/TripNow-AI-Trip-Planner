import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
    // const value=Object.entries(trip?.tripData?.itinerary);
    // console.log( "object converted to array:", value);

  return (
    <div>
        <h2 className='font-bold text-lg mt-4' >Places To Visit</h2>
        <div>
            {trip?.tripData?.itinerary.map((item,index)=>{
                    return(
                        <div className='' >
                            <h2 className='font-bold text-lg '>Day {item.day}</h2>
                            
                            <h2 className='font-medium text-sm text-gray-600 my-2  cursor-pointer ' >The Best Time to visit :{item.bestTimeToVisit}</h2>
                            <div className='grid grid-cols-2 gap-5 mt-3'>
                            {item.plan.map((place,index)=>{
                                return(
                                    <div className='my-3'>
                                        
                                            <PlaceCardItem place={place}  />
                                        

                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    )
            })}
          
            
        </div>
    </div>
  )
}

export default PlacesToVisit