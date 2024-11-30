'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Trash2, Edit, Plus, Upload } from 'lucide-react'
import Image from 'next/image'

interface Frame {
    id: number;
    name: string;
    width: number;
    height: number;
    imageUrl: string;
}

export default function FrameComponent() {
    const [frames, setFrames] = useState<Frame[]>([
        { id: 1, name: 'Classic', width: 2, height: 2, imageUrl: '/placeholder.svg?height=200&width=200' },
        { id: 2, name: 'Modern', width: 3, height: 3, imageUrl: '/placeholder.svg?height=300&width=300' },
        { id: 3, name: 'Vintage', width: 1, height: 3, imageUrl: '/placeholder.svg?height=300&width=100' },
    ])
    const [newFrame, setNewFrame] = useState<Omit<Frame, 'id' | 'imageUrl'>>({ name: '', width: 1, height: 1 })
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleAddFrame = () => {
        const newId = Math.max(...frames.map(f => f.id), 0) + 1
        const imageUrl = selectedFile ? URL.createObjectURL(selectedFile) : '/placeholder.svg?height=200&width=200'
        setFrames([...frames, { id: newId, ...newFrame, imageUrl }])
        setNewFrame({ name: '', width: 1, height: 1 })
        setSelectedFile(null)
    }

    const handleDeleteFrame = (id: number) => {
        setFrames(frames.filter(frame => frame.id !== id))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    return (
        <div className="space-y-6">
            <Dialog>
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
                                accept="image/*"
                            />
                        </div>
                    </div>
                    <Button onClick={handleAddFrame}>Add Frame</Button>
                </DialogContent>
            </Dialog>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {frames.map((frame) => (
                    <Card key={frame.id} className="overflow-hidden">
                        <CardContent className="p-0">
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
                                <Button variant="destructive" size="icon" onClick={() => handleDeleteFrame(frame.id)}>
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

