"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCodeIcon } from 'lucide-react';
import { Html5QrcodeScanner, Html5QrcodeResult } from "html5-qrcode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import PromoCarousel from '@/components/demo/PromoCarousel';
import FeatureSection from '@/components/demo/FeatureSection';
import CTASection from '@/components/demo/CTASection';


export default function Home() {
    const [result, setResult] = useState("No result");
    const [showScanner, setShowScanner] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const router = useRouter();

    const onScanSuccess = useCallback(
        (decodedText: string, result: Html5QrcodeResult) => {
            if (decodedText === "padepokan79") {
                setShowLoading(true);
                setTimeout(() => {
                    setShowLoading(false);
                    router.push("/capture");
                }, 3000);
            } else {
                setShowLoading(true);
                setTimeout(() => {
                    setShowLoading(false);
                    toast.error("Access denied", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark",
                    });
                }, 3000);
            }
            setResult(decodedText);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router, toast]
    );

    const onScanError = (errorMessage: string) => {
        console.error(errorMessage);
    };

    useEffect(() => {
        if (showScanner) {
            const scanner = new Html5QrcodeScanner(
                "qr-reader",
                { fps: 20, qrbox: 250 },
                false
            );

            scanner.render(onScanSuccess, onScanError);

            return () => {
                scanner.clear().catch((error) => {
                    console.error("Failed to clear scanner. ", error);
                });
            };
        }
    }, [showScanner, onScanSuccess]);

    const LoadingComponent = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
            <div className="flex flex-col items-center justify-center space-y-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                    <QrCodeIcon className="w-16 h-16 text-white" />
                </motion.div>
                <p className="text-white text-lg font-semibold">
                    {result === "padepokan79" ? "Accessing Capture Page..." : "Checking Access..."}
                </p>
            </div>
        </motion.div>
    );

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col min-h-screen"
        >
            <ToastContainer />
            <AnimatePresence>
                {showLoading && <LoadingComponent />}
            </AnimatePresence>

            <PromoCarousel />

            <motion.section
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="container mx-auto px-4 py-16 text-center mt-20"
            >
                <h1 className="text-5xl font-extrabold tracking-tight mb-6">
                    Unlock To Continue
                </h1>
                <p className="text-xl mb-8">Scan the QR code to begin your journey</p>
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Start Now!</CardTitle>
                        <CardDescription>Scan to access exclusive content</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {showScanner ? (
                            <div id="qr-reader" className="w-full max-w-[300px] mx-auto"></div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center p-8 cursor-pointer"
                                onClick={() => setShowScanner(true)}
                            >
                                <QrCodeIcon className="w-24 h-24 text-primary" />
                            </motion.div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button onClick={() => setShowScanner(!showScanner)}>
                            {showScanner ? "Hide Scanner" : "Show Scanner"}
                        </Button>
                    </CardFooter>
                </Card>
            </motion.section>

            <FeatureSection />
            <CTASection />
        </motion.main>
    );
}

