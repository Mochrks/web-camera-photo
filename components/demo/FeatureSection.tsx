import { motion } from 'framer-motion';
import { Camera, Edit, Share } from 'lucide-react';

const features = [
    {
        icon: Camera,
        title: 'Professional Photobooth Experience',
        description: 'Studio-quality photos with premium backgrounds and perfect lighting.',
    },
    {
        icon: Edit,
        title: 'Instant Editing',
        description: 'Real-time photo editing with cool filters and creative effects.',
    },
    {
        icon: Share,
        title: 'Seamless Sharing',
        description: 'Instantly share photos on social media or print on-site.',
    },
];

export default function FeatureSection() {
    return (
        <section className="py-16 bg-gray-50">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Photobooth?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <feature.icon className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}