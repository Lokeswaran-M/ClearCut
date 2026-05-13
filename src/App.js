import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Download, 
  Image as ImageIcon, 
  Scissors, 
  Zap,
  Sun,
  Moon,
  Sparkles,
  Maximize2,
  AlertCircle,
  CheckCircle2,
  Info,
  RotateCw,
  Shield,
  Wand2,
  Layers,
  Crown,
  Star,
  Coffee,
  ArrowRight,
  Palette,
  Grid,
  Heart,
  Smile,
  ZapIcon,
  Rocket,
  Gem,
  Infinity,
  Lightbulb,
  Eye,
  RefreshCw,
  Lock,
  BadgeCheck,
  Circle
} from 'lucide-react';

// ==================== Utility Functions ====================

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const compressImage = async (file, maxWidth = 1920, maxHeight = 1920, quality = 0.9) => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (maxHeight / height) * width;
        height = maxHeight;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        resolve(blob);
      }, file.type, quality);
    };
    
    reader.readAsDataURL(file);
  });
};

// ==================== New Theme: Soft Gradient Glass Morphism ====================

const theme = {
  light: {
    bg: 'bg-gradient-to-br from-slate-50 via-rose-50 to-purple-50',
    card: 'bg-white/70 backdrop-blur-xl border border-white/50',
    cardHover: 'hover:bg-white/90 hover:shadow-2xl',
    text: 'text-slate-800',
    textSecondary: 'text-slate-500',
    accent: 'from-rose-500 to-purple-600',
    accent2: 'from-amber-400 to-orange-500',
    accent3: 'from-emerald-400 to-teal-500',
    button: 'bg-gradient-to-r from-rose-500 to-purple-600',
    buttonText: 'text-white',
    border: 'border-slate-200/50',
    glassCard: 'bg-white/40 backdrop-blur-md border border-white/60',
    shadow: 'shadow-[0_8px_32px_rgba(0,0,0,0.06)]',
    highlight: 'from-rose-100 to-purple-100',
    muted: 'bg-slate-100/80',
    success: 'bg-emerald-50 border-emerald-200',
    error: 'bg-rose-50 border-rose-200',
    warning: 'bg-amber-50 border-amber-200',
  },
  dark: {
    bg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950',
    card: 'bg-slate-900/70 backdrop-blur-xl border border-slate-700/50',
    cardHover: 'hover:bg-slate-800/90 hover:shadow-2xl',
    text: 'text-slate-100',
    textSecondary: 'text-slate-400',
    accent: 'from-rose-400 to-purple-500',
    accent2: 'from-amber-300 to-orange-400',
    accent3: 'from-emerald-300 to-teal-400',
    button: 'bg-gradient-to-r from-rose-500 to-purple-600',
    buttonText: 'text-white',
    border: 'border-slate-700/50',
    glassCard: 'bg-slate-800/40 backdrop-blur-md border border-slate-700/60',
    shadow: 'shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
    highlight: 'from-rose-900/30 to-purple-900/30',
    muted: 'bg-slate-800/80',
    success: 'bg-emerald-900/30 border-emerald-800/50',
    error: 'bg-rose-900/30 border-rose-800/50',
    warning: 'bg-amber-900/30 border-amber-800/50',
  }
};

// ==================== Sub-Components with New Theme ====================

