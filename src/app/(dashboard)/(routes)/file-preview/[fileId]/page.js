'use client'
import React, { useEffect, useState } from 'react'
import { getFirestore, updateDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { app } from '../../../../../../firebaseConfig';
import { Copy, SquareArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SendEmail from '../../../../_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';

export default function FilePreview({ params }) {
    const db = getFirestore(app);
    const [data, setData] = useState({});
    const [copyShortUrl, setCopyShortUrl] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setIsEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useRouter();
    const user = useUser()

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    useEffect(() => {
        console.log(params.fileId);
        params.fileId && getFileInfo();
    }, [getFileInfo, params.fileId]);

    const getFileInfo = async () => {
        const docRef = doc(db, "uploadedFiles", params?.fileId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setData(docSnap.data());
        } else {
            console.log("No such document!");
        }
    };


    const onPasswordChange = async () => {
        try {
            const docRef = doc(db, 'uploadedFiles', params?.fileId);
            await updateDoc(docRef, {
                password: password
            });
            setSuccessMessage('Your file is now protected with password!');
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    const sendEmail = () => {
        const emailData = {
            emailToSend: email,
            userName: user?.fullName,
            fileName: data?.fileName,
            fileSize: data?.fileSize,
            fileType: data?.fileType,
            shortUrl: data?.shortUrl
        };
        SendEmail(emailData).then(resp => {
            console.log(resp);
        }).catch(err => {
            console.error(err);
        });
    };

    const onCopyClicked = () => {
        navigator.clipboard.writeText(data.shortUrl)
        setCopyShortUrl(true)
    }
    return (
        <main className='border-t-2 flex flex-col justify-center items-center w-[100%] h-[90dvh]'>
            <div className=' w-[80%] px-12 py-2'>
                <div className='flex gap-3 cursor-pointer' onClick={() => navigate.replace('/upload')}>
                    <SquareArrowLeft />
                    Go to Upload
                </div>
                <div className='flex justify-evenly mt-7'>
                    <div className='flex flex-col justify-center items-center border rounded-lg w-[40%] p-4'>
                        {
                            data?.fileType === 'image/jpeg' ?
                                <Image className='rounded-lg' src={data.fileUrl} width={150} height={20} /> :
                                <Image className='rounded-lg' src='/file-icon.png' width={150} height={80} />
                        }
                        <p className='font-semibold mt-7'>{data.fileName}</p>
                        <p className='text-gray-500 text-sm'>/{data.fileType}/{data.fileSize}</p>
                    </div>
                    <div className='flex flex-col w-[40%] px-4'>
                        <p>ShortUrl</p>
                        <div className='border rounded-lg p-2 flex justify-between'>
                            <p>{data.shortUrl}</p>
                            {
                                copyShortUrl ?
                                    <Copy className='hover:text-blue-600' onClick={onCopyClicked} /> :
                                    <Copy className='text-blue-600' onClick={onCopyClicked} />
                            }
                        </div>
                        <div>
                            <div className='mt-4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                        className='mr-3 w-3 h-3'
                                    />
                                    Enable Password?
                                </label>
                            </div>
                            <div>
                                {
                                    isChecked ?
                                        <div className='flex justify-between mt-2 cursor-pointer'>
                                            <input className='border rounded-lg p-2 w-[75%] outline-none'
                                                type="password" value={password} placeholder='set password'
                                                onChange={(e) => setPassword(e.target.value)} />
                                            <button disabled={password.length < 4} className='disabled:bg-gray-400 bg-primary text-white px-4 border-none rounded-lg' onClick={onPasswordChange}>Save</button>
                                        </div> : ''
                                }
                            </div>
                            {successMessage && (
                                <div className='text-sm cursor-default'>
                                    {successMessage}
                                </div>
                            )}
                        </div>
                        <div className='mt-4 border p-2 rounded'>
                            <p className='text-sm'>Send File to Email</p>
                            <input className='border w-full p-2 mt-1 rounded-lg outline-none' type="email" placeholder='example@gmail.com' value={email} onChange={(e) => setIsEmail(e.target.value)} />
                            <button disabled={!email} className='bg-primary text-white w-full p-2 mt-3 border-none rounded-lg disabled:bg-gray-400' onClick={sendEmail}>Send Email</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
