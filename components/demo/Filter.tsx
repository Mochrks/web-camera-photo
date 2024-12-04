'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Sun, Contrast, Palette, Square, Brush, CircleDot, Paintbrush } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import toast, { Toaster } from 'react-hot-toast'

type AdjustmentType = 'brightness' | 'contrast' | 'saturation' | 'whites' | 'blacks' | 'sharpness' | 'hue'

const adjustments: { type: AdjustmentType; icon: React.ReactNode; label: string }[] = [
    { type: 'brightness', icon: <Sun className="w-4 h-4" />, label: 'Brightness' },
    { type: 'contrast', icon: <Contrast className="w-4 h-4" />, label: 'Contrast' },
    { type: 'saturation', icon: <Palette className="w-4 h-4" />, label: 'Saturation' },
    { type: 'whites', icon: <Square className="w-4 h-4 fill-current" />, label: 'Whites' },
    { type: 'blacks', icon: <Brush className="w-4 h-4 " />, label: 'Blacks' },
    { type: 'sharpness', icon: <CircleDot className="w-4 h-4" />, label: 'Sharpness' },
    { type: 'hue', icon: <Paintbrush className="w-4 h-4" />, label: 'Hue' },
]

type Filter = {
    id: number;
    name: string;
    adjustments: Record<AdjustmentType, number>;
}

export default function FilterComponent() {
    const [filters, setFilters] = useState<Filter[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Load filters from localStorage on component mount
    useEffect(() => {
        const storedFilters = localStorage.getItem('filters')
        if (storedFilters) {
            setFilters(JSON.parse(storedFilters))
        }
    }, [])


    useEffect(() => {
        localStorage.setItem('filters', JSON.stringify(filters))
    }, [filters])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filters.slice(indexOfFirstItem, indexOfLastItem)

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(filters.length / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    const [newFilter, setNewFilter] = useState<Filter>({
        id: 0,
        name: '',
        adjustments: {
            brightness: 50,
            contrast: 50,
            saturation: 50,
            whites: 50,
            blacks: 50,
            sharpness: 50,
            hue: 0
        }
    })

    const handleAddFilter = () => {
        // validation
        if (!newFilter.name.trim()) {
            toast.error('Filter name cannot be empty', {
                position: 'top-right'
            })
            return
        }


        const newFilterWithId = {
            ...newFilter,
            id: Date.now()
        }

        // Update state dan localStorage
        const updatedFilters = [...filters, newFilterWithId]
        setFilters(updatedFilters)
        localStorage.setItem('filters', JSON.stringify(updatedFilters))


        toast.success(`Filter "${newFilter.name}" added successfully`, {
            position: 'top-right'
        })

        // Reset form
        setNewFilter({
            id: 0,
            name: '',
            adjustments: {
                brightness: 50,
                contrast: 50,
                saturation: 50,
                whites: 50,
                blacks: 50,
                sharpness: 50,
                hue: 0
            }
        })
        setIsDialogOpen(false)
    }

    const handleDeleteFilter = (id: number, name: string) => {
        const updatedFilters = filters.filter(filter => filter.id !== id)
        setFilters(updatedFilters)
        localStorage.setItem('filters', JSON.stringify(updatedFilters))


        toast.success(`Filter "${name}" deleted successfully`, {
            position: 'top-right'
        })
    }

    return (
        <div className="space-y-6">

            <Toaster />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="mb-4">Add New Filter</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Filter</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-left ml-1">
                                Name Filter
                            </Label>
                            <Input
                                id="name"
                                value={newFilter.name}
                                onChange={(e) => setNewFilter({ ...newFilter, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        {adjustments.map((adjustment) => (
                            <div key={adjustment.type} className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor={adjustment.type} className="text-right flex items-center gap-2">
                                    {adjustment.icon}
                                    {adjustment.label}
                                </Label>
                                <div className="col-span-3 flex items-center gap-4">
                                    <Slider
                                        id={adjustment.type}
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={[newFilter.adjustments[adjustment.type]]}
                                        onValueChange={(value) => setNewFilter({
                                            ...newFilter,
                                            adjustments: { ...newFilter.adjustments, [adjustment.type]: value[0] }
                                        })}
                                        className="flex-grow"
                                    />
                                    <span className="w-8 text-right">{newFilter.adjustments[adjustment.type]}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button onClick={handleAddFilter}>Add Filter</Button>
                </DialogContent>
            </Dialog>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentItems.map((filter) => (
                    <Card key={filter.id}>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">{filter.name}</h3>
                            <div className="space-y-4">
                                {adjustments.map((adjustment) => (
                                    <div key={adjustment.type} className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 w-24">
                                            {adjustment.icon}
                                            <span className="text-sm">{adjustment.label}</span>
                                        </div>
                                        <Slider
                                            value={[filter.adjustments[adjustment.type]]}
                                            max={100}
                                            step={1}
                                            className="flex-grow"
                                        />
                                        <span className="w-8 text-right text-sm">{filter.adjustments[adjustment.type]}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm">Delete</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Filter</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete the filter {filter.name}? This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteFilter(filter.id, filter.name)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end mt-4 bg-gray-200 p-4 rounded-xl">
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