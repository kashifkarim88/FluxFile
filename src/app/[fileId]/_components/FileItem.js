'use client'
import { Download, Zap } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export default function FileItem({ filedata }) {
    const [password, setPassword] = useState('')
    return (
        <div className='border border-gray-100 px-6 py-3 shadow-lg rounded flex flex-col gap-3 items-center'>
            <h2 ><span className='font-semibold text-blue-500'>{filedata.userName}</span> Shared file with you</h2>
            <p className='text-gray-400'>Find file details below</p>
            <Image src={'/download-file.gif'} width={100} height={100} alt='download.gif' />
            <p className='flex gap-2 py-3'>File Name <Zap className='text-yellow-400' /> {filedata?.fileType} <Zap className='text-yellow-400' /> {(filedata?.fileSize / 1024 / 1024).toFixed(2)} MB</p>
            {
                filedata.password &&
                <input type="password" value={password} placeholder='enter password' className='border px-4 py-2 rounded-lg outline-none' onChange={(e) => setPassword(e.target.value)} />
            }
            <button
                disabled={filedata.password !== password}
                className='disabled:bg-gray-400 flex bg-blue-400 text-white w-[300px] justify-center items-center py-2 rounded-full mt-4'
                onClick={() => window.open(filedata?.fileUrl)}
            ><Download /> Download</button>
            <p className='text-sm text-gray-400'>*Terms and condition apply</p>
        </div>
    )
}
