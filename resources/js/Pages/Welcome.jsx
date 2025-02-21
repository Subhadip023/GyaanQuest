import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Welcome({ auth, laravelVersion, phpVersion, bgImageUrl, girlImageUrl }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = bgImageUrl;
        img.onload = () => setIsLoaded(true);
    }, [bgImageUrl]);

    return (
        <>
            <Head title="Welcome" />

            {/* Show a loading screen until the background is fully loaded */}
            {!isLoaded ? (
                <div className="w-screen h-screen flex items-center justify-center bg-gray-200">
                    <p className="text-2xl font-bold text-gray-700">Loading...</p>
                </div>
            ) : (
                <section className="relative w-screen h-screen flex flex-col md:flex-row items-center justify-center gap-x-10 overflow-hidden">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 transition-opacity duration-500"
                        style={{
                            backgroundImage: `url(${bgImageUrl})`,
                        }}
                    ></div>

                    {/* Sidebar - Slide in from Left */}
                    <motion.aside
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut",delay:0.5 }}
                        className="bg-cover bg-center bg-no-repeat md:h-2/3 h-1/3 md:w-1/3 w-4/5 z-10 rounded-2xl"
                        style={{
                            backgroundImage: `url(${girlImageUrl})`,
                        }}
                    ></motion.aside>

                    {/* Main Content - Slide in from Right */}
                    <motion.main
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                        className="md:h-2/3 h-1/3 md:w-1/3 w-4/5 z-10 rounded-2xl flex flex-col items-center mt-20"
                    >
                        <div className="border-4 border-blue-800 mt-10 w-fit h-fit flex font-bold text-6xl items-center">
                            <div className="bg-blue-800 px-5 py-2 text-white h-full flex items-center">
                                Gyaan
                            </div>
                            <div className="text-blue-800 px-5 py-2">Quest</div>
                        </div>
                        <div className="bg-white/20 mt-20 text-4xl text-blue-800 p-5 text-center rounded-lg font-playpen">
                            Test your knowledge, track progress, and enhance skills
                            with engaging quizzes and real-time scoring!
                        </div>
                    </motion.main>
                </section>
            )}
        </>
    );
}
