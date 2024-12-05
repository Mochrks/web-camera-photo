"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCodeIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeResult } from "html5-qrcode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import PromoCarousel from '@/components/demo/PromoCarousel';

export default function Home() {
  const [result, setResult] = useState("No result");
  const qrCodeScannerRef = useRef(null);
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();

  const onScanSuccess = (decodedText: string, result: Html5QrcodeResult) => {
    if (decodedText === "padepokan79") {
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        router.push("/capture");
      }, 5000);
    } else {
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        toast.error("Not access", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }, 5000);
    }
    setResult(decodedText);
  };

  const onScanError = (errorMessage: string) => {
    console.error(errorMessage);
  };

  useEffect(() => {
    if (qrCodeScannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 20, qrbox: 200 },
        false
      );

      scanner.render(onScanSuccess, onScanError);

      return () => {
        scanner.clear().catch((error) => {
          console.error("Failed to clear scanner. ", error);
        });
      };
    }
  }, []);

  const LoadingComponent = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 2v4" />
              <path d="m16.2 7.8 2.9-2.9" />
              <path d="M18 12h4" />
              <path d="m16.2 16.2 2.9 2.9" />
              <path d="M12 18v4" />
              <path d="m4.9 19.1 2.9-2.9" />
              <path d="M2 12h4" />
              <path d="m4.9 4.9 2.9 2.9" />
            </svg>
          </div>
          <p className="text-white text-lg font-semibold">
            {result === "padepokan79"
              ? "Accessing Capture Page..."
              : "Checking Access..."}
          </p>
        </div>
      </div>
    );
  };



  return (
    <main className="flex flex-col gap-2  items-center justify-center">
      <ToastContainer />

      {showLoading && <LoadingComponent />}

      <div className="container min-h-screen">
        <PromoCarousel />
        <div className="flex flex-col items-center justify-center p-20">
          <div className="text-center">
            <div className="container">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl py-10">
                Scan here to continue
              </h1>
              <Card className="w-full  border-black">
                <CardHeader>
                  <CardTitle>Start Now!</CardTitle>
                  <CardDescription>Please scan before !!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-5">
                    <QrCodeIcon className="w-14 h-14 text-black" />
                  </div>
                  <div className="flex items-center justify-center">
                    <div
                      id="qr-reader"
                      ref={qrCodeScannerRef}
                      style={{ width: "300px" }}
                    ></div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button>{result}</Button>
                </CardFooter>

              </Card>
            </div>
          </div>



          {/* <div className="py-10 text-center">
            <h3 className="scroll-m-20 text-xl font-extrabold tracking-tight py-5">
              Or
            </h3>
            <Link href="/capture">
              <Button>Capture Now !!</Button>
            </Link>
          </div> */}
        </div>
      </div>
      <footer className="container w-full  flex items-end py-2 text-gray-800 border-t border-black">
        <div className="container mx-auto flex justify-center items-center py-4">
          <p className="text-sm text-center">
            © {new Date().getFullYear()} All rights reserved by <a href="https://github.com/Mochrks" className="hover:underline">@mochrks</a>
          </p>
        </div>
      </footer>
    </main>
  );
}

