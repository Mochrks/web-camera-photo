import { useState, useEffect } from 'react'

interface ColorPickerProps {
    color: string
    onChange: (color: string) => void
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
    const [hue, setHue] = useState(0)
    const [saturation, setSaturation] = useState(50)
    const [lightness, setLightness] = useState(50)

    useEffect(() => {
        const hslToHex = (h: number, s: number, l: number) => {
            l /= 100
            const a = s * Math.min(l, 1 - l) / 100
            const f = (n: number) => {
                const k = (n + h / 30) % 12
                const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
                return Math.round(255 * color).toString(16).padStart(2, '0')
            }
            return `#${f(0)}${f(8)}${f(4)}`
        }

        const newColor = hslToHex(hue, saturation, lightness)
        onChange(newColor)
    }, [hue, saturation, lightness, onChange])

    return (
        <div className="flex flex-col space-y-4">
            <div className="w-64 h-32 rounded-lg shadow-inner" style={{ backgroundColor: color }}></div>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Hue</label>
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={(e) => setHue(Number(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-red-600 via-yellow-600 via-green-400 via-blue-500 to-purple-500 rounded-lg appearance-none cursor-pointer"
                />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Saturation</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={saturation}
                    onChange={(e) => setSaturation(Number(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-gray-300 to-red-500 rounded-lg appearance-none cursor-pointer"
                />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Lightness</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={lightness}
                    onChange={(e) => setLightness(Number(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-black via-gray-500 to-white rounded-lg appearance-none cursor-pointer"
                />
            </div>
        </div>
    )
}

