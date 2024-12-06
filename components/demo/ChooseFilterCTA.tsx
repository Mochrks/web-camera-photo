"use client"

import { useState } from 'react'
import { ChevronUp, Settings2 } from 'lucide-react'
import { Button } from '../ui/button'
import { ChooseFilter } from './ChooseFilter';
import React from 'react';

export default function ChooseFilterCTA() {
    const [isOpen, setIsOpen] = useState(false);

    const applyColorChange = () => {
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-24 right-4">
            {isOpen && (
                <div className="mb-4 py-10 bg-white rounded-lg shadow-lg border-2 p-5">
                    <ChooseFilter />
                    <Button
                        onClick={applyColorChange}
                        variant="outline"
                        className="w-full mt-5 px-4 py-2 border-black"
                    >
                        Apply
                    </Button>
                </div>
            )}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-full h-full p-5 cursor-pointer rounded-xl text-white shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
                <Settings2
                    className="w-6 h-6 mr-5"

                />
                <ChevronUp
                    className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </div>
        </div>
    );
}
