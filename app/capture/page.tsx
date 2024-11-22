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
                    <Button variant="outline">
                        <CameraIcon className="mr-2 h-5 w-5" />
                        Capture Photo
                        <span className="sr-only">Capture</span>
                    </Button>
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
