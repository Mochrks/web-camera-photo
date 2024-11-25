import React from 'react'
import { Button } from '@/components/ui/button'

interface LayoutSelectorProps {
    onSelect: (layout: number) => void
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ onSelect }) => {
    const layouts = [
        { id: 1, name: 'Classic Vertical', icon: '📸' },
        { id: 2, name: 'Modern Grid', icon: '🖼️' },
        { id: 3, name: 'Polaroid Style', icon: '🏞️' },
    ]

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-4xl w-full">
            {layouts.map((layout) => (
                <Button
                    key={layout.id}
                    onClick={() => onSelect(layout.id)}
                    className="h-40 text-lg font-semibold flex flex-col items-center justify-center gap-2"
                    variant="outline"
                >
                    <span className="text-4xl">{layout.icon}</span>
                    {layout.name}
                </Button>
            ))}
        </div>
    )
}

export default LayoutSelector

