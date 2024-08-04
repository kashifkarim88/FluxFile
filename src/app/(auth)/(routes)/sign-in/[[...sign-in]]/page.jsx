import { SignIn } from '@clerk/nextjs'
import Constants from '../../../../_utils/Constants'

export default function SignInPage() {
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-center bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-5">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        width={500} height={300}
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />
                    <div className="hidden lg:relative lg:block lg:p-12">
                        <h2 className="flex gap-3 mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            <img src={'/logo.svg'} width={30} height={30} alt="Logo" />
                            Welcome to FluxFile
                        </h2>
                        <p className="mt-4 leading-relaxed text-white/90">
                            {Constants.desc}
                        </p>
                    </div>
                </section>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <SignIn forceRedirectUrl='/files' />
                    </div>
                </main>
            </div>
        </section>
    )
}