const DropZone = ({ onFileDrop, isProcessing, isDarkMode }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const t = isDarkMode ? theme.dark : theme.light;

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileDrop(e.dataTransfer.files[0]);
    }
  }, [onFileDrop]);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileDrop(e.target.files[0]);
    }
  }, [onFileDrop]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`
        relative rounded-[2.5rem] p-14 
        transition-all duration-700 cursor-pointer group
        ${t.glassCard}
        ${isDragActive 
          ? 'border-rose-300 dark:border-rose-600 scale-[1.03] shadow-2xl' 
          : 'border-slate-200/60 dark:border-slate-700/60 hover:border-rose-300 hover:scale-[1.02]'
        }
        ${isDragActive ? t.shadow : 'shadow-lg hover:shadow-2xl'}
      `}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      
      <div className="text-center relative z-0">
        <motion.div
          animate={{ 
            y: isDragActive ? -12 : 0,
            scale: isDragActive ? 1.15 : 1,
            rotate: isDragActive ? 360 : 0
          }}
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
          className="mx-auto w-28 h-28 mb-8 relative"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${t.accent} rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity`} />
          <div className={`relative w-full h-full bg-gradient-to-br ${t.accent} rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:shadow-rose-500/30 transition-shadow`}>
            {isProcessing ? (
              <RotateCw className="w-14 h-14 text-white animate-spin" />
            ) : isDragActive ? (
              <Sparkles className="w-14 h-14 text-white" />
            ) : (
              <Upload className="w-14 h-14 text-white" />
            )}
          </div>
        </motion.div>
        
        <motion.h3 
          className={`text-3xl font-bold mb-4 ${t.text}`}
          animate={{ scale: isDragActive ? 1.05 : 1 }}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8" />
              Creating Magic...
            </span>
          ) : isDragActive ? (
            <span className="flex items-center justify-center gap-2">
              Drop It Like It's Hot!
            </span>
          ) : (
            'Drop Your Image Here'
          )}
        </motion.h3>
        
        <p className={`text-lg mb-6 ${t.textSecondary}`}>
          or click anywhere to browse • PNG, JPG, WEBP
        </p>
        
<div className="
inline-flex items-center gap-3
px-6 py-3
rounded-full
bg-white/15
dark:bg-slate-900/20
backdrop-blur-2xl
border border-white/20
shadow-[0_8px_32px_rgba(0,0,0,0.12)]
">
  <span className="text-sm font-medium text-white">
    Private & Secure Processing
  </span>
</div>
      </div>

    </motion.div>
  );
};

const ImagePreview = ({ originalImage, processedImage, onReset, isDarkMode }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const t = isDarkMode ? theme.dark : theme.light;
  
  const downloadImage = useCallback(async () => {
    if (!processedImage) return;
    setIsDownloading(true);
    
    try {
      const response = await fetch(processedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `clean-bg-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  }, [processedImage]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`${t.card} rounded-[2.5rem] overflow-hidden ${t.shadow}`}
    >
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-8 border-b ${t.border} ${t.muted}`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${t.accent} rounded-2xl flex items-center justify-center shadow-lg`}>
            <Grid className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${t.text}`}>
              {processedImage ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Background Removed
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <ImageIcon className="w-6 h-6" />
                  Image Preview
                </span>
              )}
            </h2>
            <p className={`text-sm ${t.textSecondary}`}>
              {processedImage ? 'Your masterpiece is ready!' : 'Processing...'}
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowOriginal(!showOriginal)}
            className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/10 backdrop-blur-sm text-sm font-semibold ${t.text} border ${t.border} transition-all duration-300 hover:shadow-lg`}
          >
            {showOriginal ? 'Show Result' : 'Compare Original'}
          </motion.button>
          
          {processedImage && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadImage}
              disabled={isDownloading}
              className={`flex-1 sm:flex-none px-8 py-3 rounded-2xl bg-gradient-to-r ${t.accent} ${t.buttonText} text-sm font-semibold shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2`}
            >
              {isDownloading ? (
                <RotateCw className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              Download HD
            </motion.button>
          )}
        </div>
      </div>

      <div className="relative p-8">
        <div className="checkerboard-bg rounded-3xl overflow-hidden shadow-inner">
          <motion.div
            animate={{ scale: zoom }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative w-full min-h-[400px] flex items-center justify-center p-6"
          >
            <img
              src={showOriginal ? originalImage : processedImage || originalImage}
              alt={showOriginal ? 'Original' : 'Processed'}
              className="max-w-full max-h-[650px] object-contain rounded-2xl"
            />
          </motion.div>
        </div>

        {/* Zoom Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-12 right-12 flex gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-2 border border-white/50 dark:border-slate-700/50"
        >
          <button
            onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-lg font-bold text-slate-700 dark:text-slate-300 transition-colors"
          >
            −
          </button>
          <button
            onClick={() => setZoom(1)}
            className="px-5 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors min-w-[70px]"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={() => setZoom(z => Math.min(3, z + 0.25))}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-lg font-bold text-slate-700 dark:text-slate-300 transition-colors"
          >
            +
          </button>
        </motion.div>
      </div>

      <div className="px-8 pb-8 space-y-4">
        {!processedImage && (
          <div className={`${t.warning} rounded-2xl p-6`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-800/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <RotateCw className="w-6 h-6 text-amber-600 dark:text-amber-400 animate-spin" />
              </div>
              <div>
                <p className="font-semibold text-amber-800 dark:text-amber-300 text-lg">
                  Processing in Progress
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-2">
                  Our AI is working its magic. This usually takes 10-30 seconds.
                </p>
              </div>
            </div>
          </div>
        )}

        {processedImage && (
          <div className={`${t.success} rounded-2xl p-6`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100/10 dark:bg-emerald-300/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-emerald-800 dark:text-emerald-500 text-lg">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Perfect! Background Removed
                  </span>
                </p>
                <p className="text-sm text-emerald-700 dark:text-emerald-500 mt-2">
                  Your image is ready. Download it in high quality!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
          <p className={`text-sm ${t.textSecondary} flex items-center gap-2`}>
            <Lightbulb className="w-4 h-4" />
            Try comparing with the original
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className={`px-6 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/10 backdrop-blur-sm text-sm font-semibold ${t.text} border ${t.border} transition-all duration-300 hover:shadow-lg flex items-center gap-2`}
          >
            <RefreshCw className="w-4 h-4" />
            New Image
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ProcessingOverlay = ({ progress }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50/98 via-rose-50/98 to-purple-50/98 dark:from-slate-950/98 dark:via-slate-900/98 dark:to-purple-950/98 backdrop-blur-2xl"
    >
      <div className="text-center space-y-10 max-w-lg mx-auto px-8">
        {/* Animated Logo */}
        <motion.div className="relative">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.15, 1]
            }}
            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity }
            }}
            className="mx-auto w-32 h-32 bg-gradient-to-br from-rose-500 via-purple-500 to-amber-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-purple-500/40"
          >
            <Wand2 className="w-16 h-16 text-white" />
          </motion.div>
          
          {/* Orbiting particles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-rose-400 rounded-full blur-sm" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full blur-sm" />
          </motion.div>
        </motion.div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="w-full h-5 bg-slate-200/80 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner backdrop-blur-sm">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 rounded-full relative overflow-hidden"
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </motion.div>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-3">
<h3
  className="
    text-3xl font-bold
    bg-gradient-to-r
    from-rose-500 via-fuchsia-500 to-purple-600
    dark:from-rose-400 dark:via-pink-400 dark:to-purple-400
    bg-clip-text text-transparent
    inline-flex items-center justify-center gap-3
  "
>
{progress < 30 && (
  <>
    <Rocket className="w-8 h-8 text-rose-500 dark:text-rose-400" />
    Initializing AI...
  </>
)}
            {progress >= 30 && progress < 60 && (
              <>
<Eye className="w-8 h-8 text-purple-500 dark:text-purple-400" />
                Analyzing Image...
              </>
            )}
            {progress >= 60 && progress < 90 && (
              <>
<Scissors className="w-8 h-8 text-pink-500 dark:text-pink-400" />
                Removing Background...
              </>
            )}
            {progress >= 90 && (
              <>
<Sparkles className="w-8 h-8 text-amber-500 dark:text-amber-400" />
                Finalizing Magic...
              </>
            )}
          </h3>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            {progress < 30 && "Preparing the neural network (one-time setup ~40MB)"}
            {progress >= 30 && progress < 60 && "Detecting edges, objects, and fine details"}
            {progress >= 60 && progress < 90 && "Precision pixel processing in progress"}
            {progress >= 90 && "Almost ready! Creating your perfect image..."}
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 dark:border-slate-700/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4"/>
                100% Private Processing
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Your image stays on your device. Nothing is ever uploaded to any server.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Header = ({ isDarkMode, onToggleDarkMode }) => {
  const t = isDarkMode ? theme.dark : theme.light;

  return (
    <header className={`sticky top-0 z-40 ${t.glassCard} border-b ${t.border} shadow-sm supports-[backdrop-filter]:backdrop-blur-xl`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.div
              whileHover={{ rotate: -10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`w-14 h-14 bg-gradient-to-br ${t.accent} rounded-2xl flex items-center justify-center shadow-xl shadow-rose-500/20`}
            >
              <Palette className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h1 className={`text-3xl font-black bg-gradient-to-r ${t.accent} bg-clip-text text-transparent`}>
                ClearCut
              </h1>
              <p className={`text-xs font-medium ${t.textSecondary} tracking-wide`}>
                AI BACKGROUND STUDIO
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleDarkMode}
              className="relative p-3 rounded-2xl transition-all duration-300 group backdrop-blur-sm border border-white/50 dark:border-slate-700/50 hover:shadow-lg"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6 text-amber-400 transition-transform group-hover:rotate-90 duration-500" />
              ) : (
                <Moon className="w-6 h-6 text-slate-700 transition-transform group-hover:-rotate-90 duration-500" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

const Features = ({ isDarkMode }) => {
  const t = isDarkMode ? theme.dark : theme.light;
  
  const features = [
    {
      icon: <ZapIcon className="w-7 h-7" />,
      title: "Lightning Fast",
      description: "Background removal in under 3 seconds with AI acceleration",
      gradient: "from-rose-500 to-pink-500",
      iconAccent: <Zap className="w-6 h-6" />
    },
    {
      icon: <Crown className="w-7 h-7" />,
      title: "Studio Quality",
      description: "Professional-grade edge detection preserves every detail",
      gradient: "from-purple-500 to-violet-500",
      iconAccent: <Star className="w-6 h-6" />
    },
    {
      icon: <Scissors className="w-7 h-7" />,
      title: "Surgical Precision",
      description: "Advanced ML algorithms for pixel-perfect cutouts",
      gradient: "from-amber-500 to-orange-500",
      iconAccent: <Circle className="w-6 h-6 fill-null" />
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "100% Private",
      description: "Everything processed locally on your device",
      gradient: "from-emerald-500 to-teal-500",
      iconAccent: <Lock className="w-6 h-6" />
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "AI Magic",
      description: "State-of-the-art neural networks for flawless results",
      gradient: "from-cyan-500 to-blue-500",
      iconAccent: <Wand2 className="w-6 h-6" />
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Free Forever",
      description: "No hidden costs, no watermarks, unlimited usage",
      gradient: "from-rose-400 to-rose-600",
      iconAccent: <BadgeCheck className="w-6 h-6" />
    }
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, type: "spring" }}
          whileHover={{ y: -8, scale: 1.02 }}
          className={`group relative ${t.glassCard} rounded-3xl p-8 ${t.shadow} hover:shadow-2xl transition-all duration-500`}
        >
          <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
            <div className="text-white">{feature.icon}</div>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center text-white`}>
              {feature.iconAccent}
            </div>
            <h3 className={`text-xl font-bold ${t.text}`}>
              {feature.title}
            </h3>
          </div>
          <p className={`text-base ${t.textSecondary} leading-relaxed`}>
            {feature.description}
          </p>
          
        </motion.div>
      ))}
    </div>
  );
};



// ==================== Main App Component ====================

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);

  const t = isDarkMode ? theme.dark : theme.light;

  useEffect(() => {
    const html = document.documentElement;
    html.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    return () => {
      html.style.transition = '';
    };
  }, [isDarkMode]);

  useEffect(() => {
    let interval;
    if (isProcessing) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          const increment = prev < 30 ? 3 : prev < 60 ? 2 : 1;
          return Math.min(90, prev + increment + Math.random() * 2);
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleFileDrop = useCallback(async (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, or WEBP)');
      return;
    }
    
    if (file.size > 25 * 1024 * 1024) {
      setError('File size must be less than 25MB');
      return;
    }

    setError(null);
    setProcessedImage(null);
    setIsProcessing(true);
    setProgress(0);
    
    setFileInfo({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type
    });
    
    const previewUrl = URL.createObjectURL(file);
    setOriginalImage(previewUrl);
    
    try {
      let processedFile = file;
      if (file.size > 5 * 1024 * 1024) {
        processedFile = await compressImage(file);
      }
      
      const { removeBackground } = await import('@imgly/background-removal');
      
      const resultBlob = await removeBackground(processedFile, {
        model: 'medium',
        output: {
          format: 'image/png',
          quality: 1,
        },
      });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProcessedImage(reader.result);
        setIsProcessing(false);
        setProgress(100);
      };
      reader.onerror = () => {
        throw new Error('Failed to read processed image');
      };
      reader.readAsDataURL(resultBlob);
      
    } catch (err) {
      console.error('Background removal failed:', err);
      setError(err.message || 'Failed to remove background. Please try again.');
      setIsProcessing(false);
      setProgress(0);
    }
  }, []);

  const handleReset = useCallback(() => {
    if (originalImage) {
      URL.revokeObjectURL(originalImage);
    }
    setOriginalImage(null);
    setProcessedImage(null);
    setFileInfo(null);
    setError(null);
    setProgress(0);
  }, [originalImage]);

  
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};


  return (
    <div className={`min-h-screen transition-all duration-700 ${t.bg}`}>
      <style>{`
        .checkerboard-bg {
          background-image: 
            linear-gradient(45deg, rgba(148,163,184,0.1) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(148,163,184,0.1) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(148,163,184,0.1) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(148,163,184,0.1) 75%);
          background-size: 24px 24px;
          background-position: 0 0, 0 12px, 12px -12px, -12px 0px;
        }
        .dark .checkerboard-bg {
          background-image: 
            linear-gradient(45deg, rgba(71,85,105,0.2) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(71,85,105,0.2) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(71,85,105,0.2) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(71,85,105,0.2) 75%);
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
      
      <Header isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      
      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <AnimatePresence mode="wait">
          {!originalImage ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-24"
            >
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-center space-y-10 pt-8"
              >
                
                <div className="space-y-6">
                  <h1 className="text-6xl sm:text-7xl md:text-8xl font-black leading-tight">
                    <span className={`bg-gradient-to-r ${t.accent} bg-clip-text text-transparent`}>
                      Remove
                    </span>
                    <br />
                    <span className={`${t.text}`}>
                      Backgrounds
                    </span>
                  </h1>
                  <p className={`text-xl sm:text-2xl ${t.textSecondary} max-w-3xl mx-auto leading-relaxed font-light`}>
                    Professional AI-powered background removal
                    <span className="block mt-3 text-lg font-medium">No signup • No watermarks • 100% Free</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6">
                  {[
                    { icon: <Rocket className="w-5 h-5" />, text: "No registration" },
                    { icon: <Gem className="w-5 h-5" />, text: "HD quality" },
                    { icon: <Infinity className="w-5 h-5" />, text: "Unlimited uses" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center gap-3 px-6 py-3 ${t.glassCard} rounded-full text-sm font-medium ${t.text}`}
                    >
                      <span className="text-rose-500">{item.icon}</span>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <DropZone onFileDrop={handleFileDrop} isProcessing={isProcessing} isDarkMode={isDarkMode} />

              {/* Features Section */}
              <div className="space-y-12">
                <div className="text-center space-y-4">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${t.highlight} border ${t.border}`}
                  >
                    <Zap className="w-5 h-5 text-rose-500" />
                    <span className={`text-sm font-semibold ${t.text}`}>WHY CLEARCUT?</span>
                  </motion.div>
                  <h2 className={`text-4xl sm:text-5xl font-bold ${t.text}`}>
                    The Smart Way to Edit
                  </h2>
                  <p className={`text-lg ${t.textSecondary}`}>
                    Powered by cutting-edge AI, designed for everyone
                  </p>
                </div>
                <Features isDarkMode={isDarkMode} />
              </div>
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`text-4xl font-black mb-4 ${t.text}`}
        >
          <span className="flex items-center justify-center gap-3">
            <Heart className="w-10 h-10 text-rose-500" />
            Loved by Creators
          </span>
        </motion.h2>
        <p className={`text-lg ${t.textSecondary}`}>
          Join thousands of happy users worldwide
        </p>
      </div>
              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className={`${t.glassCard} rounded-3xl p-10 text-center border ${t.border}`}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mb-6"
                >
                  <Coffee className="w-16 h-16 text-rose-500 mx-auto" />
                </motion.div>
                <h3 className={`text-3xl font-bold mb-4 ${t.text}`}>
                  Free & Open Source Forever
                </h3>
                <p className={`text-lg mb-6 ${t.textSecondary}`}>
                  No hidden fees, no premium tiers. Just powerful AI for everyone.
                </p>
<button
  onClick={scrollToTop}
  className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${t.accent} text-white rounded-2xl font-semibold shadow-xl cursor-pointer hover:scale-105 transition-all duration-300`}
