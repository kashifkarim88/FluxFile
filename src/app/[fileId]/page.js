'use client'
import React, { useEffect, useState } from 'react';
import { app } from '../../../firebaseConfig';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import FileItem from '../[fileId]/_components/FileItem.js'

export default function FileView({ params }) {
    const db = getFirestore(app);
    const [data, setData] = useState({});

    useEffect(() => {
        params.fileId && getFileInfo()
    }, [])

    const getFileInfo = async () => {
        const docRef = doc(db, "uploadedFiles", params?.fileId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("File data:", docSnap.data());
            setData(docSnap.data());
        } else {
            console.log("No such document!");
        }
    };
    return <>
        <main className='w-full h-[100dvh] flex justify-center items-center'>
            <div>
                <FileItem filedata={data} />
            </div>
        </main>
    </>
}
