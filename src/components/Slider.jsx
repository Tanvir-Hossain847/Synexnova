import React from 'react'
import Marquee from 'react-fast-marquee'

export default function Slider() {
  return (
    <div className='pt-20 bg-gray-50'>
        <div className="text-center text-5xl bg-gray-50 mb-10">
            <h1 className='odibee '>OUR SERVICES</h1>
        </div>
         <Marquee gradient={true} gradientColor="#f9fafb" gradientWidth={80}>
        <div className="text-3xl odibee px-10 opacity-40 hover:text-white  transition-all duration-300 cursor-pointer bg-accent text-white py-8">POINT OF SALES</div>
        <div className="text-3xl odibee px-10 opacity-40 hover:text-white  transition-all duration-300 cursor-pointer bg-accent text-white py-8">INVENTORY MANAGMENT</div>
        <div className="text-3xl odibee px-10 opacity-40 hover:text-white  transition-all duration-300 cursor-pointer bg-accent text-white py-8">E-COMMERCE</div>
        <div className="text-3xl odibee px-10 opacity-40 hover:text-white  transition-all duration-300 cursor-pointer bg-accent text-white py-8">HRM</div>
        <div className="text-3xl odibee px-10 opacity-40 hover:text-white  transition-all duration-300 cursor-pointer bg-accent text-white py-8">CRM</div>
        <div className="text-3xl odibee px-10 opacity-40 hover:text-white  transition-all duration-300 cursor-pointer bg-accent text-white py-8">MOBILE APP</div>
        <div className="text-3xl odibee px-10 opacity-40 hover:text-white  transition-all duration-300 cursor-pointer bg-accent text-white py-8">IUT SOLUTIONS</div>
        <div className="text-3xl odibee px-10 opacity-40 hover:text-white  transition-all duration-300 cursor-pointer bg-accent text-white py-8">AI AGENTS</div>
    </Marquee>
    </div>
  )
}
