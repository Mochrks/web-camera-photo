
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Camera, Heart, Share2 } from 'lucide-react';

export default function CTASection() {
    return (
        <>
            <section className="py-16  text-white mt-20 bg-gradient-to-r from-purple-900 to-slate-900  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-bold mb-4"
                        >
                            Capture Your Magical Moments
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-xl mb-8 text-gray-100"
                        >
                            Create unforgettable memories with our professional photobooth experience.
                            Perfect for weddings, parties, corporate events, and special occasions.
                        </motion.p>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center space-x-4">
                            <motion.div

                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="flex items-center gap-2"
                                >
                                    <Camera className="w-5 h-5" />
                                    Book Photobooth
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className=" border-white flex items-center gap-2"
                                >
                                    <Share2 className="w-5 h-5" />
                                    View Packages
                                </Button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mt-8 flex justify-center items-center space-x-2 text-sm"
                        >
                            <Heart className="w-4 h-4 text-red-400" />
                            <span>Trusted by 500+ Happy Clients</span>
                        </motion.div>
                    </motion.div>
                </div>
                <footer className="mt-auto py-6 ">
                    <div className="container mx-auto text-center text-sm text-white">
                        © {new Date().getFullYear()} All rights reserved by{" "}
                        <a href="https://github.com/Mochrks" className="hover:underline text-blue-500">
                            @mochrks
                        </a>
                    </div>
                </footer>
            </section>

        </>
    );
}