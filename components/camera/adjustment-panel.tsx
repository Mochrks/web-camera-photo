'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Sun, Contrast, Palette, Square, CircleDot, Paintbrush, Sliders, Brush } from 'lucide-react'
import { cn } from "@/lib/utils"

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

export function AdjustmentPanel() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeAdjustment, setActiveAdjustment] = useState<AdjustmentType | null>(null)
    const [values, setValues] = useState<Record<AdjustmentType, number>>({
        brightness: 0,
        contrast: 0,
        saturation: 0,
        whites: 0,
        blacks: 0,
        sharpness: 0,
        hue: 0,
    })
    const panelRef = useRef<HTMLDivElement>(null)

    const handleSliderChange = (type: AdjustmentType, value: number[]) => {
        setValues(prev => ({ ...prev, [type]: value[0] }))
    }

    const toggleAdjustment = (type: AdjustmentType) => {
        setActiveAdjustment(prev => prev === type ? null : type)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setActiveAdjustment(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative">
            <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle image adjustments"
                className="bg-gray-800 text-white hover:bg-gray-700 hover:text-white"
            >
                <Sliders className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <div
                ref={panelRef}
                className={cn(
                    "fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-in-out",
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                )}
            >
                <div className="flex flex-col items-center justify-center w-full p-4 mt-0 md:mt-2">
                    <div className='flex flex-col items-center justify-center w-[36rem] rounded-2xl bg-gray-800 bg-opacity-60 backdrop-blur-sm p-4'>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-white">Adjustments</h2>
                        </div>
                        <div className="flex space-x-4 overflow-x-auto pb-2">
                            {adjustments.map(({ type, icon, label }) => (
                                <div key={type} className="flex flex-col items-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => toggleAdjustment(type)}
                                        aria-label={`Adjust ${label}`}
                                        className={cn(
                                            "text-white hover:bg-gray-700 hover:text-white transition-colors",
                                            activeAdjustment === type && "bg-gray-700"
                                        )}
                                    >
                                        {icon}
                                    </Button>
                                    <span className="text-xs text-white mt-1">{label}</span>
                                </div>
                            ))}
                        </div>
                        {activeAdjustment && (
                            <div className="w-80 mt-4 px-2 ">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-white">{adjustments.find(a => a.type === activeAdjustment)?.label}</span>
                                    <span className="text-sm tabular-nums text-white">{values[activeAdjustment]}</span>
                                </div>
                                <Slider
                                    id={activeAdjustment}
                                    min={-100}
                                    max={100}
                                    step={1}
                                    value={[values[activeAdjustment]]}
                                    onValueChange={(value) => handleSliderChange(activeAdjustment, value)}
                                    className="w-full text-white"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

