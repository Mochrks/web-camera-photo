"use client";

import { ArrowLeftRight, Images, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CameraView } from "./camera-view";
import { FC, useRef, useState, useEffect } from "react";
import { CameraType } from "@/components/camera/camera-types";
import { useCamera } from "@/components/camera/camera-provider";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '../ui/scroll-area';

interface CameraProps {
  onClosed: () => void;
  onCapturedImages: (images: string[]) => void;
  requiredPhotos: number
}

const Camera: FC<CameraProps> = ({ onClosed, onCapturedImages, requiredPhotos }) => {
  const camera = useRef<CameraType>();
  const { images, addImage, numberOfCameras, resetImages, stopStream } = useCamera();
  const [photoCount, setPhotoCount] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(4);
  const [showFlash, setShowFlash] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [timerCount, setTimerCount] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerCount > 0) {
      timer = setTimeout(() => {
        setTimerCount(timerCount - 1);
        if (timerCount === 1) {
          capturePhoto();
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [timerCount]);

  const handleCapture = () => {
    if (timerActive) {
      setTimerCount(timerDuration);
    } else {
      capturePhoto();
    }
  }

  const capturePhoto = () => {
    if (camera.current) {
      setShowFlash(true);
      setTimeout(() => {
        const imageData = camera.current?.takePhoto();
        if (imageData) {
          addImage(imageData);
          setPhotoCount(prev => {
            const newCount = prev + 1;
            if (newCount === requiredPhotos) {
              onCapturedImages([...images, imageData]);
            }
            return newCount;
          });
        }
        setShowFlash(false);
      }, 150);
    }
  };

  const handleClose = () => {
    stopStream();
    onClosed();
    window.location.reload();
  }

  return (
    <div className="z-10 flex min-h-screen w-full flex-col bg-black">
      <div className="relative flex-1">
        <div className="absolute z-10 w-full h-16 flex justify-between items-center px-4">
          <Button
            className="rounded-full p-2 bg-gray-800 text-white hover:bg-gray-700"
            size="icon"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close camera</span>
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
              <span className="sr-only">Toggle grid</span>
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
            disabled={photoCount === requiredPhotos || timerCount > 0}
          >
            <div className="h-14 w-14 rounded-full bg-red-500 hover:bg-red-600" />
            <span className="sr-only">Capture photo</span>
          </Button>
          {numberOfCameras > 0 && <SwitchCamera />}
        </div>

        <div className="absolute bottom-48 left-0 right-0 flex justify-center">
          <Button disabled={photoCount === requiredPhotos}>
            Capture ({photoCount}/{requiredPhotos})
          </Button>
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
        className="w-16 h-10 bg-gray-800 text-white hover:bg-gray-700"
        onClick={switchCamera}
      >
        <ArrowLeftRight className="fixed h-6 w-6" />
        <span className="sr-only">Switch camera</span>
      </Button>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"default"}
          size={"icon"}
          className="w-16 h-10 bg-gray-800 text-white hover:bg-gray-700"
        >
          <ArrowLeftRight className="fixed h-6 w-6" />
          <span className="sr-only">Switch camera</span>
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

function Gallery() {
  const { images, removeImage } = useCamera();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-center w-16 h-10 p-2 bg-gray-800 text-white hover:bg-gray-700 transition duration-200"
          size="icon"
        >
          <Images className="h-6 w-6" />
          {images.length > 0 && (
            <span className="ml-0 text-sm">
              ({images.length})
            </span>
          )}
          <span className="sr-only">View gallery</span>
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
                  <span className="sr-only">Remove image</span>
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

