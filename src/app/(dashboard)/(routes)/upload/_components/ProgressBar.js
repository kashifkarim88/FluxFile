import React from 'react'

export default function ProgressBar({ progress }) {
    return <>
        <main className='mt-3'>
            <div className='bg-gray-400 w-full border-none h-4 rounded-full'>
                <div className='bg-primary border-none rounded-full h-4 text-white text-[10px]' style={{ width: `${progress}%` }}>
                    {`${Number(progress).toFixed(0)}%`}
                </div>
            </div>
        </main>
    </>
}
