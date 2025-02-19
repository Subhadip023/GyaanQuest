import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link ,usePage} from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';


export default function GuestLayout({ children }) {
    const successMessage = usePage().props.flash?.success;
        const errorMessage = usePage().props.flash?.error;
        
        useEffect(() => {
            if (successMessage) {
                toast.success(successMessage, {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
    
            if (errorMessage) {
                toast.error(errorMessage, {
                    position: "top-center",
                    autoClose: 2000,
                });
            }
        }, [successMessage, errorMessage]);
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
