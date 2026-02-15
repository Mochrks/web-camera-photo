"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutGrid,
  Menu,
  Bell,
  Search,
  Home,
  Tag,
  Users,
  Sparkles,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import DashboardComponent from "@/components/demo/Dashboard";
import FilterComponent from "@/components/demo/Filter";
import UserComponent from "@/components/demo/User";
import PromoComponent from "@/components/demo/Promo";
import FrameComponent from "@/components/demo/Frame";

export default function CMS() {
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (!isClient) return null;

  const navItems = [
    { name: "Dashboard", icon: Home, key: "dashboard" },
    { name: "Filters & Tones", icon: Sparkles, key: "filter" },
    { name: "Photo Frames", icon: LayoutGrid, key: "frame" },
    { name: "User Management", icon: Users, key: "users" },
    { name: "Promotions", icon: Tag, key: "promo" },
    { name: "Settings", icon: Settings, key: "settings" },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] dark:bg-neutral-950 transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-transform duration-300 lg:relative lg:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
                Booth Admin
              </h1>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.key}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveSection(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                    activeSection === item.key
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 font-medium"
                      : "text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:text-neutral-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  {activeSection === item.key && (
                    <motion.div
                      layoutId="activeDot"
                      className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-8 border-t border-neutral-100 dark:border-neutral-800">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 gap-3 px-4 py-3 rounded-xl"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-8 z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                placeholder="Search everything..."
                className="pl-10 w-80 bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-full"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white dark:border-neutral-900" />
            </Button>
            <div className="h-8 w-px bg-neutral-200 dark:border-neutral-800 hidden sm:block" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium dark:text-white">Admin User</p>
                <p className="text-xs text-neutral-500">Super Admin</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-indigo-100 dark:border-indigo-900">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
                <span>CMS</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  {navItems.find((i) => i.key === activeSection)?.name}
                </span>
              </div>
              <h2 className="text-3xl font-bold dark:text-white tracking-tight">
                {navItems.find((i) => i.key === activeSection)?.name}
              </h2>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none rounded-xl px-6 h-12">
              Download Report
            </Button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden"
            >
              <div className="p-1 sm:p-6">
                {activeSection === "dashboard" && <DashboardComponent />}
                {activeSection === "filter" && <FilterComponent />}
                {activeSection === "frame" && <FrameComponent />}
                {activeSection === "users" && <UserComponent />}
                {activeSection === "promo" && <PromoComponent />}
                {activeSection === "settings" && (
                  <div className="flex items-center justify-center py-20 text-neutral-500">
                    Settings section under development
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
