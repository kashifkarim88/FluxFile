'use client'
import React from 'react'
import { AlertCircle, File, FileImage, ListX } from 'lucide-react'

export default function FilePreview({ file, sizeMsg, setFile }) {
    return <>
        <main>
            <div className='flex gap-40 py-8 border mt-5 px-3 border-blue-300 rounded-xl justify-between'>
                <div>
                    <div className='flex gap-5 justify-center'>
                        {
                            file.type === "image/webp" ?
                                <FileImage className='text-primary' />
                                :
                                <File className='text-primary' />
                        }
                        <p className='font-semibold text-sm'>filename : {file.name}</p>
                        <p className='text-gray-500 text-sm'>size : {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    {
                        sizeMsg ?
                            <p className='text-red-600 text-left flex gap-3 mt-3'><AlertCircle /> {sizeMsg}</p> : ""
                    }
                </div>
                <div>
                    <ListX className='hover:text-red-600 duration-200' onClick={() => setFile('')} />
                </div>
            </div>
        </main>
    </>
}
