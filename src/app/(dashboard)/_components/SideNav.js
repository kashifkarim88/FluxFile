'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { CloudUpload, Files, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SideNav() {
    const navigate = useRouter()
    const listItems = [
        {
            id: 1,
            name: 'Upload',
            icon: CloudUpload
        },
        {
            id: 2,
            name: 'Files',
            icon: Files
        },
        {
            id: 3,
            name: 'Upgrade',
            icon: Shield
        },
    ]

    const [activeIndex, setActiveIndex] = useState(0)

    const handleSideNavOptions = (itemId) => {
        setActiveIndex(itemId)

        switch (itemId) {
            case 1:
                console.log('upload')
                navigate.push('/upload')
                break;
            case 2:
                navigate.push('/allfiles')
                break;
            case 3:
                navigate.push('/upgrade')
                break;

            default:
                break;
        }
    }
    return <>
        <main className='border-r-2 h-[100%]'>
            <div className='flex gap-4 p-4'>
                <Image src={'/logo.svg'} width={60} height={60} alt='log.svg' />
                <p className='bg-gradient-to-r from-black via-gray-500 to-gray-400 bg-clip-text text-3xl font-extrabold text-transparent'>FluxFile</p>
            </div>
            <div className='flex flex-col gap-4 mt-8'>
                {
                    listItems?.map((item) => (
                        <div key={item.id} className='flex w-[100%] px-4'>
                            <button
                                className={`flex gap-3 w-[100%] border-none outline-none p-2 items-center text-[20px] text-gray-500 hover:text-blue-500 duration-150 ${activeIndex === item.id ? 'bg-blue-200 text-blue-500 border-none outline-none rounded-lg' : ''}`}
                                onClick={() => handleSideNavOptions(item.id)}
                            >
                                <item.icon />
                                {item.name}
                            </button>
                        </div>
                    ))
                }
            </div>
        </main>
    </>
}
