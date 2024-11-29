'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function FilterComponent() {
    const [filters, setFilters] = useState([
        { id: 1, name: 'Vintage', adjustment: 50, contrast: 60 },
        { id: 2, name: 'Sepia', adjustment: 70, contrast: 40 },
        { id: 3, name: 'Noir', adjustment: 80, contrast: 90 },
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

    const [newFilter, setNewFilter] = useState({ name: '', adjustment: 50, contrast: 50 })

    const handleAddFilter = () => {
        setFilters([...filters, { id: filters.length + 1, ...newFilter }])
        setNewFilter({ name: '', adjustment: 50, contrast: 50 })
    }

    const handleDeleteFilter = (id: number) => {
        setFilters(filters.filter(filter => filter.id !== id))
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mb-4">Add New Filter</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Filter</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={newFilter.name}
                                onChange={(e) => setNewFilter({ ...newFilter, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="adjustment" className="text-right">
                                Adjustment
                            </Label>
                            <Slider
                                id="adjustment"
                                min={0}
                                max={100}
                                step={1}
                                value={[newFilter.adjustment]}
                                onValueChange={(value) => setNewFilter({ ...newFilter, adjustment: value[0] })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="contrast" className="text-right">
                                Contrast
                            </Label>
                            <Slider
                                id="contrast"
                                min={0}
                                max={100}
                                step={1}
                                value={[newFilter.contrast]}
                                onValueChange={(value) => setNewFilter({ ...newFilter, contrast: value[0] })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <Button onClick={handleAddFilter}>Add Filter</Button>
                </DialogContent>
            </Dialog>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Adjustment</TableHead>
                        <TableHead>Contrast</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItems.map((filter) => (
                        <TableRow key={filter.id}>
                            <TableCell>{filter.name}</TableCell>
                            <TableCell>{filter.adjustment}</TableCell>
                            <TableCell>{filter.contrast}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteFilter(filter.id)}>Delete</Button>
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
