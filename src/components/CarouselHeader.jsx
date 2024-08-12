import React from 'react'
export default function CarouselHeader({ title, image }) {
    return (
        <>
            <div className="flex flex-col my-4 justify-center w-full items-center bg-cover bg-center h-screen" style={{backgroundImage: `url("${image}")`}}>
                <span className='text-white font-extralight'>Make your Life Better and Bright</span>
                <h2 className='font-bold text-4xl text-center py-4 text-white'>{title}</h2>
                <button className='rounded-lg hover:bg-transparent bg-orange-500 py-2 px-4 font-bold text-white'>
                    Our Destinations
                </button>
            </div>
        </>
    )
}
