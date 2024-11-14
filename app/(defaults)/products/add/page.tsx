'use client';

import { useState, useRef } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadIcon } from '@/components/icon/UploadIcon';
import ProductSchema from './ProductSchema';

export default function ProductUploadForm() {
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const objectUrl = URL.createObjectURL(selectedFile);
            setFilePreview(objectUrl);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFilePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
        const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));

        setGalleryFiles(selectedFiles);
        setGalleryPreviews(newPreviews);
    };

    const handleRemoveGalleryImage = (index: number) => {
        const updatedFiles = galleryFiles.filter((_, i) => i !== index);
        const updatedPreviews = galleryPreviews.filter((_, i) => i !== index);

        setGalleryFiles(updatedFiles);
        setGalleryPreviews(updatedPreviews);
    };

    // Hook Form setup with Zod resolver
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ProductSchema),
    });

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
        setValue('description', value);
    };

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Add New Cigar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="Enter cigar title" {...register('title')} className={`${errors?.title ? 'border-red-500 ring-red-500' : ''}`} />
                            {errors?.title && <p className="text-red-500">{errors.title.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="brand">Brand</Label>
                            <Input id="brand" placeholder="Enter cigar brand" {...register('brand')} className={`${errors?.brand ? 'border-red-500 ring-red-500' : ''}`} />
                            {errors?.brand && <p className="text-red-500">{errors.brand.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="barcode">Barcode</Label>
                            <Input id="barcode" placeholder="Enter barcode" {...register('barcode')} className={`${errors?.barcode ? 'border-red-500 ring-red-500' : ''}`} />
                            {errors?.barcode && <p className="text-red-500">{errors.barcode.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <ReactQuill id="description" value={description} onChange={handleDescriptionChange} placeholder="Enter cigar description" theme="snow" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="file">Upload File</Label>
                                <div className="flex items-center gap-2">
                                    <Input ref={fileInputRef} id="file" type="file" className="flex-1" onChange={handleFileChange} />
                                    <span className="rounded-md border p-2">
                                        <UploadIcon className="h-5 w-5" />
                                    </span>
                                </div>
                                {file && (
                                    <div className="mt-2 grid gap-2">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={filePreview || '/placeholder.svg'}
                                                alt="File preview"
                                                width="64"
                                                height="64"
                                                className="rounded-md"
                                                style={{ aspectRatio: '64/64', objectFit: 'cover' }}
                                            />
                                            <div>
                                                <p className="font-medium">{file.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{file.size < 1024 ? `${file.size} bytes` : `${(file.size / 1024).toFixed(2)} KB`}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button variant="outline" size="sm" onClick={handleRemoveFile}>
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="gallery">Gallery Images</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="gallery"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleGalleryChange}
                                        className={`flex-1 ${errors?.gallery ? 'border-red-500 ring-red-500' : ''}`}
                                    />
                                    <span className="rounded-md border p-2">
                                        <UploadIcon className="h-5 w-5" />
                                    </span>
                                </div>
                                {errors?.gallery && <p className="text-red-500">{errors.gallery.message}</p>}
                                <div className="mt-2 grid gap-2">
                                    {galleryPreviews.map((preview, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <img
                                                src={preview}
                                                alt={`Gallery preview ${index + 1}`}
                                                width="64"
                                                height="64"
                                                className="rounded-md"
                                                style={{ aspectRatio: '64/64', objectFit: 'cover' }}
                                            />
                                            <div>
                                                <p className="font-medium">{galleryFiles[index].name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {galleryFiles[index].size < 1024 ? `${galleryFiles[index].size} bytes` : `${(galleryFiles[index].size / 1024).toFixed(2)} KB`}
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => handleRemoveGalleryImage(index)}>
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="shape">Cigar Shape</Label>
                            <Select {...register('shape')}>
                                <SelectTrigger id="shape">
                                    <SelectValue placeholder="Select shape" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="parejo">Parejo</SelectItem>
                                    <SelectItem value="figurado">Figurado</SelectItem>
                                    <SelectItem value="torpedo">Torpedo</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors?.shape && <p className="text-red-500">{errors.shape.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="section">Cigar Section</Label>
                            <Input id="section" placeholder="Enter section" {...register('section')} className={`${errors?.section ? 'border-red-500 ring-red-500' : ''}`} />
                            {errors?.section && <p className="text-red-500">{errors.section.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="length">Cigar Length (inches)</Label>
                            <Input
                                id="length"
                                type="number"
                                step="0.1"
                                placeholder="Enter length"
                                {...register('length', { valueAsNumber: true })}
                                className={`${errors?.length ? 'border-red-500 ring-red-500' : ''}`}
                            />
                            {errors?.length && <p className="text-red-500">{errors.length.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="origin">Origin</Label>
                            <Input id="origin" placeholder="Enter origin" {...register('origin')} className={`${errors?.origin ? 'border-red-500 ring-red-500' : ''}`} />
                            {errors?.origin && <p className="text-red-500">{errors.origin.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ringGauge">Cigar Ring Gauge</Label>
                            <Input
                                id="ringGauge"
                                type="number"
                                placeholder="Enter ring gauge"
                                {...register('ringGauge', { valueAsNumber: true })}
                                className={`${errors?.ringGauge ? 'border-red-500 ring-red-500' : ''}`}
                            />
                            {errors?.ringGauge && <p className="text-red-500">{errors.ringGauge.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="strength">Strength</Label>
                            <Select {...register('strength')}>
                                <SelectTrigger id="strength">
                                    <SelectValue placeholder="Select strength" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mild">Mild</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="full">Full</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors?.strength && <p className="text-red-500">{errors.strength.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="wrapperColor">Wrapper Color</Label>
                            <Input id="wrapperColor" placeholder="Enter wrapper color" {...register('wrapperColor')} className={`${errors?.wrapperColor ? 'border-red-500 ring-red-500' : ''}`} />
                            {errors?.wrapperColor && <p className="text-red-500">{errors.wrapperColor.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rollingType">Rolling Type</Label>
                            <Input id="rollingType" placeholder="Enter rolling type" {...register('rollingType')} className={`${errors?.rollingType ? 'border-red-500 ring-red-500' : ''}`} />
                            {errors?.rollingType && <p className="text-red-500">{errors.rollingType.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="manufacturer">Manufacturer</Label>
                            <Input id="manufacturer" placeholder="Enter manufacturer" {...register('manufacturer')} className={`${errors?.manufacturer ? 'border-red-500 ring-red-500' : ''}`} />
                            {errors?.manufacturer && <p className="text-red-500">{errors.manufacturer.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="wrapper">Wrapper</Label>
                        <Input id="wrapper" placeholder="Enter wrapper" {...register('wrapper')} className={`${errors?.wrapper ? 'border-red-500 ring-red-500' : ''}`} />
                        {errors?.wrapper && <p className="text-red-500">{errors.wrapper.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="binder">Binder</Label>
                        <Input id="binder" placeholder="Enter binder" {...register('binder')} className={`${errors?.binder ? 'border-red-500 ring-red-500' : ''}`} />
                        {errors?.binder && <p className="text-red-500">{errors.binder.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="filter">Filter</Label>
                        <Select {...register('filter')}>
                            <SelectTrigger id="filter">
                                <SelectValue placeholder="Select filter" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="filter1">Filter 1</SelectItem>
                                <SelectItem value="filter2">Filter 2</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors?.filter && <p className="text-red-500">{errors.filter.message}</p>}
                    </div>
                </CardContent>

                <CardFooter>
                    <Button type="submit">Submit</Button>
                </CardFooter>
            </Card>
        </form>
    );
}
