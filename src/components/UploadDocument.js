import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
// import user_image from '../Image/user_image.jpg'; 
// import signature from '../Image/Signature.jpg'; 

const documentFields = [
    { key: 'electricity_bill', label: 'Electricity Bill' },
    { key: 'water_bill', label: 'Water Bill' },
    { key: 'telephone_bill', label: 'Telephone Bill' },
    { key: 'proof_of_residence', label: 'Proof Of Residence' },
    { key: 'date_of_birth_proof', label: 'Date Of Birth Proof' },
    { key: 'medical_certificate', label: 'Medical Certificate' },
    { key: 'posting_cum_residence_certificate', label: 'Posting-Cum-Residence Certificate' },
    { key: 'recommendation_letter', label: 'Recommendation Letter' },
    { key: 'income_tax_return', label: 'Income Tax Return (ITR)' },
    { key: 'salary_slip', label: 'Salary Slip' },
    { key: 'copy_of_fir', label: 'Copy Of FIR' },
    { key: 'affidavit', label: 'Affidavit' },
    { key: 'noc_legal_heirs', label: 'NOCS From All The Other Legal Heirs' },
    { key: 'noc_department', label: 'NOC From Department' },
    { key: 'proof_of_official_address', label: 'Proof Of Official Address' },
    { key: 'requirement_training_letter', label: 'Requirement And Training Letter' },
    { key: 'sake_tax_receipt', label: 'Sake Tax Receipt' },
    { key: 'vat_receipt', label: 'Vat Receipt' },
    { key: 'annual_income_proof', label: 'Annual Income Proof' },
    { key: 'annual_turnover_proof', label: 'Annual Turn Over Proof' },
    { key: 'number_of_employees_proof', label: 'Number Of Employees Proof' },
    { key: 'ration_card', label: 'Ration Card' },
    { key: 'driving_license', label: 'Driving License' },
    { key: 'passport', label: 'Passport' },
    { key: 'misc_documents', label: 'MISC Documents' },
    { key: 'pan_card', label: 'PAN Card' },
    { key: 'tahshildar_certificate', label: 'Tahshildar Certificate' },
    { key: 'forest_officer_certificate', label: 'Forest Officer Certificate' },
    { key: 'voter_id', label: 'Voter ID' }
];
const UploadDocument = () => {
    const [checked, setChecked] = useState({});
    const [files, setFiles] = useState({});
    const [uploadedUrls, setUploadedUrls] = useState({});
    const navigate = useNavigate();

    const handleCheckboxChange = (key) => {
        setChecked(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleFileChange = (key, file) => {
        setFiles(prev => ({ ...prev, [key]: file }));
        // Simulate uploaded file URL (in real use, update after successful upload)
        if (file) {
            setUploadedUrls(prev => ({
                ...prev,
                [key]: URL.createObjectURL(file) // For demo only, replace with real URL from backend
            }));
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        const applicationId = localStorage.getItem('application_id');
        if (!token) {
            alert("No authentication token found. Please login again.");
            return;
        }
        if (!applicationId) {
            alert("No application ID found. Please submit your application first.");
            return;
        }
        const formData = new FormData();
        formData.append('application_id', applicationId);
        documentFields.forEach(doc => {
            if (checked[doc.key] && files[doc.key]) {
                formData.append(doc.key, files[doc.key]);
            }
        });
        try {
            const response = await fetch('https://lampserver.uppolice.co.in/uploadPhoto/upload-documents', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            if (response.ok && data.status) {
                alert(data.message || "Documents uploaded successfully.");
                navigate('/upload-success');
            } else {
                alert(data.message || "Upload failed.");
            }
        } catch (error) {
            alert("Error uploading documents: " + error.message);
        }
    };

    const handleReset = () => {
        setChecked({});
        setFiles({});
    };

    return (
       <div>
            <Sidebar />
            <div className="asside">
                <div className="about-first">
                    <div className="row">
                        <div className="col-12 mb-24">
                            <div className="bg-box text-center application-header">
                                <h1>Required Documents Of The Application</h1>
                            </div>
                        </div>
                        <div className="col-12 mb-24">
                            <div className="bg-box">
                                <form onSubmit={handleUpload}>
                                    <div className="row">
                                        <div className="col-12">
                                            <ul className='ps-3 text-danger'>
                                                <li><b>Accepted File Type:</b> Only PDF files are accepted for upload.</li>
                                                <li><b>File Size Limit:</b> Each file cannot exceed 1 MB in size.</li>
                                                <li><b>Upload Method:</b> Documents are uploaded by clicking their respective checkboxes.</li>
                                                <li><b>Mandatory Upload:</b> Document upload is mandatory for manufacturer licenses, and the application will remain incomplete until all required documents are uploaded.</li>
                                            </ul>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <div className='table-responsive mt-table'>
                                                <table className="table table-bordered mb-0">
                                                 
                                                    <tbody>
                                                        {documentFields.map((doc, idx) => (
                                                            <tr key={doc.key}>
                                                                <th scope="col">{idx + 1}</th>
                                                                <th scope="col">
                                                                    <div className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            checked={!!checked[doc.key]}
                                                                            onChange={() => handleCheckboxChange(doc.key)}
                                                                        />
                                                                    </div>
                                                                </th>
                                                                <th scope="col">{doc.label}</th>
                                                                <td scope="col">
                                                                    <div>
                                                                        <input
                                                                            type="file"
                                                                            className="form-control"
                                                                            accept="application/pdf"
                                                                            onChange={e => handleFileChange(doc.key, e.target.files[0])}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td scope="col">
                                                                    {uploadedUrls[doc.key] ? (
                                                                        <Link
                                                                            to={uploadedUrls[doc.key]}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            View
                                                                        </Link>
                                                                    ) : (
                                                                        <span className="text-muted">No file</span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12 text-center'>
                                            <button type="submit" className='btn btn-verify'>UPLOAD</button>
                                            <button type="button" className='btn btn-danger ms-2' onClick={handleReset}>RESET</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default UploadDocument;