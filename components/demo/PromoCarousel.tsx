'use client'

import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'

interface Promo {
    id: number;
    name: string;
    code: string;
    discount: number;
    image: string;
}

export default function PromoCarousel() {
    const [promos, setPromos] = useState<Promo[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {

        const storedPromos = localStorage.getItem('promos')
        if (storedPromos) {
            try {
                const parsedPromos: Promo[] = JSON.parse(storedPromos)
                setPromos(parsedPromos)
            } catch (error) {
                console.error("Error parsing promos from localStorage", error)
                setPromos([])
            }
        }
    }, [])

    const nextSlide = () => {
        if (promos.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % promos.length)
        }
    }

    const prevSlide = () => {
        if (promos.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + promos.length) % promos.length)
        }
    }

    useEffect(() => {
        if (promos.length > 0) {
            const interval = setInterval(nextSlide, 5000)
            return () => clearInterval(interval)
        }
    }, [promos])


    if (promos.length === 0) {
        return (
            <div className="w-full h-[400px] flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">No promos available</p>
            </div>
        )
    }

    return (
        <div className="relative w-full h-[400px] overflow-hidden">
            {promos.map((promo, index) => (
                <div
                    key={promo.id}
                    className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out transform ${index === currentIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                        }`}
                >
                    <Image
                        src={promo.image}
                        alt={promo.name}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                        <h2 className="text-3xl font-bold text-white mb-2">{promo.name}</h2>
                        <p className="text-xl text-white">
                            Get {promo.discount}% off with code {promo.code}
                        </p>
                    </div>
                </div>
            ))}
            {promos.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 text-white p-2 rounded-full hover:bg-white/50 transition-colors"
                        aria-label="Previous slide"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 text-white p-2 rounded-full hover:bg-white/50 transition-colors"
                        aria-label="Next slide"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {promos.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}