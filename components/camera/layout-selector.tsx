import React from 'react'
import { Button } from '@/components/ui/button'

interface LayoutSelectorProps {
    onSelect: (layout: number) => void
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ onSelect }) => {
    const layouts = [
        {
            id: 1,
            name: 'Classic Vertical',
            skeleton: (
                <div className="w-full h-40 bg-gray-200 flex flex-col">
                    <div className="h-1/3 border-b-2 border-white"></div>
                    <div className="h-1/3 border-b-2 border-white"></div>
                    <div className="h-1/3"></div>
                </div>
            ),
        },
        {
            id: 2,
            name: 'Modern Grid',
            skeleton: (
                <div className="w-full h-40 bg-gray-200 grid grid-cols-2 grid-rows-2 gap-1">
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                </div>
            ),
        },
        {
            id: 3,
            name: 'Polaroid Style',
            skeleton: (
                <div className="w-full h-40 bg-gray-200 flex justify-center items-center">
                    <div className="w-3/4 h-3/4 bg-white border-8 border-gray-300 transform rotate-6"></div>
                </div>
            ),
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-4xl w-full rounded-xl bg-blue-500 p-5">
            {layouts.map((layout) => (
                <Button
                    key={layout.id}
                    onClick={() => onSelect(layout.id)}
                    className="px-2 h-90 text-lg font-semibold flex flex-col items-center justify-center gap-2"
                    variant="outline"
                >
                    <div className="font-semibold">{layout.name}</div>
                    {layout.skeleton}
                </Button>
            ))}
        </div>
    )
}

export default LayoutSelector

