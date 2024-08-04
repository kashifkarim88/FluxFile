'use client'
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../../../../../firebaseConfig";
import { useRouter } from "next/navigation";
import Image from "next/image";



export default function AllFiles() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore(app);
    const navigate = useRouter('')

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "uploadedFiles"));
                const filesData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFiles(filesData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching files: ", error);
            }
        };

        fetchFiles();
    }, []);

    if (loading) {
        return <div className='w-full h-[80dvh] border-t-2 flex justify-center items-center gap-2'>
            <Image src={'/loading.gif'} width={40} height={40} alt="." />
            <p className="text-xl">Loading...</p>
        </div>
    }

    console.log('files-data', files)
    return <>
        <main className='w-full h-[80dvh] border-t-2'>
            <div className='px-[5dvw] py-[8dvh]'>
                <p className='font-semibold text-xl'>My Files</p>
                <p className='border rounded p-2 mt-4'>Total Files : {files?.length}</p>

                <div className="overflow-x-auto mt-8">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="text-left">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Type</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Size</th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {
                                files?.map((file) => (
                                    <tr>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{file.fileType}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{(file.fileSize / 1025 / 1025).toFixed(2)} MB</td>
                                        <td className="whitespace-nowrap px-4 py-2">
                                            <button
                                                onClick={() => navigate.push(`/file-preview/${file.id}`)}
                                                className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </>
}
