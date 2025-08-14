import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import user_image from '../Image/user_image.jpg'; 
import signature from '../Image/Signature.jpg'; 

const UploadPhotos = () => {
    // State to store the preview URLs for image and signature
    const [imagePreview, setImagePreview] = useState(user_image);
    const [signaturePreview, setSignaturePreview] = useState(signature);
    const navigate = useNavigate(); // Initialize useNavigate

    const [imageFile, setImageFile] = useState(null);
    const [signatureFile, setSignatureFile] = useState(null);

    // Handle image file change
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImageFile(file);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    }
};

    // Handle signature file change
    const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setSignatureFile(file);
        const previewUrl = URL.createObjectURL(file);
        setSignaturePreview(previewUrl);
    }
};

    // Handle upload button click
  const handleUpload = async () => {
    if (!imageFile || !signatureFile) {
        alert("Please select both photo and signature files.");
        return;
    }
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("No authentication token found. Please login again.");
        return;
    }
    // Get dynamic application_id from localStorage
    const applicationId = localStorage.getItem('application_id');
    if (!applicationId) {
        alert("No application ID found. Please submit your application first.");
        return;
    }
    const formData = new FormData();
    formData.append('application_id', applicationId);
    formData.append('photo', imageFile);
    formData.append('signature', signatureFile);

    try {
        const response = await fetch('https://lampserver.uppolice.co.in/uploadPhoto/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
                // Do NOT set Content-Type for FormData; browser will set it automatically
            },
            body: formData
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            navigate('/UploadDocument');
        } else {
            alert(data.message || "Upload failed.");
        }
    } catch (error) {
        alert("Error uploading files: " + error.message);
    }
};

    // Handle reset button click
    const handleReset = () => {
        // Reset previews to default images
        setImagePreview(user_image);
        setSignaturePreview(signature);
    };

    // Clean up URLs to avoid memory leaks
    React.useEffect(() => {
        return () => {
            if (imagePreview !== user_image) {
                URL.revokeObjectURL(imagePreview);
            }
            if (signaturePreview !== signature) {
                URL.revokeObjectURL(signaturePreview);
            }
        };
    }, [imagePreview, signaturePreview]);

    return (
        <div>
            <Sidebar />
            <div className="asside">
                <div className="about-first">
                    <div className="row">
                        <div className="col-12 mb-24">
                            <div className="bg-box text-center application-header">
                                <h1>Upload Image / Signature Of The Applicant</h1>
                            </div>
                        </div>
                        <div className="col-12 mb-24">
                            <div className="bg-box">
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='user_img-upload'>
                                            <img src={imagePreview} alt="User Photo Preview" />
                                            <input 
                                                type="file" 
                                                className="form-control" 
                                                accept="image/*" 
                                                onChange={handleImageChange} 
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='user_img-upload'>
                                            <img src={signaturePreview} alt="Signature Preview" />
                                            <input 
                                                type="file" 
                                                className="form-control" 
                                                accept="image/*" 
                                                onChange={handleSignatureChange} 
                                            />
                                        </div>
                                    </div>
                                    <div className='col-12 mt-4 text-center'>
                                        <button 
                                            className='btn btn-verify' 
                                            onClick={handleUpload}
                                        >
                                            UPLOAD
                                        </button>
                                        <button 
                                            className='btn btn-danger ms-2' 
                                            onClick={handleReset}
                                        >
                                            RESET
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default UploadPhotos;