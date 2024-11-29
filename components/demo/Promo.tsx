'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function PromoComponent() {
    const [promos, setPromos] = useState([
        { id: 1, name: 'Summer Sale', code: 'SUMMER20', discount: 20 },
        { id: 2, name: 'New User', code: 'NEWUSER10', discount: 10 },
        { id: 3, name: 'Holiday Special', code: 'HOLIDAY30', discount: 30 },
    ])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = promos.slice(indexOfFirstItem, indexOfLastItem)

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(promos.length / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    const [newPromo, setNewPromo] = useState({ name: '', code: '', discount: 0 })

    const handleAddPromo = () => {
        setPromos([...promos, { id: promos.length + 1, ...newPromo }])
        setNewPromo({ name: '', code: '', discount: 0 })
    }

    const handleDeletePromo = (id: number) => {
        setPromos(promos.filter(promo => promo.id !== id))
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mb-4">Add New Promo</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Promo</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={newPromo.name}
                                onChange={(e) => setNewPromo({ ...newPromo, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="code" className="text-right">
                                Code
                            </Label>
                            <Input
                                id="code"
                                value={newPromo.code}
                                onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="discount" className="text-right">
                                Discount %
                            </Label>
                            <Input
                                id="discount"
                                type="number"
                                value={newPromo.discount}
                                onChange={(e) => setNewPromo({ ...newPromo, discount: parseInt(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <Button onClick={handleAddPromo}>Add Promo</Button>
                </DialogContent>
            </Dialog>

            <Table>
                <TableHeader>
                    <TableRow>

                        <TableHead>Code</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItems.map((promo) => (
                        <TableRow key={promo.id}>
                            <TableCell>{promo.name}</TableCell>
                            <TableCell>{promo.code}</TableCell>
                            <TableCell>{promo.discount}%</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeletePromo(promo.id)}>Delete</Button>
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

