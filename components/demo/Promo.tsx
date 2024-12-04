'use client'

import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import Image from 'next/image'

type Promo = {
    id: number;
    name: string;
    code: string;
    discount: number;
    image: string;
}

export default function PromoComponent() {
    const [promos, setPromos] = useState<Promo[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Load promos from localStorage on component mount
    useEffect(() => {
        const storedPromos = localStorage.getItem('promos')
        if (storedPromos) {
            setPromos(JSON.parse(storedPromos))
        }
    }, [])

    // Update localStorage
    useEffect(() => {
        localStorage.setItem('promos', JSON.stringify(promos))
    }, [promos])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = promos.slice(indexOfFirstItem, indexOfLastItem)

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(promos.length / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    const [newPromo, setNewPromo] = useState<Omit<Promo, 'id'>>({
        name: '',
        code: '',
        discount: 0,
        image: ''
    })

    // convert images to base64
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {

            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
            if (!allowedTypes.includes(file.type)) {
                toast.error('Only JPEG, JPG, and PNG files are allowed', {
                    position: 'top-right'
                })
                return
            }

            // Validation file ( maks 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size should be less than 5MB', {
                    position: 'top-right'
                })
                return
            }

            const reader = new FileReader()
            reader.onloadend = () => {
                setNewPromo(prev => ({
                    ...prev,
                    image: reader.result as string
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddPromo = () => {
        // Validation input
        if (!newPromo.name.trim()) {
            toast.error('Promo name cannot be empty', {
                position: 'top-right'
            })
            return
        }

        if (!newPromo.code.trim()) {
            toast.error('Promo code cannot be empty', {
                position: 'top-right'
            })
            return
        }

        if (newPromo.discount <= 0) {
            toast.error('Discount must be greater than 0', {
                position: 'top-right'
            })
            return
        }

        if (!newPromo.image) {
            toast.error('Please upload an image', {
                position: 'top-right'
            })
            return
        }

        const newPromoWithId = {
            ...newPromo,
            id: Date.now()
        }

        // Update state dan localStorage
        const updatedPromos = [...promos, newPromoWithId]
        setPromos(updatedPromos)
        localStorage.setItem('promos', JSON.stringify(updatedPromos))


        toast.success(`Promo "${newPromo.name}" added successfully`, {
            position: 'top-right'
        })

        // Reset form 
        setNewPromo({
            name: '',
            code: '',
            discount: 0,
            image: ''
        })
        setIsDialogOpen(false)
    }

    const handleDeletePromo = (id: number, name: string) => {
        const updatedPromos = promos.filter(promo => promo.id !== id)
        setPromos(updatedPromos)
        localStorage.setItem('promos', JSON.stringify(updatedPromos))


        toast.success(`Promo "${name}" deleted successfully`, {
            position: 'top-right'
        })
    }

    return (
        <div className="space-y-6">
            <Toaster />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="mb-4">Add New Promo</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                                Image
                            </Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                onChange={handleImageUpload}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <Button onClick={handleAddPromo}>Add Promo</Button>
                </DialogContent>
            </Dialog>

            <Table className='border-2 rounded-xl mt-5'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Image</TableHead>
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
                                {promo.image && (
                                    <Image src={promo.image} alt={promo.name} width={50} height={50} />
                                )}
                            </TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm">Delete</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Promo</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete the promo {promo.name}? This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeletePromo(promo.id, promo.name)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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