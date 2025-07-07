import { motion } from "framer-motion";
import { FileText, Users, AlertTriangle, Copyright, Gavel, Leaf, Clock } from "lucide-react";

export default function Terms() {
  // Debug log to verify component is loading
  console.log("Terms component is loading...");

  const sections = [
    {
      icon: Users,
      title: "Acceptance of Terms",
      content: "By using EcoTube, you agree to these Terms of Service. If you don't agree with any part of these terms, please don't use our service. We may update these terms occasionally, and continued use means you accept any changes.",
      iconColor: "text-blue-800",
      bgColor: "bg-blue-200"
    },
    {
      icon: FileText,
      title: "Service Description",
      content: "EcoTube provides YouTube to MP3 conversion services for personal use only. Our service extracts audio from YouTube videos and provides download links. We aim for 99% uptime but cannot guarantee uninterrupted service.",
      iconColor: "text-green-800",
      bgColor: "bg-green-200"
    },
    {
      icon: Clock,
      title: "Temporary File Storage",
      content: "All converted files are temporarily stored on our servers and automatically deleted within 10 minutes of creation or 30 seconds after download completion. Files are NOT permanently stored or backed up. Upon page refresh, browser closure, or session end, any unconverted files are immediately deleted. We do not retain any uploaded or converted content.",
      iconColor: "text-indigo-800",
      bgColor: "bg-indigo-200"
    },
    {
      icon: Copyright,
      title: "Copyright & Legal Use",
      content: "You are responsible for ensuring you have the right to download and convert content. Only convert videos you own or have permission to use. Respect copyright laws and YouTube's Terms of Service. EcoTube is not liable for misuse.",
      iconColor: "text-red-800",
      bgColor: "bg-red-200"
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Activities",
      content: "Do not use our service for commercial purposes, bulk downloading, copyright infringement, or any illegal activities. We prohibit automated tools, excessive usage that impacts service quality, and malicious behavior.",
      iconColor: "text-orange-800",
      bgColor: "bg-orange-200"
    },
    {
      icon: Gavel,
      title: "Limitation of Liability",
      content: "EcoTube is provided 'as is' without warranties. We are not liable for any damages, data loss, or legal issues arising from service use. Our liability is limited to the maximum extent permitted by law.",
      iconColor: "text-purple-800",
      bgColor: "bg-purple-200"
    },
    {
      icon: Leaf,
      title: "Environmental Commitment",
      content: "Our servers run on renewable energy as part of our eco-friendly mission. By using EcoTube, you support sustainable technology practices. We continuously work to minimize our environmental impact.",
      iconColor: "text-green-800",
      bgColor: "bg-green-200"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-cream to-forest-100 dark:bg-gradient-to-br dark:from-black dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-blue-200 rounded-full flex items-center justify-center comic-shadow border-4 border-blue-400">
            <FileText className="text-blue-800 w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold text-forest-700 dark:text-white mb-4 font-comic">Terms of Service</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-nunito">Simple, fair terms for using our eco-friendly conversion service.</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-nunito mt-2">Last updated: January 2024</p>
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-black rounded-comic p-6 comic-shadow border-2 border-black dark:border-white"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.01,
                boxShadow: "12px 12px 0px rgba(74, 124, 89, 0.4)",
                transition: { duration: 0.1, ease: "easeOut" }
              }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${section.bgColor} rounded-full flex items-center justify-center comic-shadow flex-shrink-0`}>
                  <section.icon className={`${section.iconColor} w-6 h-6`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-forest-700 dark:text-white mb-3 font-comic">{section.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-nunito leading-relaxed">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-blue-50 dark:bg-black border-2 border-black dark:border-white rounded-comic p-6 comic-shadow">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2 font-comic">Contact Information</h3>
            <p className="text-blue-600 dark:text-blue-400 font-nunito">
              For questions about these terms, contact us at <a href="mailto:legal@ecotube.com" className="font-semibold hover:text-blue-800 dark:hover:text-blue-200 transition-colors">legal@ecotube.com</a>
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-black border-2 border-black dark:border-white rounded-comic p-6 comic-shadow">
            <h3 className="text-lg font-bold text-green-700 dark:text-green-300 mb-2 font-comic">Fair Use Reminder</h3>
            <p className="text-green-600 dark:text-green-400 font-nunito">
              Please use EcoTube responsibly and respect content creators' rights. Our service is designed for personal, legal use only.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}