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

  return (
    <main className="flex flex-col gap-2 min-h-screen items-center justify-center">
      <ToastContainer />
      <div className="container">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center">
            <div className="container">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl py-10">
                Scan here to continue
              </h1>
              <Card className="w-full" style={{ backgroundColor: "#fbfbfb" }}>
                <CardHeader>
                  <CardTitle>Start Now!</CardTitle>
                  <CardDescription>Please scan before !!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-5">
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

          <div className="py-10 text-center">
            <h3 className="scroll-m-20 text-xl font-extrabold tracking-tight py-5">
              Or
            </h3>
            <Link href="/capture">
              <Button>Capture Now !!</Button>
            </Link>
          </div>
        </div>
      </div>
      <footer className="flex items-end w-full bg-slate-700 py-2 text-white">
        <div className="container mx-auto flex justify-center items-center py-4">
          <p className="text-sm text-center">
            © {new Date().getFullYear()} All rights reserved by <a href="https://github.com/Mochrks" className="hover:underline">@mochrks</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
