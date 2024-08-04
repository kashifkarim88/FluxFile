'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Header() {
    const navigate = useRouter()
    return <>
        <header className="bg-white">
            <div className="sm:px-6 sm:py-4 lg:px-8">
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                    <div className='flex gap-3 justify-center items-center'>
                        <Image src={'/logo.svg'} width={70} height={70} alt='logo.svg' />
                        <p className='bg-gradient-to-r from-black via-gray-500  to-gray-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>FluxFile</p>

                        <ul className='flex gap-5 ml-10 cursor-pointer font-semibold'>
                            <li className='hover:text-red-700 p-1'>Home</li>
                            <li className='hover:text-orange-400 p-1'>Upload</li>
                            <li className='hover:text-green-500 p-1'>About Us</li>
                            <li className='hover:text-primary p-1'>Contact</li>
                        </ul>
                    </div>

                    <div className="flex items-center gap-4">

                        <button
                            className="inline-block rounded bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 duration-1000"
                            type="button"
                            onClick={() => navigate.push('/files')}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </header>
    </>
}
