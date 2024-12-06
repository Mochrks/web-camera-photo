"use client"

import { useEffect, useRef, useState } from 'react'
import LayoutSelector from '../../components/camera/layout-selector'
import Camera from '../../components/camera/camera'
import { Layout1, Layout2, Layout3, Layout4, Layout5, Layout6, } from '../../components/camera/photo-layouts'
import { Button } from '@/components/ui/button'
import type { ConfettiRef } from "../../components/ui/confetti";
import Confetti from "../../components/ui/confetti"
import { Download, Play, PrinterCheck } from 'lucide-react';
import ColorPickerCTA from '@/components/demo/ColorPickerCTA'
import { BackgroundLines } from '@/components/ui/background-lines'
import { Vortex } from '@/components/ui/vortex'
import { ChooseFilter } from '@/components/demo/ChooseFilter'
import ChooseFilterCTA from '@/components/demo/ChooseFilterCTA'

export default function PhotoBooth() {
    const [selectedLayout, setSelectedLayout] = useState<number | null>(null)
    const [showCamera, setShowCamera] = useState(false)
    const [capturedImages, setCapturedImages] = useState<string[]>([])
    const [finalImage, setFinalImage] = useState<string | null>(null)
    const confettiRef = useRef<ConfettiRef>(null);
    const [selectedColor, setSelectedColor] = useState('#000000')
    const [isColorChanged, setIsColorChanged] = useState(false)

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
        setIsColorChanged(false)
    }

    const handleStartOver = () => {
        setSelectedLayout(null)
        setCapturedImages([])
        setFinalImage(null)
        window.location.reload();
    }

    const handleColorChange = (color: string) => {

        if (selectedColor !== color) {
            setSelectedColor(color);
            console.log('Color in parent:', color);

            setIsColorChanged(true);
            setTimeout(() => {
                setIsColorChanged(false);
            }, 1000);
        }
    };



    useEffect(() => {
        if (isColorChanged && capturedImages.length === 3 && finalImage) {

            setFinalImage(null)
        }
    }, [selectedColor, isColorChanged])


    return (
        <BackgroundLines className="flex min-h-screen flex-col items-center justify-center overflow-hidden">
            <div className='z-50'>
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
                        {selectedLayout === 1 && <Layout1 images={capturedImages} onSave={handleLayoutSave} backgroundColor={selectedColor} />}
                        {selectedLayout === 2 && <Layout2 images={capturedImages} onSave={handleLayoutSave} backgroundColor={selectedColor} />}
                        {selectedLayout === 3 && <Layout3 images={capturedImages} onSave={handleLayoutSave} backgroundColor={selectedColor} />}
                        {selectedLayout === 4 && <Layout4 images={capturedImages} onSave={handleLayoutSave} backgroundColor={selectedColor} />}
                        {selectedLayout === 5 && <Layout5 images={capturedImages} onSave={handleLayoutSave} backgroundColor={selectedColor} />}
                        {selectedLayout === 6 && <Layout6 images={capturedImages} onSave={handleLayoutSave} backgroundColor={selectedColor} />}
                    </div>
                )}
                {finalImage && (
                    <div className="flex flex-col items-center p-5 bg-white rounded-xl m-20 ">
                        <div className='z-50'>
                            <ChooseFilterCTA />
                            <ColorPickerCTA onColorChange={handleColorChange} />
                        </div>
                        <div className='border border-gray-600 p-3 m-5'>
                            <img src={finalImage} alt="Final Layout" className="max-w-full h-auto mb-4 " />
                        </div>

                        <div className="flex gap-4 z-10">
                            <Button
                                variant="default"
                                size="icon"
                                onClick={handleStartOver}
                                className=" w-full px-5"
                            >
                                <Play className='w-5 h5 ' />Start Over
                            </Button>
                            <Button
                                variant="default"
                                size="icon"
                                onClick={() => {
                                    const link = document.createElement('a')
                                    link.href = finalImage
                                    link.download = 'photo-booth-templates.jpg'
                                    document.body.appendChild(link)
                                    link.click()
                                    document.body.removeChild(link)
                                }}
                                className=" w-full px-5"
                            >
                                <Download className='w-5 h5 ' /> Download
                            </Button>

                            {/* <Button
                            variant="default"
                            size="icon"
                            onClick={() => {
                                window.print();
                            }}
                            className="w-full px-5"
                        >
                            <PrinterCheck className='w-5 h5' /> Print
                        </Button> */}
                        </div>
                        <Confetti
                            ref={confettiRef}
                            className="absolute left-0 top-0 z-0 size-full"
                            onMouseEnter={() => {
                                confettiRef.current?.fire({});
                            }}
                        />
                    </div>
                )
                }
            </div>

        </BackgroundLines >
    )
}



