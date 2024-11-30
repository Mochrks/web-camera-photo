import * as React from "react"
import Image from "next/image"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "../ui/button"
import { Blend } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Artwork {
    nameFilter: string
    images: string
}

export const works: Artwork[] = [
    {
        nameFilter: "Midnight Blue",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Starry Night",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Deep Ocean",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Cerulean Dream",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Navy Depths",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Oceanic Bliss",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Abyssal Blue",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Turquoise Tide",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Cobalt Sea",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Sapphire Waves",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Indigo Horizon",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Blue Abyss",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Azure Dream",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Electric Blue",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Glacial Blue",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Frosty Blue",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Sky Blue",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Teal Wave",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Marine Blue",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Blue Lagoon",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Blue Velvet",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Midnight Azure",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Royal Blue Horizon",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Prussian Blue",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Arctic Breeze",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Denim Blue",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Celestial Blue",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Deep Sky Blue",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Mediterranean Blue",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    },
    {
        nameFilter: "Ultramarine Dream",
        images: "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg",
    }
]


export function FilterTone() {
    const [isOpen, setIsOpen] = React.useState(false)
    const filterRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative" ref={filterRef}>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-800 text-white hover:bg-gray-700 hover:text-white z-50"
                aria-label="Toggle filter tone"
            >
                <Blend className="h-4 w-4" />
            </Button>
            <div
                className={cn(
                    "fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-in-out",
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                )}
            >
                <ScrollArea className="w-full h-28 md:h-[120px] whitespace-nowrap p-2 bg-gray-600 bg-opacity-90 backdrop-blur-sm">
                    <div className="flex w-max space-x-4 p-4">
                        {works.map((artwork) => (
                            <figure key={artwork.nameFilter} className="shrink-0 w-20 flex flex-col items-center">
                                <div className="overflow-hidden rounded-md flex justify-center">
                                    <Image
                                        src={artwork.images}
                                        alt={`Photo by ${artwork.nameFilter}`}
                                        className="aspect-[3/4] h-fit w-fit object-cover rounded-md"
                                        width={40}
                                        height={50}
                                        sizes="(min-width: 768px) 36px, 40px"
                                    />
                                </div>
                                <figcaption className="pt-2 text-[8px] md:text-xs text-white text-center 
                    whitespace-normal break-words w-full">
                                    {artwork.nameFilter}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )
}
