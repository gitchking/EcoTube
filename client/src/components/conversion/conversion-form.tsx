import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Link as WouterLink } from "wouter";
import { Link, Zap, Sliders, Music, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import LoadingSpinner from "@/components/ui/loading-spinner";
import ConversionResult from "./conversion-result";

export default function ConversionForm() {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("128k");
  const [conversionResult, setConversionResult] = useState<any>(null);
  const { toast } = useToast();

  const convertMutation = useMutation({
    mutationFn: async (data: { url: string; quality: string }) => {
      const response = await apiRequest("POST", "/api/convert", data);

      if (response.headers.get('content-type')?.includes('audio')) {
        // If the response is audio file, create a download URL
        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        return { 
          success: true, 
          downloadUrl,
          title: `YouTube Audio - ${quality}` 
        };
      } else {
        return await response.json();
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        setConversionResult(data);
        toast({
          title: "Conversion Complete! 🎉",
          description: "Your MP3 is ready for download.",
        });
      } else {
        setConversionResult({
          success: false,
          error: data.error || "An error occurred during conversion.",
          details: data.details
        });
      }
    },
    onError: (error: any) => {
      setConversionResult({
        success: false,
        error: error.message || "Please check the URL and try again."
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a YouTube URL.",
        variant: "destructive",
      });
      return;
    }

    setConversionResult(null);
    convertMutation.mutate({ url, quality });
  };

  const handleReset = () => {
    setUrl("");
    setQuality("128k");
    setConversionResult(null);
  };

  if (convertMutation.isPending) {
    return <LoadingSpinner />;
  }

  if (conversionResult) {
    return <ConversionResult result={conversionResult} onReset={handleReset} />;
  }

  return (
    <motion.div 
      className="bg-white dark:bg-black rounded-comic p-8 comic-shadow max-w-2xl mx-auto border-2 border-black dark:border-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL Input */}
        <div>
          <Label className="flex items-center text-lg font-bold text-forest-700 dark:text-white mb-3 font-comic">
            <span className="w-8 h-8 bg-orange-200 dark:bg-orange-600 rounded-full flex items-center justify-center mr-3">
              <Link className="text-orange-800 dark:text-orange-200 w-4 h-4" />
            </span>
            Paste YouTube URL
          </Label>
          <div className="relative">
            <Input 
              type="url" 
              placeholder="https://www.youtube.com/watch?v=..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-4 border-3 border-orange-300 dark:border-orange-500 rounded-comic focus:border-orange-500 dark:focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-900 font-nunito text-3xl bg-white dark:bg-black text-black dark:text-white transition-all duration-150 ease-out h-16"
              required
            />
          </div>
        </div>

        {/* Quality Selection */}
        <div>
          <Label className="flex items-center text-lg font-bold text-forest-700 dark:text-white mb-3 font-comic">
            <span className="w-8 h-8 bg-blue-200 dark:bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <Sliders className="text-blue-800 dark:text-blue-200 w-4 h-4" />
            </span>
            Audio Quality
          </Label>
          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger className="w-full px-4 py-4 border-3 border-blue-300 dark:border-blue-400 rounded-comic focus:border-blue-500 dark:focus:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-600 font-nunito text-lg bg-white dark:bg-black text-black dark:text-white transition-all duration-150 ease-out h-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="64k">64 kbps - Small file size</SelectItem>
              <SelectItem value="128k">128 kbps - Good quality</SelectItem>
              <SelectItem value="192k">192 kbps - High quality</SelectItem>
              <SelectItem value="256k">256 kbps - Very high quality</SelectItem>
              <SelectItem value="320k">320 kbps - Premium quality</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Convert Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-comic black-button-shadow transition-all duration-200 text-xl font-comic border-2 border-green-800 dark:border-blue-800"
            disabled={convertMutation.isPending}
          >
            <>
              <Music className="text-white w-5 h-5" />
              <span className="font-bold text-white">Convert</span>
            </>
          </Button>
        </motion.div>

        {/* Temporary Storage Hint */}
        <motion.div
          className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-comic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
            <Clock className="w-4 h-4" />
            <p className="text-sm font-medium">
              Files are temporarily stored and automatically deleted after download. See our{" "}
              <WouterLink href="/terms">
                <span 
                  className="underline hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer transition-colors"
                  onClick={(e) => {
                    // Debug log to verify click is working
                    console.log("Terms of Service link clicked");
                  }}
                >
                  Terms of Service
                </span>
              </WouterLink> for details.
            </p>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}