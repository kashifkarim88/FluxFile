"use client"
import React, { useEffect } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { AlignJustify } from 'lucide-react'

export default function TopHeader() {
    const { isLoaded, user } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && !user) {
            router.push('/sign-in')
        }
    }, [isLoaded, user, router])

    if (!isLoaded || !user) {
        return null // Or a loading spinner
    }
    return <>
        <main>
            <div className='flex justify-between p-5 md:justify-end'>
                <AlignJustify className='md:hidden' />
                <UserButton />
            </div>
        </main>
    </>
}
