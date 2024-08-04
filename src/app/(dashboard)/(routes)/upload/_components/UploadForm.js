'use client'
import React, { useState } from 'react'
import FilePreview from './FilePreview'
import ProgressBar from './ProgressBar'

export default function UploadForm({ uploadBtnClick, progress }) {
    const [file, setFile] = useState('')
    const [sizeMsg, setSizeMsg] = useState(null)

    const onFileSelect = (file) => {
        console.log("file", file)
        if (file && file.size > 2000000) {
            setFile(file)
            setSizeMsg('Selected file size is greater than 2MB');
        } else {
            setSizeMsg(null)
            setFile(file);
        }
    }

    return <>
        <main className='text-center'>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-blue-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-2xl text-gray-500 dark:text-gray-400"><span className="font-semibold">
                            Click to upload</span> or <strong className='text-primary'>drag</strong> and <strong className='text-primary'>drop</strong></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX Size : 2MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={(event) => onFileSelect(event.target.files[0])} />
                </label>
            </div>
            {
                file ? (
                    <FilePreview file={file} sizeMsg={sizeMsg} setFile={setFile} />
                ) : ""
            }
            {
                progress > 0 ?
                    <ProgressBar progress={progress} /> :
                    <button
                        disabled={!file || sizeMsg !== null}
                        className='bg-primary px-10 text-white py-2 rounded-lg mt-5 disabled:bg-gray-400 border-none outline-none'
                        onClick={() => uploadBtnClick(file)}
                    >Upload File</button>
            }

        </main>
    </>
}
