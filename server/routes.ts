import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema, convertRequestSchema } from "@shared/schema";
import { z } from "zod";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Track active file sessions for cleanup
const activeFiles = new Map<string, { filePath: string; timestamp: number }>();

// Cleanup old files every 10 minutes
setInterval(() => {
  const now = Date.now();
  const tenMinutes = 10 * 60 * 1000;
  
  for (const [sessionId, fileInfo] of activeFiles.entries()) {
    if (now - fileInfo.timestamp > tenMinutes) {
      // Delete the file if it still exists
      if (fs.existsSync(fileInfo.filePath)) {
        fs.unlink(fileInfo.filePath, () => {});
      }
      activeFiles.delete(sessionId);
    }
  }
}, 5 * 60 * 1000); // Check every 5 minutes

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(validatedData);
      res.json({ success: true, message: "Message sent successfully!", id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ success: false, error: "Failed to save message" });
      }
    }
  });

  // YouTube to MP3 conversion endpoint
  app.post("/api/convert", async (req, res) => {
    try {
      const validatedData = convertRequestSchema.parse(req.body);
      
      // Create temporary directory for downloads
      const tempDir = path.join(__dirname, '../temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const outputPath = path.join(tempDir, `audio_${timestamp}.%(ext)s`);
      
      // Optimized download strategies for speed
      const downloadStrategies = [
        // Strategy 1: Fastest with Python yt-dlp - optimized for speed
        {
          command: '/home/runner/workspace/.pythonlibs/bin/python',
          args: [
            '-m', 'yt_dlp',
            '--extract-audio',
            '--audio-format', 'mp3',
            '--audio-quality', validatedData.quality.replace('k', ''),
            '--output', outputPath,
            '--no-playlist',
            '--ignore-errors',
            '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            '--referer', 'https://www.youtube.com/',
            '--no-check-certificate',
            // Speed optimizations
            '--concurrent-fragments', '8',
            '--extractor-retries', '2',
            '--fragment-retries', '2',
            '--retry-sleep', '1',
            '--no-part',
            '--no-mtime',
            '--format', 'bestaudio[ext=m4a]/bestaudio[ext=webm]/bestaudio',
            '--postprocessor-args', 'ffmpeg:-ac 2 -threads 0',
            '--embed-thumbnail',
            '--no-embed-info-json',
            validatedData.url
          ]
        },
        // Strategy 2: Fast system yt-dlp with speed optimizations
        {
          command: 'yt-dlp',
          args: [
            '--extract-audio',
            '--audio-format', 'mp3',
            '--audio-quality', validatedData.quality.replace('k', ''),
            '--output', outputPath,
            '--no-playlist',
            '--ignore-errors',
            '--user-agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            '--referer', 'https://www.youtube.com/',
            '--no-check-certificate',
            // Speed optimizations
            '--concurrent-fragments', '6',
            '--extractor-retries', '2',
            '--fragment-retries', '2',
            '--retry-sleep', '1',
            '--no-part',
            '--no-mtime',
            '--format', 'bestaudio[ext=m4a]/bestaudio[ext=webm]/bestaudio',
            '--postprocessor-args', 'ffmpeg:-ac 2 -threads 0',
            validatedData.url
          ]
        },
        // Strategy 3: Fallback with minimal options for maximum compatibility
        {
          command: 'yt-dlp',
          args: [
            '--extract-audio',
            '--audio-format', 'mp3',
            '--audio-quality', validatedData.quality.replace('k', ''),
            '--output', outputPath,
            '--no-playlist',
            '--ignore-errors',
            '--concurrent-fragments', '4',
            '--extractor-retries', '1',
            '--fragment-retries', '1',
            '--no-part',
            validatedData.url
          ]
        }
      ];

      let currentStrategy = 0;

      function tryDownload() {
        if (currentStrategy >= downloadStrategies.length) {
          return res.status(500).json({ 
            success: false, 
            error: "All conversion methods failed. YouTube may be blocking requests temporarily. Please try again later." 
          });
        }

        const strategy = downloadStrategies[currentStrategy];
        const ytDlp = spawn(strategy.command, strategy.args);
        let videoTitle = '';
        let error = '';

        ytDlp.stdout.on('data', (data) => {
          const output = data.toString();
          // Extract title from yt-dlp output
          const titleMatch = output.match(/\[download\] Destination: (.+)/);
          if (titleMatch) {
            videoTitle = path.basename(titleMatch[1], '.mp3');
          }
        });

        ytDlp.stderr.on('data', (data) => {
          error += data.toString();
        });

        ytDlp.on('close', (code) => {
          if (code === 0) {
            // Find the generated file
            const files = fs.readdirSync(tempDir).filter(f => f.startsWith(`audio_${timestamp}`));
            if (files.length > 0) {
              const filePath = path.join(tempDir, files[0]);
              
              // Track the file for cleanup
              const sessionId = `session_${timestamp}`;
              activeFiles.set(sessionId, { 
                filePath, 
                timestamp: Date.now() 
              });
              
              // Serve the file for download
              res.download(filePath, `${videoTitle || 'audio'}.mp3`, (err) => {
                if (err) {
                  console.error('Download error:', err);
                }
                // Schedule file cleanup after 30 seconds to allow download completion
                setTimeout(() => {
                  if (fs.existsSync(filePath)) {
                    fs.unlink(filePath, () => {});
                  }
                  activeFiles.delete(sessionId);
                }, 30000);
              });
            } else {
              res.status(500).json({ 
                success: false, 
                error: "Conversion completed but file not found" 
              });
            }
          } else {
            console.error(`Strategy ${currentStrategy + 1} (${strategy.command}) failed:`, error);
            // Check for specific YouTube blocking errors
            if (error.includes('HTTP Error 403') || error.includes('nsig extraction failed')) {
              return res.status(429).json({ 
                success: false, 
                error: "YouTube is currently blocking download requests. This is a temporary issue affecting many YouTube downloaders. Please try again later or use a different video.",
                details: "YouTube has implemented stronger anti-bot measures recently."
              });
            }
            currentStrategy++;
            tryDownload(); // Try next strategy
          }
        });
      }

      tryDownload();

    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          error: "Invalid request data", 
          details: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: "Internal server error" 
        });
      }
    }
  });

  // Get video info endpoint (for title preview)
  app.post("/api/video-info", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ success: false, error: "URL is required" });
      }

      const ytDlp = spawn('yt-dlp', [
        '--get-title', 
        '--get-duration',
        '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        '--referer', 'https://www.youtube.com/',
        '--add-header', 'Accept-Language:en-US,en;q=0.9',
        '--no-check-certificate',
        url
      ]);
      let output = '';
      let error = '';

      ytDlp.stdout.on('data', (data) => {
        output += data.toString();
      });

      ytDlp.stderr.on('data', (data) => {
        error += data.toString();
      });

      ytDlp.on('close', (code) => {
        if (code === 0) {
          const lines = output.trim().split('\n');
          res.json({ 
            success: true, 
            title: lines[0] || 'Unknown Title',
            duration: lines[1] || 'Unknown Duration'
          });
        } else {
          res.status(400).json({ 
            success: false, 
            error: "Could not get video information" 
          });
        }
      });

    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: "Failed to get video information" 
      });
    }
  });

  // Cleanup endpoint for manual cleanup when page is refreshed/closed
  app.post("/api/cleanup", async (req, res) => {
    try {
      const tempDir = path.join(__dirname, '../temp');
      if (fs.existsSync(tempDir)) {
        const files = fs.readdirSync(tempDir);
        let cleanedCount = 0;
        
        files.forEach(file => {
          const filePath = path.join(tempDir, file);
          const stats = fs.statSync(filePath);
          const now = Date.now();
          const fiveMinutes = 5 * 60 * 1000;
          
          // Delete files older than 5 minutes
          if (now - stats.mtime.getTime() > fiveMinutes) {
            fs.unlink(filePath, () => {});
            cleanedCount++;
          }
        });
        
        res.json({ success: true, cleaned: cleanedCount });
      } else {
        res.json({ success: true, cleaned: 0 });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: "Cleanup failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
