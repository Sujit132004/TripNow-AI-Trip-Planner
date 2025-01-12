import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (

    <div  className=' flex flex-col items-center mx-60 gap-10 font-bold '>
      <h1 className='  text-center ' ><span className='text-[#f56551]' >Discover Your Next Adventure with AI :</span> Personalized Itineraries at Your Fingertips </h1>
      <p className=' text-gray-500 text-center'>Your personal trip planner and travel curator,creating custom itineraries tailored to your interest and budget</p>
      <Link to={"/create-trip"} >
      <Button >Get Started , It's Free </Button>
      </Link>
      

    
    </div>
  )
}

export default Hero