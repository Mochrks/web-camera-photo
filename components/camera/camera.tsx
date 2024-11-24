"use client";

import { ArrowLeftRight, Check, GalleryVerticalEnd, Timer, X, Images } from "lucide-react";
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

interface CameraProps {
  onClosed: () => void;
  onCapturedImages: (images: string[]) => void;
}

const Camera: FC<CameraProps> = ({ onClosed, onCapturedImages }) => {
  const camera = useRef<CameraType>();
  const { images, addImage, numberOfCameras, resetImages, stopStream } = useCamera();
  const [timerActive, setTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(4);
  const [timerCount, setTimerCount] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

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

  return (
    <div className="z-10 flex min-h-screen w-full flex-col bg-black">
      <div className="relative flex-1">
        <div className="absolute z-10 w-full h-16 flex justify-between items-center px-4 ">
          <Button
            className="rounded-full p-2 bg-gray-800 text-white hover:bg-gray-700"
            size="icon"
            onClick={handleOnClosed}
          >
            <X className="h-6 w-6" />
          </Button>

          {images.length > 0 && (
            <Button
              className="px-10 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg"
              onClick={() => handleOnCapturedImages(images)}
            >
              Done ({images.length})
            </Button>
          )}

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



        <div className="absolute bottom-1 left-0 right-0 flex justify-center items-center space-x-10 bg-gray-600 bg-opacity-30 py-14">
          <Gallery />
          <Button
            className="h-16 w-16 rounded-full bg-white hover:bg-gray-300 p-2 shadow-lg"
            onClick={handleCapture}
          >
            <div className="h-14 w-14 rounded-full bg-red-500 hover:bg-red-600" />
          </Button>
          {numberOfCameras > 0 && <SwitchCamera />}

        </div>



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



function SwitchCamera() {
  const { devices, setActiveDeviceId, activeDeviceId, switchCamera } = useCamera();

  if (devices.length === 2) {
    return (
      <Button
        variant="default"
        size="icon"
        className="rounded-full p-4 bg-gray-800 text-white hover:bg-gray-700"
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
          className=" rounded-full   p-4 bg-gray-800 text-white hover:bg-gray-700"
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
          className="rounded-full p-2 bg-gray-800 text-white hover:bg-gray-700"
          size="icon"
        >
          <GalleryVerticalEnd className="h-6 w-6" />
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
