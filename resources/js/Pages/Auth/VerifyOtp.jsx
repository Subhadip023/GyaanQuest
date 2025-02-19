import { useEffect, useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";

export default function VerifyOtp({ email }) {
    const { data, setData, post, processing, errors } = useForm({
        email,
        otp: "",
    });
    const [message, setMessage] = useState(null);

    // Send OTP automatically when the component loads
    useEffect(() => {
        post(route("send-otp"), {
            onSuccess: () => setMessage("OTP sent to your email."),
            onError: () => setMessage("Failed to send OTP. Try again."),
        });
    }, []);

    const submit = (e) => {
        e.preventDefault();
        setMessage(null);

        post(route("verify-otp"), {
            onSuccess: () => setMessage("OTP verified successfully!"),
            onError: (err) => setMessage(err.otp || "Invalid OTP"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div>
                <h2>Verify OTP</h2>
                {message && <p>{message}</p>}
                <form onSubmit={submit}>
                    <input
                        type="text"
                        name="otp"
                        value={data.otp}
                        onChange={(e) => setData("otp", e.target.value)}
                        required
                    />
                    {errors && errors.otp}
                    <PrimaryButton  disabled={processing}> Verify OTP</PrimaryButton>
                    
                </form>
            </div>
        </GuestLayout>
    );
}
