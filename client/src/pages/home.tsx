import { motion } from "framer-motion";
import { Music, Rocket, Shield, Leaf } from "lucide-react";
import ConversionForm from "@/components/conversion/conversion-form";

export default function Home() {
  const features = [
    {
      icon: Rocket,
      title: "Lightning Fast",
      description: "Convert videos in seconds with our optimized processing",
      iconColor: "text-blue-700",
      bgColor: "bg-blue-200"
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "Your data is never stored. Convert and download instantly",
      iconColor: "text-green-700",
      bgColor: "bg-green-200"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Powered by green energy and optimized for efficiency",
      iconColor: "text-orange-700",
      bgColor: "bg-orange-200"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-cream to-forest-100 dark:from-black dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-16 h-16 mx-auto mb-6 bg-forest-200 dark:bg-black rounded-full flex items-center justify-center comic-shadow border-4 border-forest-300 dark:border-white"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Music className="text-forest-800 dark:text-white w-8 h-8" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl font-bold text-forest-700 dark:text-white mb-4 font-comic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            YouTube to MP3
          </motion.h2>
          
          <motion.p 
            className="text-xl text-forest-600 dark:text-gray-400 font-nunito max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Fast YouTube to MP3 conversion! ⚡
          </motion.p>
        </motion.div>

        {/* Conversion Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ConversionForm />
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white dark:bg-black rounded-comic p-6 comic-shadow text-center border-2 border-black dark:border-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "12px 12px 0px rgba(74, 124, 89, 0.4)",
                transition: { duration: 0.1, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 ${feature.bgColor} rounded-full flex items-center justify-center comic-shadow`}>
                <feature.icon className={`${feature.iconColor} w-8 h-8`} />
              </div>
              <h3 className="text-lg font-bold text-forest-700 dark:text-white mb-2 font-comic">{feature.title}</h3>
              <p className="text-forest-600 dark:text-gray-300 font-nunito">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
