'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function FrameComponent() {
    const [frames, setFrames] = useState([
        { id: 1, name: 'Classic', layout: '2x2' },
        { id: 2, name: 'Modern', layout: '3x3' },
        { id: 3, name: 'Vintage', layout: '1x3' },
    ])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = frames.slice(indexOfFirstItem, indexOfLastItem)

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(frames.length / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    const [newFrame, setNewFrame] = useState({ name: '', layout: '' })
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleAddFrame = () => {
        setFrames([...frames, { id: frames.length + 1, ...newFrame }])
        setNewFrame({ name: '', layout: '' })
        setSelectedFile(null)
    }

    const handleDeleteFrame = (id: number) => {
        setFrames(frames.filter(frame => frame.id !== id))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0])
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mb-4">Add New Frame</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Frame</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={newFrame.name}
                                onChange={(e) => setNewFrame({ ...newFrame, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="layout" className="text-right">
                                Layout
                            </Label>
                            <Input
                                id="layout"
                                value={newFrame.layout}
                                onChange={(e) => setNewFrame({ ...newFrame, layout: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="file" className="text-right">
                                Upload Photo
                            </Label>
                            <Input
                                id="file"
                                type="file"
                                onChange={handleFileChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <Button onClick={handleAddFrame}>Add Frame</Button>
                </DialogContent>
            </Dialog>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Layout</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItems.map((frame) => (
                        <TableRow key={frame.id}>
                            <TableCell>{frame.name}</TableCell>
                            <TableCell>{frame.layout}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteFrame(frame.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-center mt-4">
                {pageNumbers.map(number => (
                    <Button
                        key={number}
                        variant={currentPage === number ? "default" : "outline"}
                        size="sm"
                        className="mx-1"
                        onClick={() => setCurrentPage(number)}
                    >
                        {number}
                    </Button>
                ))}
            </div>
        </div>
    )
}

