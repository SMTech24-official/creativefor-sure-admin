"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import clsx, { type ClassValue } from "clsx";
import { FileSpreadsheet, Plus, X } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
            className
        )}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className="h-full w-full flex-1 bg-primary transition-all"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

interface UploadState {
    file: File | null;
    progress: number;
    error?: string;
}

export default function CSVUploaderPage() {
    const [uploadState, setUploadState] = useState<UploadState>({
        file: null,
        progress: 0,
    });

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type === "text/csv") {
            simulateUpload(file);
        } else {
            setUploadState((prev) => ({
                ...prev,
                error: "Please upload a CSV file",
            }));
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "text/csv") {
            simulateUpload(file);
        } else {
            setUploadState((prev) => ({
                ...prev,
                error: "Please upload a CSV file",
            }));
        }
    };
    const simulateUpload = (file: File) => {
        setUploadState({ file, progress: 0 });
        const interval = setInterval(() => {
            setUploadState((prev) => {
                if (prev.progress >= 100) {
                    clearInterval(interval);
                    return prev;
                }
                return { ...prev, progress: prev.progress + 20 };
            });
        }, 500);
    };

    const handleUpload = () => {
        console.log(uploadState.file);
    };

    return (
        <div className="bg-background flex min-h-[70vh] items-center justify-center ">
            <div className="w-[700px] overflow-hidden rounded-md border p-5 shadow-md sm:p-6 md:h-[550px] md:p-7 xl:p-10">
                <h1 className="mb-6 text-2xl font-bold">Upload CSV</h1>
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className={cn(
                        "flex  flex-col items-center justify-center rounded-lg border-2 border-dashed sm:p-20 md:p-20",
                        uploadState.file
                            ? "border-muted bg-muted/50"
                            : "border-muted"
                    )}
                >
                    {!uploadState.file ? (
                        <>
                            <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
                                <Plus className="text-muted-foreground h-6 w-6" />
                            </div>
                            <div className="mt-4 flex flex-col items-center justify-center text-center">
                                <p className="font-medium xl:text-xl">
                                    Select a CSV file to upload
                                </p>
                                <p className="text-muted-foreground xl:text-xl">
                                    or drag and drop it here
                                </p>
                            </div>
                            <label className="text-primary-foreground mt-4 cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 dark:bg-white dark:text-black">
                                Select file
                                <input
                                    type="file"
                                    accept=".csv"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />
                            </label>
                        </>
                    ) : (
                        <div className="w-full space-y-4 p-10 md:p-10 lg:p-12 xl:p-16">
                            <div className="flex items-center gap-4">
                                <FileSpreadsheet className="text-muted-foreground h-8 w-8" />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium">
                                        {uploadState.file.name}
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                        {Math.round(
                                            uploadState.file.size / 1024
                                        )}{" "}
                                        KB
                                    </p>
                                </div>
                                <button
                                    className="hover:bg-muted rounded-md p-1"
                                    onClick={() =>
                                        setUploadState({
                                            file: null,
                                            progress: 0,
                                        })
                                    }
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <Progress
                                value={uploadState.progress}
                                className="h-2 w-full"
                            />
                        </div>
                    )}
                </div>
                {uploadState.error && (
                    <p className="text-destructive mt-2 text-sm">
                        {uploadState.error}
                    </p>
                )}
                <div
                    onClick={handleUpload}
                    className="mx-auto mt-4 w-fit sm:mt-5 md:mt-7 lg:mt-8 xl:mt-10"
                >
                    <button className="rounded-lg border bg-primary px-10 py-2 text-white dark:bg-white dark:text-black">
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}
