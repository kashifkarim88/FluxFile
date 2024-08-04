"use client"
import React, { useEffect, useState } from 'react';
import UploadForm from './_components/UploadForm';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../../../../../firebaseConfig';
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';
import { generateRandomString } from '../../../_utils/RandomString';
import { useRouter } from 'next/navigation';

export default function Upload() {
    const { user } = useUser();
    const [progress, setProgress] = useState();
    const storage = getStorage(app);
    const db = getFirestore(app);
    const [uploadCompleted, setUploadCompleted] = useState(false);
    const [fileDocId, setFileDocId] = useState('');
    const navigate = useRouter();

    const uploadFile = (file) => {
        const metadata = {
            contentType: file.type
        };

        const storageRef = ref(storage, file.type === 'image/webp' ? `images/${file.name}` : `file/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgress(progress);
            },
            (error) => {
                console.error('Upload error: ', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    saveInfo(file, downloadURL);
                });
            }
        );
    };

    const saveInfo = async (file, fileUrl) => {
        const docId = generateRandomString().toString();
        setFileDocId(docId);
        try {
            await setDoc(doc(db, "uploadedFiles", docId), {
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                fileUrl: fileUrl,
                userEmail: user.primaryEmailAddress.emailAddress,
                userName: user.fullName,
                password: '',
                id: docId,
                shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId
            });
            console.log("File information successfully saved");
            setUploadCompleted(true);
        } catch (error) {
            console.error("Error saving file information: ", error);
        }
    };

    useEffect(() => {
        if (uploadCompleted && fileDocId) {
            navigate.push(`/file-preview/${fileDocId}`);
        }
    }, [uploadCompleted, fileDocId, navigate]);

    return (
        <main className='w-[100%] h-[90dvh] border-t-2 flex items-center justify-center relative'>
            <div className='w-[70%] flex flex-col gap-4'>
                <h2 className='text-2xl text-center'>
                    Start <span className='font-semibold text-primary'>Uploading</span> File and <span className='font-semibold text-primary'>Share</span> it
                </h2>
                <UploadForm uploadBtnClick={(file) => uploadFile(file)} progress={progress} />
            </div>
            <div className='absolute top-0 right-7'>
                {progress === 100 && (
                    <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4 mt-4">
                        <div className="flex items-start gap-4">
                            <span className="text-green-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </span>
                            <div className="flex-1">
                                <strong className="block font-medium text-gray-900">File Uploaded</strong>
                                <p className="mt-1 text-sm text-gray-700">Your file has been saved.</p>
                            </div>
                            <button className="text-gray-500 transition hover:text-gray-600">
                                <span className="sr-only">Dismiss popup</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
