"use client";

import * as React from "react";
import { UploadCloud, X, File as FileIcon, CheckCircle2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Define the structure for a file being uploaded
export interface UploadedFile {
  id: string;
  file: File;
  progress: number; // 0-100
  status: "uploading" | "completed" | "error";
}

// Define the props for the component
interface FileUploadCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> {
  files: UploadedFile[];
  onFilesChange: (files: File[]) => void;
  onFileRemove: (id: string) => void;
  onClose?: () => void;
  accept?: string;
  maxSizeMB?: number;
  title?: string;
  subtitle?: string;
}

export const FileUploadCard = React.forwardRef<HTMLDivElement, FileUploadCardProps>(
  (
    {
      className,
      files = [],
      onFilesChange,
      onFileRemove,
      onClose,
      accept,
      maxSizeMB = 50,
      title = "Upload files",
      subtitle = "Select and upload the files of your choice",
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Handler for drag enter event
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    // Handler for drag leave event
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    // Handler for drag over event
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Handler for drop event
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles && droppedFiles.length > 0) {
        onFilesChange(droppedFiles);
      }
    };

    // Handler for file input change
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      if (selectedFiles.length > 0) {
        onFilesChange(selectedFiles);
      }
    };

    // Trigger file input click
    const triggerFileSelect = () => fileInputRef.current?.click();

    // Format file size for display
    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 KB";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    // Animation variants for Framer Motion
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    const fileItemVariants = {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    };

    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        className={cn(
          "w-full max-w-lg bg-bg-card/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary-light">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
              </div>
            </div>
            {onClose && (
              <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 text-text-secondary hover:text-text-primary" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
            className={cn(
              "mt-6 border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer",
              isDragging
                ? "border-primary bg-primary/10 scale-[0.99]"
                : "border-white/15 bg-white/[0.02] hover:border-primary/50 hover:bg-white/[0.04]"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
            <UploadCloud className="w-10 h-10 text-primary-light/70 mb-4" />
            <p className="font-semibold text-text-primary">Choose a file or drag & drop it here.</p>
            <p className="text-xs text-text-secondary mt-1">
              PDF, PNG, JPEG formats, up to {maxSizeMB} MB.
            </p>
            <Button variant="outline" size="sm" className="mt-4 pointer-events-none border-white/20 bg-white/5 text-text-primary">
              Browse File
            </Button>
          </div>
        </div>

        {files.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-black/20">
            <ul className="space-y-4">
              <AnimatePresence>
                {files.map((file) => (
                  <motion.li
                    key={file.id}
                    variants={fileItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    layout
                    className="flex items-center justify-between gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-md bg-primary/10 border border-primary/20 text-xs font-bold text-primary-light uppercase">
                        {file.file.type.split("/")[1]?.toUpperCase().substring(0, 3) || "PDF"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">{file.file.name}</p>
                        <div className="text-xs text-text-secondary flex items-center gap-1.5 mt-0.5">
                          {file.status === "uploading" && (
                            <span>{formatFileSize((file.file.size * file.progress) / 100)} of {formatFileSize(file.file.size)}</span>
                          )}
                          {file.status === "completed" && (
                            <span>{formatFileSize(file.file.size)}</span>
                          )}
                          <span>•</span>
                          <span
                            className={cn(
                              { "text-primary-light font-medium": file.status === "uploading" },
                              { "text-emerald-400 font-medium": file.status === "completed" },
                              { "text-rose-400 font-medium": file.status === "error" }
                            )}
                          >
                            {file.status === "uploading" ? "Uploading..." : file.status === "completed" ? "Completed" : "Error"}
                          </span>
                        </div>
                        {file.status === "uploading" && <Progress value={file.progress} className="h-1.5 mt-1.5" />}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {file.status === "completed" && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 text-text-secondary hover:text-rose-400 hover:bg-rose-500/10" onClick={() => onFileRemove(file.id)}>
                        {file.status === "completed" ? <Trash2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </Button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        )}
      </motion.div>
    );
  }
);
FileUploadCard.displayName = "FileUploadCard";
