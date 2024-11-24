"use client";

import { ArrowLeftRight, Printer, X, Images, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CameraView } from "./camera-view";
import { FC, useRef, useState } from "react";
import { CameraType } from "@/components/camera/camera-types";
import { useCamera } from "@/components/camera/camera-provider";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Layout1, Layout2, Layout3 } from "./photo-layouts";
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface CameraProps {
  onClosed: () => void;
  onCapturedImages: (images: string[]) => void;
}

const Camera: FC<CameraProps> = ({ onClosed, onCapturedImages }) => {
  const camera = useRef<CameraType>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { images, addImage, numberOfCameras, resetImages, stopStream } = useCamera();
  const [timerActive, setTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(4);
  const [timerCount, setTimerCount] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);

  const handleCapture = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (timerActive) {
      startTimer();
    } else {
      capturePhoto();
    }
  };

  const startTimer = () => {
    setTimerCount(timerDuration);
    const timer = setInterval(() => {
      setTimerCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer);
          capturePhoto();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const capturePhoto = () => {
    if (camera.current) {
      setShowFlash(true);
      setTimeout(() => {
        const imageData = camera.current?.takePhoto();
        if (imageData) {
          addImage(imageData);
        }
        setShowFlash(false);
      }, 150);
    }
  };

  const handleOnClosed = () => {
    stopStream();
    onClosed();
  };

  const handleOnCapturedImages = (images: string[]) => {
    onCapturedImages(images);
    resetImages();
    handleOnClosed();
  };

  const handleLayoutSave = (dataUrl: string) => {
    setFinalImage(dataUrl);
  };

  const handleDownload = () => {
    if (finalImage) {
      const link = document.createElement('a');
      link.href = finalImage;
      link.download = 'photo-booth-layout.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="z-10 flex min-h-screen w-full flex-col bg-black">
      <div className="relative flex-1">
        <div className="z-99">

        </div>
        <div className="absolute z-10 w-full h-16 flex justify-between items-center px-4 ">
          <Button
            className="rounded-full p-2 bg-gray-800 text-white hover:bg-gray-700"
            size="icon"
            onClick={handleOnClosed}
          >
            <X className="h-6 w-6" />
          </Button>


          <div className="flex space-x-2">
            <Select
              value={timerActive ? timerDuration.toString() : "off"}
              onValueChange={(value) => {
                if (value === "off") {
                  setTimerActive(false);
                } else {
                  setTimerActive(true);
                  setTimerDuration(parseInt(value));
                }
              }}
            >
              <SelectTrigger className="w-[100px] bg-gray-800 text-white">
                <SelectValue placeholder="Timer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="off">Timer</SelectItem>
                <SelectItem value="4">4s</SelectItem>
                <SelectItem value="5">5s</SelectItem>
                <SelectItem value="10">10s</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className={cn(
                "rounded-full p-2",
                showGrid ? "bg-blue-500 text-white" : "bg-gray-800 text-white hover:bg-gray-700"
              )}
              size="icon"
              onClick={() => setShowGrid(!showGrid)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="3" y1="15" x2="21" y2="15"></line>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="15" y1="3" x2="15" y2="21"></line>
              </svg>
            </Button>
          </div>
        </div>

        <CameraView ref={camera} />

        {showGrid && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full grid grid-cols-3 grid-rows-3">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="border border-white opacity-30"></div>
              ))}
            </div>
          </div>
        )}




        <div className="absolute bottom-1 left-0 right-0 flex justify-center items-center space-x-20 md:space-x-10 bg-gray-600 bg-opacity-30 py-14">
          <Gallery />
          <Button
            className="h-16 w-16 rounded-full bg-white hover:bg-gray-300 p-2 shadow-lg"
            onClick={handleCapture}
          >
            <div className="h-14 w-14 rounded-full bg-red-500 hover:bg-red-600" />
          </Button>
          {numberOfCameras > 0 && <SwitchCamera />}
        </div>

        <div className="absolute bottom-48 right-4">
          <LayoutSelector selectedLayout={selectedLayout} setSelectedLayout={setSelectedLayout} />
        </div>

        {selectedLayout !== null && images.length >= 3 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="absolute rounded-full bottom-48 right-20 z-10 bg-green-500 hover:bg-green-600 text-white">
                Create Templates
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full ">
              <DialogHeader>
                <DialogTitle>Photo Booth Layout</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-full">
                {selectedLayout === 1 && <Layout1 images={images.slice(0, 3)} onSave={handleLayoutSave} />}
                {selectedLayout === 2 && <Layout2 images={images.slice(0, 3)} onSave={handleLayoutSave} />}
                {selectedLayout === 3 && <Layout3 images={images.slice(0, 3)} onSave={handleLayoutSave} />}
              </ScrollArea>
              {finalImage && (
                <Button onClick={handleDownload} className="mt-4">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              )}
            </DialogContent>
          </Dialog>
        )}


        {timerCount > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-9xl text-white font-bold">{timerCount}</span>
          </div>
        )}

        {showFlash && (
          <div className="absolute inset-0 bg-white animate-flash"></div>
        )}
      </div>
    </div>
  );
};

