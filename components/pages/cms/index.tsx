"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LayoutGrid, Menu, Bell, Search, Home, Tag, Users, Sparkles, } from 'lucide-react'
import DashboardComponent from '@/components/demo/Dashboard'
import FilterComponent from '@/components/demo/Filter'
import UserComponent from '@/components/demo/User'
import PromoComponent from '@/components/demo/Promo'
import FrameComponent from '@/components/demo/Frame'


export default function CMS() {
    const [isClient, setIsClient] = useState(false)
    const [activeSection, setActiveSection] = useState('dashboard')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        setIsClient(true)

        const handleResize = () => {
            if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                setIsMobileMenuOpen(false)
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize)


            handleResize()


            return () => window.removeEventListener('resize', handleResize)
        }
    }, [])


    if (!isClient) {
        return null
    }

    const navItems = [
        { name: 'Dashboard', icon: Home, key: 'dashboard' },
        { name: 'Filter', icon: Sparkles, key: 'filter' },
        { name: 'Frame', icon: LayoutGrid, key: 'frame' },
        { name: 'User', icon: Users, key: 'users' },
        { name: 'Promo', icon: Tag, key: 'promo' },
    ]

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            {/* Sidebar Component */}
            <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-64 bg-white border-r dark:bg-gray-800 shadow-md overflow-y-auto transition-all duration-200 ease-in-out`}>
                <div className="p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">CMS Dashboard</h1>

                </div>
                <nav className="mt-6">
                    {navItems.map((item) => (
                        <Button
                            key={item.key}
                            variant={activeSection === item.key ? "secondary" : "ghost"}
                            className="w-full justify-start transition-colors duration-200 p-5 hover:bg-gray-200 hover:p-6 dark:hover:bg-gray-700 "
                            onClick={() => {
                                setActiveSection(item.key)
                                setIsMobileMenuOpen(false)
                            }}
                        >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                        </Button>
                    ))}
                </nav>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden bg-white border-b-8">
                {/* Header Component */}
                <header className=" dark:bg-gray-800 shadow-sm z-10 transition-colors duration-200">
                    <div className="max-w-full mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>

                        <div className="flex items-center">
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-80 mr-2 hidden md:block"
                            />
                            <Button size="icon" variant="ghost" className="hidden md:inline-flex">
                                <Search className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="flex items-center">
                            <Button size="icon" variant="ghost" className="mr-2">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Main Content Component */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-200 pt-5">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
                        <h3 className="text-gray-700 dark:text-gray-200 text-2xl sm:text-3xl font-medium mb-6 transition-colors duration-200">
                            {navItems.find(item => item.key === activeSection)?.name}
                        </h3>

                        {activeSection === 'dashboard' && <DashboardComponent />}
                        {activeSection === 'filter' && <FilterComponent />}
                        {activeSection === 'frame' && <FrameComponent />}
                        {activeSection === 'users' && <UserComponent />}
                        {activeSection === 'promo' && <PromoComponent />}
                    </div>
                </main>
            </div>
        </div>
    )
}

