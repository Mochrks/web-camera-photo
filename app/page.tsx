"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCodeIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";
export default function Home() {
  const [result, setResult] = useState("No result");
  const qrCodeScannerRef = useRef(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(true);
  const toggleScanner = () => {
    setShowLoading(true);

    setTimeout(() => {
      setShowScanner(!showScanner);
      setShowLoading(false);
    }, 2000);
  };
  const onScanSuccess = (decodedText, decodedResult) => {
    if (decodedText === "1234") {
      toggleScanner();
    } else {
      setResult(decodedText);
    }
  };

  const onScanError = (errorMessage) => {
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
    <main className="flex flex-col gap-5 min-h-screen items-center justify-center p-24">
      <Link href="/generate-qrcode" className='hidden'>
        <Button >
          Generate Qrcode
        </Button>
      </Link>


      <div className="container ">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">

            <div className="container ">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl py-10">
                Scan here to continue
              </h1>
              <Card className="w-full" style={{ backgroundColor: "#fbfbfb" }}>
                <CardHeader>
                  <CardTitle>Start Now!</CardTitle>
                  <CardDescription>
                    Please scan before !!
                  </CardDescription>
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
                    >

                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button>{result}</Button>
                </CardFooter>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
