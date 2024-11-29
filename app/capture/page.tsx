"use client"

import { useRef, useState } from 'react'
import LayoutSelector from '../../components/camera/layout-selector'
import Camera from '../../components/camera/camera'
import { Layout1, Layout2, Layout3 } from '../../components/camera/photo-layouts'
import { Button } from '@/components/ui/button'
import type { ConfettiRef } from "../../components/ui/confetti";
import Confetti from "../../components/ui/confetti"

export default function PhotoBooth() {
    const [selectedLayout, setSelectedLayout] = useState<number | null>(null)
    const [showCamera, setShowCamera] = useState(false)
    const [capturedImages, setCapturedImages] = useState<string[]>([])
    const [finalImage, setFinalImage] = useState<string | null>(null)
    const confettiRef = useRef<ConfettiRef>(null);

    const handleLayoutSelect = (layout: number) => {
        setSelectedLayout(layout)
        setShowCamera(true)
    }

    const handleCapturedImages = (images: string[]) => {
        setCapturedImages(images)
        setShowCamera(false)
    }

    const handleLayoutSave = (dataUrl: string) => {
        setFinalImage(dataUrl)
    }

    const handleStartOver = () => {
        setSelectedLayout(null)
        setCapturedImages([])
        setFinalImage(null)
        window.location.reload();
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center ">
            {!selectedLayout && !showCamera && !finalImage && (
                <LayoutSelector onSelect={handleLayoutSelect} />
            )}
            {showCamera && (
                <div className="h-svh w-svw max-w-full p-0">
                    <Camera
                        onClosed={() => setShowCamera(false)}
                        onCapturedImages={handleCapturedImages}
                        requiredPhotos={3}
                    />
                </div>

            )}
            {capturedImages.length === 3 && !finalImage && (
                <div className="w-full max-w-3xl">
                    {selectedLayout === 1 && <Layout1 images={capturedImages} onSave={handleLayoutSave} />}
                    {selectedLayout === 2 && <Layout2 images={capturedImages} onSave={handleLayoutSave} />}
                    {selectedLayout === 3 && <Layout3 images={capturedImages} onSave={handleLayoutSave} />}
                </div>
            )}
            {finalImage && (
                <div className="flex flex-col items-center p-20 ">

                    <img src={finalImage} alt="Final Layout" className="max-w-full h-auto mb-4" />
                    <div className="flex gap-4 z-10">
                        <Button onClick={handleStartOver}>
                            Start Over
                        </Button>
                        <Button onClick={() => {
                            const link = document.createElement('a')
                            link.href = finalImage
                            link.download = 'photo-booth-templates.jpg'
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                        }}>
                            Download
                        </Button>
                    </div>
                    <Confetti
                        ref={confettiRef}
                        className="absolute left-0 top-0 z-0 size-full"
                        onMouseEnter={() => {
                            confettiRef.current?.fire({});
                        }}
                    />
                </div>
            )}
        </main>
    )
}



