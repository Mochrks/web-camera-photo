'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
            <div className="w-full h-[300px] flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">No promos available</p>
            </div>
        )
    }

    return (
        <div className="relative w-full h-[300px] overflow-hidden">
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={promos[currentIndex].image}
                        alt={promos[currentIndex].name}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="absolute bottom-0 left-0 right-0 p-8"
                    >
                        <h2 className="text-4xl font-bold text-white mb-2">{promos[currentIndex].name}</h2>
                        <p className="text-2xl text-white">
                            Get {promos[currentIndex].discount}% off with code{" "}
                            <span className="font-bold">{promos[currentIndex].code}</span>
                        </p>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
            {promos.length > 1 && (
                <>
                    {/* <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevSlide}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-white/50 transition-colors"
                        aria-label="Previous slide"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextSlide}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-white/50 transition-colors"
                        aria-label="Next slide"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </motion.button> */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {promos.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

