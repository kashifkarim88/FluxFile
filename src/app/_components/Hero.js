'use client'
import React, { useEffect } from 'react'
import Constants from '../_utils/Constants'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function Hero() {
    const { isLoaded, user } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && user) {
            router.push('/files')
        }
    }, [isLoaded, user, router])
    return <>
        <section>
            <div className=" px-4 py-32 lg:flex lg:items-center relative">
                <Image className='absolute top-0 left-0 -z-20 opacity-5' src={'/logo.svg'} width={700} height={70} alt='logo.svg' />
                <div className="mx-auto max-w-3xl text-center">
                    <h1
                        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                    >
                        Upload, Save and easily share your files in one place.
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-gray-500">
                        {
                            Constants.desc
                        }
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button
                            className="block w-full rounded border border-primary bg-primary px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-opacity-75 sm:w-auto duration-500"
                            onClick={() => router.push('/files')}
                        >
                            Get Started
                        </button>

                        <a
                            className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-primary hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:bg-blue-500 sm:w-auto duration-500"
                            href="#"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </>
}