interface LayoutSelectorProps {
  selectedLayout: number | null;
  setSelectedLayout: (layout: number) => void;
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ selectedLayout, setSelectedLayout }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLayoutSelect = (layout: number) => {
    setSelectedLayout(layout);
    setIsOpen(false);
  };

  const layouts = [
    {
      id: 1,
      name: 'Classic Vertical',
      skeleton: (
        <div className="w-full h-40 bg-gray-200 flex flex-col">
          <div className="h-1/3 border-b-2 border-white"></div>
          <div className="h-1/3 border-b-2 border-white"></div>
          <div className="h-1/3"></div>
        </div>
      ),
    },
    {
      id: 2,
      name: 'Modern Grid',
      skeleton: (
        <div className="w-full h-40 bg-gray-200 grid grid-cols-2 grid-rows-2 gap-1">
          <div className="bg-white"></div>
          <div className="bg-white"></div>
          <div className="bg-white"></div>
          <div className="bg-white"></div>
        </div>
      ),
    },
    {
      id: 3,
      name: 'Polaroid Style',
      skeleton: (
        <div className="w-full h-40 bg-gray-200 flex justify-center items-center">
          <div className="w-3/4 h-3/4 bg-white border-8 border-gray-300 transform rotate-6"></div>
        </div>
      ),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onClick={() => setIsOpen(true)}>
              <Printer className="h-10 w-10" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Select templates</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select a Template</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4">
          {layouts.map((layout) => (
            <Button
              key={layout.id}
              variant="outline"
              className={`h-auto p-4 ${selectedLayout === layout.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => handleLayoutSelect(layout.id)}
            >
              <div className="w-full space-y-2">
                <div className="font-semibold">{layout.name}</div>
                {layout.skeleton}
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};



function SwitchCamera() {
  const { devices, setActiveDeviceId, activeDeviceId, switchCamera } = useCamera();

  if (devices.length === 2) {
    return (
      <Button
        variant="default"
        size="icon"
        className="w-16 h-10 bg-gray-800 text-white hover:bg-gray-700"
        onClick={switchCamera}
      >
        <ArrowLeftRight className="fixed h-6 w-6" />
      </Button>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"default"}
          size={"icon"}
          className=" w-16 h-10  bg-gray-800 text-white hover:bg-gray-700"
        >
          <ArrowLeftRight className="fixed h-6 w-6  " />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Switch Camera</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Select
            onValueChange={(value) => {
              setActiveDeviceId(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose Camera" />
            </SelectTrigger>
            <SelectContent>
              {devices.map((device) => (
                <SelectItem key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export function Gallery() {
  const { images, removeImage } = useCamera();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-center  w-16 h-10 p-2 bg-gray-800 text-white hover:bg-gray-700 transition duration-200"
          size="icon"
        >
          <Images className="h-6 w-6" />
          {images.length > 0 && (
            <span className="ml-0 text-sm">
              ({images.length})
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{images.length} Photos</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <img src={image} alt={`captured ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                <Button
                  className="absolute right-2 top-2 h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 p-1"
                  size="icon"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4 text-white" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}


export default Camera;
