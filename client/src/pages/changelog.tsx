import { motion } from "framer-motion";
import { Star, Rocket, Bug, Plus, Zap, Smartphone, Leaf, Palette, Shield, Cog, Wrench, TrendingUp, Globe } from "lucide-react";

export default function Changelog() {
  const versions = [
    {
      version: "2.1.0",
      date: "January 15, 2024",
      icon: Star,
      bgColor: "bg-red-200",
      iconColor: "text-red-800",
      badge: "Latest",
      badgeColor: "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-100",
      changes: [
        { icon: Plus, text: "Added 320kbps premium quality option", bgColor: "bg-green-200", iconColor: "text-green-800" },
        { icon: Zap, text: "40% faster conversion speeds", bgColor: "bg-orange-200", iconColor: "text-orange-800" },
        { icon: Smartphone, text: "Improved mobile interface", bgColor: "bg-blue-200", iconColor: "text-blue-800" },
        { icon: Leaf, text: "Reduced server energy consumption by 25%", bgColor: "bg-red-200", iconColor: "text-red-800" }
      ]
    },
    {
      version: "2.0.0",
      date: "December 1, 2023",
      icon: Rocket,
      bgColor: "bg-blue-200",
      iconColor: "text-blue-800",
      changes: [
        { icon: Palette, text: "Complete UI redesign with eco-comic theme", bgColor: "bg-orange-200", iconColor: "text-orange-800" },
        { icon: Shield, text: "Enhanced security and privacy protection", bgColor: "bg-green-200", iconColor: "text-green-800" },
        { icon: Cog, text: "Backend optimization for better performance", bgColor: "bg-purple-200", iconColor: "text-purple-800" }
      ]
    },
    {
      version: "1.5.2",
      date: "November 10, 2023",
      icon: Bug,
      bgColor: "bg-orange-200",
      iconColor: "text-orange-800",
      changes: [
        { icon: Wrench, text: "Fixed conversion errors for long videos", bgColor: "bg-pink-200", iconColor: "text-pink-800" },
        { icon: TrendingUp, text: "Improved conversion success rate to 99.8%", bgColor: "bg-blue-200", iconColor: "text-blue-800" },
        { icon: Globe, text: "Added support for more YouTube URL formats", bgColor: "bg-green-200", iconColor: "text-green-800" }
      ]
    }
  ];

  return (
    <section className="py-12 bg-forest-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-forest-700 dark:text-gray-200 mb-4 font-comic">Changelog</h2>
          <p className="text-xl text-forest-600 dark:text-gray-400 font-nunito">Latest updates and improvements</p>
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {versions.map((version, index) => (
            <motion.div
              key={version.version}
              className="bg-white dark:bg-black rounded-comic p-6 comic-shadow border-2 border-black dark:border-white hover:shadow-[12px_12px_0px_rgba(74,124,89,0.4)] dark:hover:shadow-[6px_6px_0px_rgba(59,130,246,0.8)] transition-all duration-100 ease-out"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.1, ease: "easeOut" }
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <motion.div 
                    className={`w-12 h-12 ${version.bgColor} rounded-full flex items-center justify-center mr-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <version.icon className={`${version.iconColor} w-6 h-6`} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-forest-700 dark:text-gray-200 font-comic">Version {version.version}</h3>
                    <p className="text-forest-500 dark:text-gray-400 font-nunito">Released: {version.date}</p>
                  </div>
                </div>
                {version.badge && (
                  <motion.span 
                    className={`${version.badgeColor} px-3 py-1 rounded-full text-sm font-bold`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    {version.badge}
                  </motion.span>
                )}
              </div>
              
              <motion.ul 
                className="text-forest-600 dark:text-gray-400 font-nunito space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                {version.changes.map((change, changeIndex) => (
                  <motion.li 
                    key={changeIndex}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 + changeIndex * 0.05 }}
                  >
                    <span className={`w-6 h-6 ${change.bgColor} rounded-full flex items-center justify-center mr-2`}>
                      <change.icon className={`${change.iconColor} w-3 h-3`} />
                    </span>
                    {change.text}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
