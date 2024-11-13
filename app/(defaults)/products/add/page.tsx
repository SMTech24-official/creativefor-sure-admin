'use client';

import React, { useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import '@/styles/file-upload-preview.css';

interface ProductFormValues {
    title: string;
    description: string;
    category: string;
    status: string;
    agree: boolean;
}

const ProductUploadForm: React.FC = () => {
    const [images, setImages] = useState<any[]>([]);
    const [galleryImages, setGalleryImages] = useState<any[]>([]);
    const maxNumber = 5;

    const [images2, setImages2] = useState<any>([]);

    const onChange2 = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages2(imageList as never[]);
    };

    const onImageChange = (imageList: ImageListType) => setImages(imageList);
    const onGalleryChange = (imageList: ImageListType) => setGalleryImages(imageList);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        category: Yup.string().required('Category is required'),
        status: Yup.string().required('Status is required'),
        agree: Yup.bool().oneOf([true], 'You must agree to the terms and conditions'),
    });

    const handleSubmit = (values: ProductFormValues, actions: FormikHelpers<ProductFormValues>) => {
        const formData = {
            ...values,
            mainImage: images?.[0]?.dataURL,
            galleryImages: galleryImages?.map((image) => image?.dataURL),
        };

        Swal.fire({
            icon: 'success',
            title: 'Form submitted successfully!',
            text: JSON.stringify(formData),
        });

        actions.setSubmitting(false);
    };

    return (
        <div className="bg-white p-4">
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    category: '',
                    status: '',
                    agree: false,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, handleChange, values, setFieldValue }) => (
                    <Form className="space-y-5">
                        <div className={`form-group ${errors.title ? 'has-error' : ''}`}>
                            <label htmlFor="title">Product Title</label>
                            <Field name="title" type="text" className="form-input" placeholder="Enter product title" />
                            {errors.title && <div className="error">{errors.title}</div>}
                        </div>

                        <div className="form-group">
                            <label>Main Image</label>
                            <div className="custom-file-container">
                                <div className="label-container">
                                    <label>Upload</label>
                                    <button type="button" className="custom-file-container__image-clear" title="Clear Image" onClick={() => setImages([])}>
                                        ×
                                    </button>
                                </div>
                                <ImageUploading value={images} onChange={onImageChange} maxNumber={1} acceptType={['jpg', 'jpeg', 'png']}>
                                    {({ onImageUpload }) => (
                                        <div className="upload__image-wrapper">
                                            <button type="button" className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </button>
                                            {images.length === 0 ? (
                                                <img src="/assets/images/file-preview.svg" className="m-auto w-full max-w-md" alt="Preview" />
                                            ) : (
                                                images.map((image, index) => (
                                                    <div key={index} className="custom-file-container__image-preview relative">
                                                        <img src={image.dataURL} alt="Main Product" className="m-auto" />
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                        </div>

                        <div className="custom-file-container" data-upload-id="mySecondImage">
                            <div className="label-container">
                                <label>Upload </label>
                                <button
                                    type="button"
                                    className="custom-file-container__image-clear"
                                    title="Clear Image"
                                    onClick={() => {
                                        setImages2([]);
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                            <label className="custom-file-container__custom-file"></label>
                            <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                            <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                            <ImageUploading multiple value={images2} onChange={onChange2} maxNumber={maxNumber}>
                                {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                    <div className="upload__image-wrapper">
                                        <button className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                            Choose File...
                                        </button>
                                        &nbsp;
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                            {imageList.map((image, index) => (
                                                <div key={index} className="custom-file-container__image-preview relative">
                                                    <button
                                                        type="button"
                                                        className="custom-file-container__image-clear absolute left-0 top-0 block w-fit rounded-full bg-dark-light p-0.5 dark:bg-dark dark:text-white-dark"
                                                        title="Clear Image"
                                                        onClick={() => onImageRemove(index)}
                                                    >
                                                        X
                                                    </button>
                                                    <img src={image.dataURL} alt="img" className="!max-h-48 w-full rounded object-cover shadow" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </ImageUploading>
                            {images2.length === 0 ? <img src="/assets/images/file-preview.svg" className="m-auto w-full max-w-md" alt="" /> : ''}
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <ReactQuill value={values.description} onChange={(value) => setFieldValue('description', value)} className="quill-editor" />
                            {errors.description && <div className="error">{errors.description}</div>}
                        </div>

                        {/* Category, Status, Gallery Images, and Agree Fields Go Here */}

                        <div className="form-group">
                            <button type="submit" className="submit-button">
                                Submit Product
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProductUploadForm;