>
  <span>Start Removing Backgrounds</span>
  <ArrowRight className="w-5 h-5" />
</button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`${t.error} rounded-2xl p-6 border`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-rose-800 dark:text-rose-300 text-lg">
                          Error Processing Image
                        </p>
                        <p className="text-sm text-rose-700 dark:text-rose-400 mt-2">
                          {error}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <ImagePreview
                originalImage={originalImage}
                processedImage={processedImage}
                onReset={handleReset}
                isDarkMode={isDarkMode}
              />

              {fileInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${t.glassCard} rounded-2xl p-6`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${t.highlight}`}>
                        <ImageIcon className={`w-7 h-7 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} />
                      </div>
                      <div>
                        <p className={`font-semibold text-lg ${t.text}`}>
                          {fileInfo.name}
                        </p>
                        <p className={`text-sm ${t.textSecondary}`}>
                          {fileInfo.size} • {fileInfo.type.split('/')[1].toUpperCase()}
                        </p>
                      </div>
                    </div>
                    {processedImage && (
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-100/30 text-emerald-700 dark:text-emerald-500 rounded-full text-sm font-semibold  dark:border-emerald-800/50">
                        <CheckCircle2 className="w-4 h-4" />
                        Processed Successfully
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isProcessing && <ProcessingOverlay progress={progress} />}
        </AnimatePresence>
      </main>

      <footer className={`border-t ${t.border} mt-24`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10">
          <div className="text-center space-y-4">
            <div className={`flex items-center justify-center gap-3 text-lg ${t.text}`}>
              <Sparkles className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <span className="font-bold">ClearCut</span>
            </div>
            <p className={`text-sm ${t.textSecondary}`}>
              All processing is done locally on your device • Your privacy is guaranteed
            </p>
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className={`text-xs ${t.textSecondary}`}>End-to-end encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span className={`text-xs ${t.textSecondary}`}>Made with love</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;