'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Sun, Contrast, Palette, Square, Brush, CircleDot, Paintbrush } from 'lucide-react'

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
    const [filters, setFilters] = useState<Filter[]>([
        { id: 1, name: 'Vintage', adjustments: { brightness: 50, contrast: 60, saturation: 40, whites: 70, blacks: 30, sharpness: 80, hue: 0 } },
        { id: 2, name: 'Sepia', adjustments: { brightness: 70, contrast: 40, saturation: 30, whites: 60, blacks: 50, sharpness: 60, hue: 30 } },
        { id: 3, name: 'Noir', adjustments: { brightness: 30, contrast: 90, saturation: 10, whites: 80, blacks: 70, sharpness: 100, hue: 0 } },
    ])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

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
        setFilters([...filters, { ...newFilter, id: filters.length + 1 }])
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
    }

    const handleDeleteFilter = (id: number) => {
        setFilters(filters.filter(filter => filter.id !== id))
    }

    return (
        <div className="space-y-6">
            <Dialog>
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
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteFilter(filter.id)}>Delete</Button>
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

