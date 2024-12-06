import React from 'react'
import { Button } from '@/components/ui/button'
import { BackgroundGradient } from '../ui/background-gradient';
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { Vortex } from '../ui/vortex';
import { NeonGradientCard } from '../ui/neon-gradient-card';

interface LayoutSelectorProps {
    onSelect: (layout: number) => void
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ onSelect }) => {
    const layouts = [
        {
            id: 1,
            name: 'Classic Vertical Style',
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
            name: 'Pattern Style',
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
        {
            id: 4,
            name: 'Minimalist Style',
            skeleton: (
                <div className="w-full h-40 bg-gray-200 flex space-x-2 justify-center items-center">
                    <div className="w-1/2 h-1/2 bg-gradient-to-r from-gray-300 to-gray-600 rounded-lg"></div>
                </div>
            ),
        },
        {
            id: 5,
            name: 'Circle Kodak Potra-400 Style',
            skeleton: (
                <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex space-x-4 justify-center items-center p-4 rounded-lg">
                    {/* Circle with gradient and shadow */}
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-400 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full blur-sm absolute"></div>
                    </div>


                </div>
            ),
        },
        {
            id: 6,
            name: 'Vintage Grid Style',
            skeleton: (
                <div className="w-full h-40 bg-gray-200 flex justify-center items-center">
                    <div className="w-11/12 h-1/2 bg-white border-4 border-gray-300 flex space-x-2">
                        <div className="w-1/3 bg-gray-100"></div>
                        <div className="w-1/3 bg-gray-200"></div>
                        <div className="w-1/3 bg-gray-300"></div>
                    </div>
                </div>
            ),
        }
    ];

    const words = `Choose Your Layout`;
    return (
        <Vortex className='w-full h-full flex flex-col gap-5'>
            <div className='flex justify-center p-5'>
                <TextGenerateEffect words={words} />
            </div>
            <NeonGradientCard>
                <BackgroundGradient className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-4xl w-full rounded-xl p-10">
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
                </BackgroundGradient>
            </NeonGradientCard>
        </Vortex>
    )
}

export default LayoutSelector

