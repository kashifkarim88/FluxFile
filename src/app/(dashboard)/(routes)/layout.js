'use client'
import React from 'react'
import SideNav from '../_components/SideNav'
import TopHeader from '../_components/TopHeader'

export default function layout({ children }) {
    return (
        <div className='flex'>
            <div className='h-full md:w-64 flex-col fixed inset-y-0 z-50 md:flex hidden'>
                <SideNav />
            </div>
            <div className='md:ml-64 sm:w-[100%] sm:h-[100%] md:w-[100%] md:h-[100%]'>
                <TopHeader />
                {children}
            </div>
        </div>
    )
}
