'use client'

import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Trash2, Edit, Plus } from 'lucide-react'
import Image from 'next/image'

interface Frame {
    id: number;
    name: string;
    width: number;
    height: number;
    imageUrl: string;
}

export default function FrameComponent() {
    const [frames, setFrames] = useState<Frame[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newFrame, setNewFrame] = useState<Omit<Frame, 'id' | 'imageUrl'>>({ name: '', width: 1, height: 1 })
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [frameToDelete, setFrameToDelete] = useState<Frame | null>(null)


    // Load frames from localStorage on component mount
    useEffect(() => {
        const storedFrames = localStorage.getItem('frames')
        if (storedFrames) {
            setFrames(JSON.parse(storedFrames))
        }
    }, [])

    // Update localStorage 
    useEffect(() => {
        localStorage.setItem('frames', JSON.stringify(frames))
    }, [frames])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Validasi tipe file
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
            if (!allowedTypes.includes(file.type)) {
                toast.error('Only JPEG, JPG, and PNG files are allowed', {
                    position: 'top-right'
                })
                return
            }

            // Validation ( maks 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size should be less than 5MB', {
                    position: 'top-right'
                })
                return
            }

            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedFile(file)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddFrame = () => {
        // Validasi input
        if (!newFrame.name.trim()) {
            toast.error('Frame name cannot be empty', {
                position: 'top-right'
            })
            return
        }

        if (newFrame.width <= 0 || newFrame.height <= 0) {
            toast.error('Width and height must be greater than 0', {
                position: 'top-right'
            })
            return
        }

        if (!selectedFile) {
            toast.error('Please upload an image', {
                position: 'top-right'
            })
            return
        }

        // read file base64
        const reader = new FileReader()
        reader.onloadend = () => {
            const newId = Date.now()
            const imageUrl = reader.result as string

            const newFrameWithId: Frame = {
                id: newId,
                ...newFrame,
                imageUrl
            }

            // Update state dan localStorage
            const updatedFrames = [...frames, newFrameWithId]
            setFrames(updatedFrames)
            localStorage.setItem('frames', JSON.stringify(updatedFrames))


            toast.success(`Frame "${newFrame.name}" added successfully`, {
                position: 'top-right'
            })


            setNewFrame({ name: '', width: 1, height: 1 })
            setSelectedFile(null)
            setIsDialogOpen(false)
        }
        reader.readAsDataURL(selectedFile)
    }
    const confirmDeleteFrame = (frame: Frame) => {
        setFrameToDelete(frame)
    }
    const handleDeleteFrame = () => {
        if (!frameToDelete) return

        const updatedFrames = frames.filter(frame => frame.id !== frameToDelete.id)
        setFrames(updatedFrames)
        localStorage.setItem('frames', JSON.stringify(updatedFrames))


        toast.success(`Frame "${frameToDelete.name}" deleted successfully`, {
            position: 'top-right'
        })


        setFrameToDelete(null)
    }

    return (
        <div className="space-y-6">
            <Toaster />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="mb-4">
                        <Plus className="mr-2 h-4 w-4" /> Add New Frame
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Frame</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                                id="name"
                                value={newFrame.name}
                                onChange={(e) => setNewFrame({ ...newFrame, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="width" className="text-right">Width</Label>
                            <Input
                                id="width"
                                type="number"
                                value={newFrame.width}
                                onChange={(e) => setNewFrame({ ...newFrame, width: parseInt(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="height" className="text-right">Height</Label>
                            <Input
                                id="height"
                                type="number"
                                value={newFrame.height}
                                onChange={(e) => setNewFrame({ ...newFrame, height: parseInt(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="file" className="text-right">Frame Image</Label>
                            <Input
                                id="file"
                                type="file"
                                onChange={handleFileChange}
                                className="col-span-3"
                                accept="image/jpeg,image/png,image/jpg"
                            />
                            {selectedFile && (
                                <div className="col-span-4 text-sm text-gray-500 mt-2">
                                    Selected file: {selectedFile.name}
                                </div>
                            )}
                        </div>
                    </div>
                    <Button onClick={handleAddFrame}>Add Frame</Button>
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={!!frameToDelete}
                onOpenChange={() => setFrameToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Frame</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete the frame {frameToDelete?.name}?
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setFrameToDelete(null)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteFrame}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {frames.map((frame) => (
                    <Card key={frame.id} className="overflow-hidden">
                        <CardContent className="p-0 ">
                            <div className="relative aspect-square">
                                <Image
                                    src={frame.imageUrl}
                                    alt={frame.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center p-4">
                            <div>
                                <h3 className="font-semibold">{frame.name}</h3>
                                <p className="text-sm text-gray-500">{frame.width}x{frame.height}</p>
                            </div>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => confirmDeleteFrame(frame)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}