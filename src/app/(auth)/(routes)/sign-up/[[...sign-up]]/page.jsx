import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return <>
        <main className="w-full h-[100dvh] flex justify-center items-center">
            <SignUp />;
        </main>
    </>
}