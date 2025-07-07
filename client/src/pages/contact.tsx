import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MessageCircle, Send, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        title: "All Fields Required",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission delay for better UX
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll show a success message
      // In production, you can integrate with Formspree, Netlify Forms, or similar service
      setIsSubmitted(true);
      toast({
        title: "Message Received! 🌟",
        description: "Thanks for your message! For now, please reach out via email at contact@ecotube.com",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly at contact@ecotube.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-comic p-8 text-center comic-shadow border-2 border-green-200 dark:border-green-600"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-20 h-20 mx-auto mb-6 bg-green-200 rounded-full flex items-center justify-center comic-shadow border-4 border-green-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Check className="text-green-800 w-10 h-10" />
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-bold text-green-700 dark:text-green-300 mb-4 font-comic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Message Received! 🌟
            </motion.h2>
            
            <motion.p 
              className="text-green-600 dark:text-green-400 font-nunito mb-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Thanks for your message! Please reach out to us directly at <strong>contact@ecotube.com</strong> for immediate assistance.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button 
                onClick={handleReset}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-comic comic-button-shadow font-comic border-2 border-green-800"
              >
                Send Another Message
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 font-comic">Get in Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-nunito">Have questions or feedback? We'd love to hear from you!</p>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-comic p-8 comic-shadow border-2 border-indigo-200 dark:border-gray-600"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Label className="flex items-center text-lg font-bold text-gray-700 dark:text-gray-200 mb-3 font-comic">
                <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 border-2 border-orange-300">
                  <User className="text-orange-600 w-4 h-4" />
                </span>
                Your Name
              </Label>
              <Input 
                type="text" 
                placeholder="Enter your full name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-comic focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900 font-nunito text-lg transition-all duration-200 bg-gray-50 dark:bg-gray-700"
                required
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Label className="flex items-center text-lg font-bold text-gray-700 dark:text-gray-200 mb-3 font-comic">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 border-2 border-blue-300">
                  <Mail className="text-blue-600 w-4 h-4" />
                </span>
                Email Address
              </Label>
              <Input 
                type="email" 
                placeholder="your.email@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-comic focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900 font-nunito text-lg transition-all duration-200 bg-gray-50 dark:bg-gray-700"
                required
              />
            </motion.div>

            {/* Message Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Label className="flex items-center text-lg font-bold text-gray-700 dark:text-gray-200 mb-3 font-comic">
                <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 border-2 border-green-300">
                  <MessageCircle className="text-green-600 w-4 h-4" />
                </span>
                Your Message
              </Label>
              <Textarea 
                rows={6} 
                placeholder="Tell us what's on your mind..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-comic focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900 font-nunito text-lg transition-all duration-200 resize-none bg-gray-50 dark:bg-gray-700"
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-comic black-button-shadow transition-all duration-200 text-lg font-comic border-2 border-indigo-800 dark:border-indigo-700"
                disabled={isSubmitting}
              >
                <span className="flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 border border-white/30">
                        <Send className="text-white w-4 h-4" />
                      </span>
                      Send Message
                    </>
                  )}
                </span>
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
