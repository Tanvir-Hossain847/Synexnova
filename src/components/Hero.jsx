import React from 'react'
import Globe from './Globe'

export default function Hero() {
  return (
    <div className='relative overflow-hidden min-h-screen'>
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-size-[80px_80px] opacity-50 pointer-events-none" />

      {/* Mobile layout — stacked */}
      <div className="flex flex-col md:hidden px-6 pt-28 pb-10 items-center text-center">
        <h1 className='text-4xl font-bold anta mb-4'>
          One Platform.<br />
          <span className='text-accent anta'>Every Business Solution.</span>
        </h1>
        <p className='text-sm text-accent anta max-w-sm mb-6'>
          SynexNova is a USA-based technology company delivering POS, inventory,
          e-commerce, HRM, CRM, mobile apps, and AI-powered solutions — built to
          launch fast and scale globally.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs mb-8">
          <button className="px-8 border-2 border-secondary py-3 rounded-full bg-primary text-secondary transition-all duration-300 hover:scale-105 hover:shadow-xl w-full">
            Explore Solutions
          </button>
          <button className="group border-2 border-secondary relative px-8 py-3 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 w-full">
            <span className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-primary">
              Book a Demo →
            </span>
          </button>
        </div>
        {/* Smaller centered globe on mobile */}
        <div className="w-72 h-72 flex items-center justify-center">
          <Globe />
        </div>
      </div>

      {/* Desktop layout — absolute positioned */}
      <div className="hidden md:block">
        <div className="absolute mt-40 ml-35">
          <h1 className='text-6xl font-bold max-w-4xl anta'>
            One Platform.<br />
            <span className='text-accent anta'>Every Business Solution.</span>
          </h1>
          <p className='mt-6 max-w-2xl text-md text-accent anta'>
            SynexNova is a USA-based technology company delivering POS, inventory,
            e-commerce, HRM, CRM, mobile apps, and AI-powered solutions — built to
            launch fast and scale globally.
          </p>
          <div className="my-5 space-x-5">
            <button className="px-8 border-2 border-secondary py-3 rounded-full bg-primary text-secondary transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Explore Solutions
            </button>
            <button className="group border-2 border-secondary relative px-8 py-3 rounded-full border border-primary overflow-hidden transition-all duration-300 hover:scale-105">
              <span className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-primary">
                Book a Demo →
              </span>
            </button>
          </div>
        </div>
        <Globe />
      </div>
    </div>
  )
}
