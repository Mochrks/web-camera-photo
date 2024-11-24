"use client"

import Camera from '@/components/camera/camera';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CameraIcon } from 'lucide-react';
import { useState } from 'react';

export default function Capture() {
    const [capturedImages, setCapturedImages] = useState<string[]>([]);
    const [showDialog, setShowDialog] = useState(false);

    return (
        <main className="flex min-h-screen items-center justify-center p-24">
            <Dialog
                open={showDialog}
                onOpenChange={(open) => setShowDialog(open)}
            >
                <DialogTrigger asChild>
                    <div className='flex items-center p-10 border rounded-2xl cursor-pointer text-white text-xl bg-green-500 hover:bg-green-700'  >
                        <CameraIcon className="mr-2 h-10 w-10" />
                        Capture Photo
                        <span className="sr-only">Capture</span>
                    </div>
                </DialogTrigger>
                <DialogContent className="h-svh w-svw max-w-full p-0">
                    <Camera
                        onClosed={() => {
                            setShowDialog(false);
                        }}
                        onCapturedImages={(images) => {
                            setCapturedImages(images);
                            setShowDialog(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </main>
    )
}
