import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import axios from 'axios';

const ProgressBar = ({ currentStep }) => {
    const steps = [
        "Identity of Applicant",
        "Additional Details",
        "License Specific Details",
    ];
    const progressWidth = (currentStep / (steps.length - 1)) * 100;

    return (
        <div className="progressbar-wrapper mb-4 position-relative">
            <div className="progressbar-line">
                <div
                    style={{
                        height: "4px",
                        background: "rgb(51, 85, 170)",
                        width: `${progressWidth}%`,
                        transition: ".5s",
                    }}
                />
            </div>
            <div
                className="d-flex align-items-center justify-content-between position-relative"
                style={{ zIndex: 1 }}
            >
                {steps.map((title, index) => (
                    <div
                        key={index}
                        className={`rounded-circle d-flex align-items-center justify-content-center ${index <= currentStep ? "bg-primary text-white" : "bg-secondary text-white"
                            }`}
                        style={{
                            width: "40px",
                            height: "40px",
                            position: "relative",
                            background: index <= currentStep ? "#3355aa" : "#dcdcdc",
                        }}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

const IdentityOfApplicant = ({ formData, handleChange, handleSubmit, handleReset,states,districts,loadingDistricts,birthDistricts,loadingBirthDistricts  }) => {
    const location = useLocation();

    const [applicationNameFocus, setApplicationNameFocus] = useState(false);
    const [parentSpouseFocus, setParentSpouseFocus] = useState(false);
    const [parentSpouseNameFocus, setParentSpouseNameFocus] = useState(false);
    const [genderFocus, setGenderFocus] = useState(false);
    const [birthCountryFocus, setBirthCountryFocus] = useState(false);
    const [birthStateFocus, setBirthStateFocus] = useState(false);
    const [birthDistrictFocus, setBirthDistrictFocus] = useState(false);
    const [placeOfBirthFocus, setPlaceOfBirthFocus] = useState(false);
    const [dobFocus, setDobFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [panFocus, setPanFocus] = useState(false);
    const [presentAddressFocus, setPresentAddressFocus] = useState(false);
    const [stateFocus, setStateFocus] = useState(false);
    const [districtFocus, setDistrictFocus] = useState(false);
    const [residingSinceFocus, setResidingSinceFocus] = useState(false);
    const [telOfficeFocus, setTelOfficeFocus] = useState(false);
    const [telResidenceFocus, setTelResidenceFocus] = useState(false);
    const [mobileFocus, setMobileFocus] = useState(false);
    const [normalPoliceStationFocus, setNormalPoliceStationFocus] = useState(false);
    const [nearestPoliceStationFocus, setNearestPoliceStationFocus] = useState(false);
    const [officeAddress1Focus, setOfficeAddress1Focus] = useState(false);
    const [officeAddress2Focus, setOfficeAddress2Focus] = useState(false);
    const [occupationFocus, setOccupationFocus] = useState(false);
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaFocus, setCaptchaFocus] = useState(false);
    const [captchaError, setCaptchaError] = useState("");
    

    function generateCaptcha() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const handleCaptchaRefresh = () => {
        setCaptcha(generateCaptcha());
        setCaptchaInput("");
        setCaptchaError("");
    };

    const validateCaptcha = () => {
        if (captchaInput !== captcha) {
            setCaptchaError("Invalid CAPTCHA. Please try again.");
            return false;
        }
        setCaptchaError("");
        return true;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (validateCaptcha()) {
            handleSubmit(e);
        }
    };

    useEffect(() => {
    if (location.state) {
      console.log('Received from previous page:', location.state);
    } else {
      console.log('No state received');
    }
  }, [location]);

    return (
        <div className="mb-4">
            <div className="identity-of-applicant">
                <h4>Identity of Applicant</h4>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="progress-info">
                    <h3>Personal Information</h3>
                    <div className="row">
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingApplicationName"
                                    name="applicationName"
                                    value={formData.applicationName || ""}
                                    onChange={handleChange}
                                    onFocus={() => setApplicationNameFocus(true)}
                                    onBlur={() => setApplicationNameFocus(false)}
                                    placeholder="Name"
                                />
                                <label htmlFor="floatingApplicationName">
                                    {applicationNameFocus
                                        ? "ENTER FULL NAME "
                                        : "Enter Full Name"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                    className="form-control"
                                    id="floatingParentSpouse"
                                    name="parentSpouse"
                                    value={formData.parentSpouse || ""}
                                    onChange={handleChange}
                                    onFocus={() => setParentSpouseFocus(true)}
                                    onBlur={() => setParentSpouseFocus(false)}
                                >
                                    <option value="">Select Parent/Spouse</option>
                                    <option value="parent">Parent</option>
                                    <option value="spouse">Spouse</option>
                                </select>
                                <label htmlFor="floatingParentSpouse">
                                    {parentSpouseFocus ? "SELECT PARENT/SPOUSE" : "Parent/Spouse"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingParentSpouseName"
                                    name="parentSpouseName"
                                    value={formData.parentSpouseName || ""}
                                    onChange={handleChange}
                                    onFocus={() => setParentSpouseNameFocus(true)}
                                    onBlur={() => setParentSpouseNameFocus(false)}
                                    placeholder="Parent/Spouse Name"
                                />
                                <label htmlFor="floatingParentSpouseName">
                                    {parentSpouseNameFocus
                                        ? "ENTER PARENT/SPOUSE NAME"
                                        : "Parent/Spouse Name"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                    className="form-control"
                                    id="floatingGender"
                                    name="gender"
                                    value={formData.gender || ""}
                                    onChange={handleChange}
                                    onFocus={() => setGenderFocus(true)}
                                    onBlur={() => setGenderFocus(false)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <label htmlFor="floatingGender">
                                    {genderFocus ? "SELECT GENDER" : "Gender"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                    className="form-control"
                                    id="floatingBirthCountry"
                                    name="birthCountry"
                                    value={formData.birthCountry || ""}
                                    onChange={handleChange}
                                    onFocus={() => setBirthCountryFocus(true)}
                                    onBlur={() => setBirthCountryFocus(false)}
                                >
                                    <option value="">Select Birth Country</option>
                                    {/* <option value="usa">USA</option> */}
                                    <option value="india">India</option>
                                    {/* <option value="uk">UK</option> */}
                                </select>
                                <label htmlFor="floatingBirthCountry">
                                    {birthCountryFocus ? "SELECT BIRTH COUNTRY" : "Birth Country"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                className="form-control"
                                id="floatingBirthState"
                                name="birthState"
                                value={formData.birthState || ""}
                                onChange={handleChange}
                                onFocus={() => setBirthStateFocus(true)}
                                onBlur={() => setBirthStateFocus(false)}
                            >
                                <option value="">Select Birth State</option>
                                {states.map((state) => (
                                    <option key={state.id} value={state.id}>{state.state_name}</option>
                                ))}
                            </select>
                            <label htmlFor="floatingBirthState">
                                {birthStateFocus ? "SELECT BIRTH STATE" : "Birth State"}
                            </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                className="form-control"
                                id="floatingBirthDistrict"
                                name="birthDistrict"
                                value={formData.birthDistrict || ""}
                                onChange={handleChange}
                                onFocus={() => setBirthDistrictFocus(true)}
                                onBlur={() => setBirthDistrictFocus(false)}
                                disabled={!formData.birthState || loadingBirthDistricts}
                            >
                                <option value="">Select Birth District</option>
                                {birthDistricts.map((district) => (
                                    <option key={district.id} value={district.id}>{district.District_name}</option>
                                ))}
                            </select>
                            <label htmlFor="floatingBirthDistrict">
                                {birthDistrictFocus ? "SELECT BIRTH DISTRICT" : "Birth District"}
                            </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingPlaceOfBirth"
                                    name="placeOfBirth"
                                    value={formData.placeOfBirth || ""}
                                    onChange={handleChange}
                                    onFocus={() => setPlaceOfBirthFocus(true)}
                                    onBlur={() => setPlaceOfBirthFocus(false)}
                                    placeholder="Place of Birth/Nativity"
                                />
                                <label htmlFor="floatingPlaceOfBirth">
                                    {placeOfBirthFocus
                                        ? "ENTER PLACE OF BIRTH/NATIVITY"
                                        : "Place of Birth/Nativity"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="floatingDob"
                                    name="dob"
                                    value={formData.dob || ""}
                                    onChange={handleChange}
                                    onFocus={() => setDobFocus(true)}
                                    onBlur={() => setDobFocus(false)}
                                    placeholder="Date of Birth"
                                />
                                <label htmlFor="floatingDob">
                                    {dobFocus ? "ENTER DATE OF BIRTH" : "Date of Birth"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingEmail"
                                    name="email"
                                    value={formData.email || ""}
                                    onChange={handleChange}
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    placeholder="Email Id"
                                />
                                <label htmlFor="floatingEmail">
                                    {emailFocus ? "ENTER EMAIL ID" : "Email Id"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingPan"
                                    name="pan"
                                    value={formData.pan || ""}
                                    onChange={handleChange}
                                    onFocus={() => setPanFocus(true)}
                                    onBlur={() => setPanFocus(false)}
                                    placeholder="Permanent Account No"
                                />
                                <label htmlFor="floatingPan">
                                    {panFocus
                                        ? "ENTER PERMANENT ACCOUNT NO"
                                        : "Permanent Account No"}
                                </label>
                            </div>
                        </div>
                    </div>
                    <h3>Address</h3>
                    <div className="row">
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingPresentAddress"
                                    name="presentAddress"
                                    value={formData.presentAddress || ""}
                                    onChange={handleChange}
                                    onFocus={() => setPresentAddressFocus(true)}
                                    onBlur={() => setPresentAddressFocus(false)}
                                    placeholder="Present Address"
                                />
                                <label htmlFor="floatingPresentAddress">
                                    {presentAddressFocus
                                        ? "ENTER PRESENT ADDRESS"
                                        : "Present Address"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                className="form-control"
                                id="floatingState"
                                name="state"
                                value={formData.state || ""}
                                onChange={handleChange}
                                onFocus={() => setStateFocus(true)}
                                onBlur={() => setStateFocus(false)}
                            >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state.id} value={state.id}>{state.state_name}</option>
                                ))}
                            </select>
                            <label htmlFor="floatingState">
                                {stateFocus ? "SELECT STATE" : "State"}
                            </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                className="form-control"
                                id="floatingDistrict"
                                name="district"
                                value={formData.district || ""}
                                onChange={handleChange}
                                onFocus={() => setDistrictFocus(true)}
                                onBlur={() => setDistrictFocus(false)}
                                disabled={!formData.state || loadingDistricts}
                            >
                                <option value="">Select District</option>
                                {districts.map((district) => (
                                    <option key={district.id} value={district.id}>{district.District_name}</option>
                                ))}
                            </select>
                            <label htmlFor="floatingDistrict">
                                {districtFocus ? "SELECT DISTRICT" : "District"}
                            </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="floatingResidingSince"
                                    name="residingSince"
                                    value={formData.residingSince || ""}
                                    onChange={handleChange}
                                    onFocus={() => setResidingSinceFocus(true)}
                                    onBlur={() => setResidingSinceFocus(false)}
                                    placeholder="Since When Residing"
                                />
                                <label htmlFor="floatingResidingSince">
                                    {residingSinceFocus
                                        ? "ENTER SINCE WHEN RESIDING"
                                        : "Since When Residing"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="floatingTelOffice"
                                    name="telOffice"
                                    value={formData.telOffice || ""}
                                    onChange={handleChange}
                                    onFocus={() => setTelOfficeFocus(true)}
                                    onBlur={() => setTelOfficeFocus(false)}
                                    placeholder="Telephone Number (Office)"
                                />
                                <label htmlFor="floatingTelOffice">
                                    {telOfficeFocus
                                        ? "ENTER TELEPHONE NUMBER (OFFICE)"
                                        : "Telephone Number (Office)"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="floatingTelResidence"
                                    name="telResidence"
                                    value={formData.telResidence || ""}
                                    onChange={handleChange}
                                    onFocus={() => setTelResidenceFocus(true)}
                                    onBlur={() => setTelResidenceFocus(false)}
                                    placeholder="Telephone Number (Residence)"
                                />
                                <label htmlFor="floatingTelResidence">
                                    {telResidenceFocus
                                        ? "ENTER TELEPHONE NUMBER (RESIDENCE)"
                                        : "Telephone Number (Residence)"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="floatingMobile"
                                    name="mobile"
                                    value={formData.mobile || ""}
                                    onChange={handleChange}
                                    onFocus={() => setMobileFocus(true)}
                                    onBlur={() => setMobileFocus(false)}
                                    placeholder="Mobile Number"
                                />
                                <label htmlFor="floatingMobile">
                                    {mobileFocus ? "ENTER MOBILE NUMBER" : "Mobile Number"}
                                </label>
                            </div>
                        </div>
                        {/* <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                    className="form-control"
                                    id="floatingNormalPoliceStation"
                                    name="normalPoliceStation"
                                    value={formData.normalPoliceStation || ""}
                                    onChange={handleChange}
                                    onFocus={() => setNormalPoliceStationFocus(true)}
                                    onBlur={() => setNormalPoliceStationFocus(false)}
                                >
                                    <option value="">Select Normal Police Station</option>
                                    <option value="station1">Station 1</option>
                                    <option value="station2">Station 2</option>
                                </select>
                                <label htmlFor="floatingNormalPoliceStation">
                                    {normalPoliceStationFocus
                                        ? "SELECT NORMAL POLICE STATION"
                                        : "Normal Police Station"}
                                </label>
                            </div>
                        </div> */}
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                    className="form-control"
                                    id="floatingNearestPoliceStation"
                                    name="nearestPoliceStation"
                                    value={formData.nearestPoliceStation || ""}
                                    onChange={handleChange}
                                    onFocus={() => setNearestPoliceStationFocus(true)}
                                    onBlur={() => setNearestPoliceStationFocus(false)}
                                >
                                    <option value="">Select Nearest Police Station</option>
                                    <option value="stationA">Station A</option>
                                    <option value="stationB">Station B</option>
                                </select>
                                <label htmlFor="floatingNearestPoliceStation">
                                    {nearestPoliceStationFocus
                                        ? "SELECT NEAREST POLICE STATION"
                                        : "Nearest Police Station"}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="address-same">
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                        <label htmlFor="vehicle1">Permanent Address Same as Present Address</label>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingPermanentAddress"
                                    name="permanentAddress"
                                    value={formData.permanentAddress || ""}
                                    onChange={handleChange}
                                    onFocus={() => setPresentAddressFocus(true)}
                                    onBlur={() => setPresentAddressFocus(false)}
                                    placeholder="Permanent Address"
                                />
                                <label htmlFor="floatingPermanentAddress">
                                    {presentAddressFocus
                                        ? "ENTER PERMANENT ADDRESS"
                                        : "Permanent Address"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                className="form-control"
                                id="floatingState"
                                name="state"
                                value={formData.state || ""}
                                onChange={handleChange}
                                onFocus={() => setStateFocus(true)}
                                onBlur={() => setStateFocus(false)}
                            >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state.id} value={state.id}>{state.state_name}</option>
                                ))}
                            </select>
                            <label htmlFor="floatingState">
                                {stateFocus ? "SELECT STATE" : "State"}
                            </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                    className="form-control"
                                    id="floatingDistrict"
                                    name="district"
                                    value={formData.district || ""}
                                    onChange={handleChange}
                                    onFocus={() => setDistrictFocus(true)}
                                    onBlur={() => setDistrictFocus(false)}
                                    disabled={!formData.state || loadingDistricts}
                                >
                                    <option value="">Select District</option>
                                    {districts.map((district) => (
                                        <option key={district.id} value={district.id}>{district.District_name}</option>
                                    ))}
                                </select>
                                <label htmlFor="floatingDistrict">
                                    {districtFocus ? "SELECT DISTRICT" : "District"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingOfficeAddress1"
                                    name="officeAddress1"
                                    value={formData.officeAddress1 || ""}
                                    onChange={handleChange}
                                    onFocus={() => setOfficeAddress1Focus(true)}
                                    onBlur={() => setOfficeAddress1Focus(false)}
                                    placeholder="Office/Business Address 1"
                                />
                                <label htmlFor="floatingOfficeAddress1">
                                    {officeAddress1Focus
                                        ? "ENTER OFFICE/BUSINESS ADDRESS 1"
                                        : "Office/Business Address 1"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingOfficeAddress2"
                                    name="officeAddress2"
                                    value={formData.officeAddress2 || ""}
                                    onChange={handleChange}
                                    onFocus={() => setOfficeAddress2Focus(true)}
                                    onBlur={() => setOfficeAddress2Focus(false)}
                                    placeholder="Office/Business Address 2"
                                />
                                <label htmlFor="floatingOfficeAddress2">
                                    {officeAddress2Focus
                                        ? "ENTER OFFICE/BUSINESS ADDRESS 2"
                                        : "Office/Business Address 2"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                    className="form-control"
                                    id="floatingNearestPoliceStation"
                                    name="nearestPoliceStation"
                                    value={formData.nearestPoliceStation || ""}
                                    onChange={handleChange}
                                    onFocus={() => setNearestPoliceStationFocus(true)}
                                    onBlur={() => setNearestPoliceStationFocus(false)}
                                >
                                    <option value="">Select Nearest Police Station</option>
                                    <option value="stationA">Station A</option>
                                    <option value="stationB">Station B</option>
                                </select>
                                <label htmlFor="floatingNearestPoliceStation">
                                    {nearestPoliceStationFocus
                                        ? "SELECT NEAREST POLICE STATION"
                                        : "Nearest Police Station"}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <div className="form-floating">
                                <select
                                    className="form-control"
                                    id="floatingOccupation"
                                    name="occupation"
                                    value={formData.occupation || ""}
                                    onChange={handleChange}
                                    onFocus={() => setOccupationFocus(true)}
                                    onBlur={() => setOccupationFocus(false)}
                                >
                                    <option value="">Select Occupation</option>
                                    <option value="professional">Professional</option>
                                    <option value="business">Business</option>
                                    <option value="student">Student</option>
                                    <option value="retired">Retired</option>
                                    <option value="other">Other</option>
                                </select>
                                <label htmlFor="floatingOccupation">
                                    {occupationFocus ? "SELECT OCCUPATION" : "Occupation"}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <div className="captch-text d-flex align-items-center">
                                <h3 style={{ marginBottom: "5px", marginRight: '10px', borderColor: 'transparent', padding: '0' }}>
                                    {captcha}
                                </h3>
                                <button
                                    className="btn-captcha-refresh"
                                    onClick={handleCaptchaRefresh}
                                    type="button"
                                >
                                    <i className="fa-solid fa-arrows-rotate"></i>
                                </button>
                            </div>
                            <div className="form-floating mb-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="captchaInput"
                                    value={captchaInput}
                                    onChange={(e) => setCaptchaInput(e.target.value)}
                                    onFocus={() => setCaptchaFocus(true)}
                                    onBlur={() => setCaptchaFocus(false)}
                                    placeholder="Enter above shown captcha"
                                />
                                <label htmlFor="captchaInput">
                                    {captchaFocus ? "ENTER CAPTCHA" : "Captcha"}
                                </label>
                                {captchaError && (
                                    <div style={{ color: 'red', fontSize: '0.9em', marginTop: '5px' }}>
                                        {captchaError}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};


const AdditionalDetails = ({ formData, handleChange, handleReset }) => {
    // Function to generate a random CAPTCHA (e.g., a 6-character string)
    const generateCaptcha = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    // State for each checkbox, initialized to false (unchecked)
    const [checkboxStates, setCheckboxStates] = useState({
        cropProtection: false,
        hasBeenConvicted: false,
        orderedToExecuteBond: false,
        prohibitedUnderArmsAct: false,
        previouslyApplied: false,
        licenceSuspendedOrRevoked: false,
        familyMemberLicence: false,
        safePlaceAndTraining: false,
    });

    // State for CAPTCHA
    const [captcha, setCaptcha] = useState(generateCaptcha()); // Now generateCaptcha is defined
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaFocus, setCaptchaFocus] = useState(false);
    const [captchaError, setCaptchaError] = useState('');

    // Handler for CAPTCHA refresh
    const handleCaptchaRefresh = () => {
        setCaptcha(generateCaptcha());
        setCaptchaInput('');
        setCaptchaError('');
    };

    // Generic handler for checkbox changes
    const handleCheckboxChange = (e, fieldName, fieldsToClear = []) => {
        const isChecked = e.target.checked;
        setCheckboxStates((prev) => ({ ...prev, [fieldName]: isChecked }));

        // Update formData for the checkbox
        handleChange({
            target: {
                name: e.target.name,
                value: isChecked,
                type: 'checkbox',
            },
        });

        // Clear associated fields when unchecked
        if (!isChecked) {
            fieldsToClear.forEach((field) => {
                handleChange({ target: { name: field, value: '' } });
            });
        }
    };

    return (
        <div className="mb-4">
            <div className="identity-of-applicant">
                <h4>Additional Details</h4>
            </div>
            <div>
                {/* Crop Protection Checkbox */}
                <div className="address-same under-ru mb-3">
                    <input
                        type="checkbox"
                        id="under-rule"
                        name="under-rule"
                        checked={checkboxStates.cropProtection}
                        onChange={(e) =>
                            handleCheckboxChange(e, 'cropProtection', [
                                'locationVillage',
                                'areaLand',
                            ])
                        }
                    />
                    <label htmlFor="under-rule" className="ms-2">
                        Additional Particulars if the licence is required for crop protection under rule 33
                    </label>
                </div>
                {checkboxStates.cropProtection && (
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingLocationVillage"
                                    name="locationVillage"
                                    value={formData.locationVillage || ''}
                                    onChange={handleChange}
                                    placeholder="Location (Village)"
                                />
                                <label htmlFor="floatingLocationVillage">Location (Village)</label>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingAreaLand"
                                    name="areaLand"
                                    value={formData.areaLand || ''}
                                    onChange={handleChange}
                                    placeholder="Area of land under cultivation"
                                />
                                <label htmlFor="floatingAreaLand">Area of land under cultivation</label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Convicted Checkbox */}
                <div className="address-same under-ru mb-3">
                    <input
                        type="checkbox"
                        id="hasBeenConvicted"
                        name="hasBeenConvicted"
                        checked={checkboxStates.hasBeenConvicted}
                        onChange={(e) =>
                            handleCheckboxChange(e, 'hasBeenConvicted', ['convictionDetails'])
                        }
                    />
                    <label htmlFor="hasBeenConvicted" className="ms-2">
                        Whether the applicant has been convicted
                    </label>
                </div>
                {checkboxStates.hasBeenConvicted && (
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="floatingConvictionDetails"
                                    name="convictionDetails"
                                    value={formData.convictionDetails || ''}
                                    onChange={handleChange}
                                    placeholder="Details of Conviction"
                                    rows="4"
                                />
                                <label htmlFor="floatingConvictionDetails">Details of Conviction</label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bond Ordered Checkbox */}
                <div className="address-same under-ru mb-3">
                    <input
                        type="checkbox"
                        id="orderedToExecuteBond"
                        name="orderedToExecuteBond"
                        checked={checkboxStates.orderedToExecuteBond}
                        onChange={(e) =>
                            handleCheckboxChange(e, 'orderedToExecuteBond', ['bondDetails'])
                        }
                    />
                    <label htmlFor="orderedToExecuteBond" className="ms-2">
                        Whether the applicant has been ordered to execute a bond under Chapter VIII of Code of Criminal Procedure 1973 (2 of 1974) for keeping the peace or for good behavior
                    </label>
                </div>
                {checkboxStates.orderedToExecuteBond && (
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="floatingBondDetails"
                                    name="bondDetails"
                                    value={formData.bondDetails || ''}
                                    onChange={handleChange}
                                    placeholder="Details of Bond Order"
                                    rows="4"
                                />
                                <label htmlFor="floatingBondDetails">Details of Bond Order</label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Prohibited Under Arms Act Checkbox */}
                <div className="address-same under-ru mb-3">
                    <input
                        type="checkbox"
                        id="prohibitedUnderArmsAct"
                        name="prohibitedUnderArmsAct"
                        checked={checkboxStates.prohibitedUnderArmsAct}
                        onChange={(e) =>
                            handleCheckboxChange(e, 'prohibitedUnderArmsAct', ['prohibitionDetails'])
                        }
                    />
                    <label htmlFor="prohibitedUnderArmsAct" className="ms-2">
                        Whether the applicant has been prohibited under the Arms Act 1959 or any other law from having the arms or ammunition
                    </label>
                </div>
                {checkboxStates.prohibitedUnderArmsAct && (
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="floatingProhibitionDetails"
                                    name="prohibitionDetails"
                                    value={formData.prohibitionDetails || ''}
                                    onChange={handleChange}
                                    placeholder="Details of Prohibition"
                                    rows="4"
                                />
                                <label htmlFor="floatingProhibitionDetails">Details of Prohibition</label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Previously Applied Checkbox */}
                <div className="address-same under-ru mb-3">
                    <input
                        type="checkbox"
                        id="previouslyApplied"
                        name="previouslyApplied"
                        checked={checkboxStates.previouslyApplied}
                        onChange={(e) =>
                            handleCheckboxChange(e, 'previouslyApplied', [
                                'previousApplicationDetails',
                                'previousApplicationResult',
                            ])
                        }
                    />
                    <label htmlFor="previouslyApplied" className="ms-2">
                        The applicant applied for a licence before - if so when to whom and with what result
                    </label>
                </div>
                {checkboxStates.previouslyApplied && (
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingPreviousApplicationDetails"
                                    name="previousApplicationDetails"
                                    value={formData.previousApplicationDetails || ''}
                                    onChange={handleChange}
                                    placeholder="Previous Application Details (When and To Whom)"
                                />
                                <label htmlFor="floatingPreviousApplicationDetails">
                                    Previous Application Details (When and To Whom)
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingPreviousApplicationResult"
                                    name="previousApplicationResult"
                                    value={formData.previousApplicationResult || ''}
                                    onChange={handleChange}
                                    placeholder="Result of Previous Application"
                                />
                                <label htmlFor="floatingPreviousApplicationResult">
                                    Result of Previous Application
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Licence Suspended or Revoked Checkbox */}
                <div className="address-same under-ru mb-3">
                    <input
                        type="checkbox"
                        id="licenceSuspendedOrRevoked"
                        name="licenceSuspendedOrRevoked"
                        checked={checkboxStates.licenceSuspendedOrRevoked}
                        onChange={(e) =>
                            handleCheckboxChange(e, 'licenceSuspendedOrRevoked', [
                                'suspensionRevocationDetails',
                            ])
                        }
                    />
                    <label htmlFor="licenceSuspendedOrRevoked" className="ms-2">
                        The applicant licence was ever suspended or cancelled/revoked
                    </label>
                </div>
                {checkboxStates.licenceSuspendedOrRevoked && (
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="floatingSuspensionRevocationDetails"
                                    name="suspensionRevocationDetails"
                                    value={formData.suspensionRevocationDetails || ''}
                                    onChange={handleChange}
                                    placeholder="Details of Suspension or Revocation"
                                    rows="4"
                                />
                                <label htmlFor="floatingSuspensionRevocationDetails">
                                    Details of Suspension or Revocation
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Family Member Licence Checkbox */}
                <div className="address-same under-ru mb-3">
                    <input
                        type="checkbox"
                        id="familyMemberLicence"
                        name="familyMemberLicence"
                        checked={checkboxStates.familyMemberLicence}
                        onChange={(e) =>
                            handleCheckboxChange(e, 'familyMemberLicence', [
                                'familyMemberLicenceDetails',
                            ])
                        }
                    />
                    <label htmlFor="familyMemberLicence" className="ms-2">
                        Any other member of the applicant's family is in possession of any licence, if so, particulars thereof
                    </label>
                </div>
                {checkboxStates.familyMemberLicence && (
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="floatingFamilyMemberLicenceDetails"
                                    name="familyMemberLicenceDetails"
                                    value={formData.familyMemberLicenceDetails || ''}
                                    onChange={handleChange}
                                    placeholder="Details of Family Member's Licence"
                                    rows="4"
                                />
                                <label htmlFor="floatingFamilyMemberLicenceDetails">
                                    Details of Family Member's Licence
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Safe Place and Training Checkbox */}
                <div className="address-same under-ru mb-3">
                    <input
                        type="checkbox"
                        id="safePlaceAndTraining"
                        name="safePlaceAndTraining"
                        checked={checkboxStates.safePlaceAndTraining}
                        onChange={(e) =>
                            handleCheckboxChange(e, 'safePlaceAndTraining', [
                                'safePlaceTrainingDetails',
                            ])
                        }
                    />
                    <label htmlFor="safePlaceAndTraining" className="ms-2">
                        The applicant has a safe place to keep the arms and ammunition and has undergone prescribed training as specified under rule 10
                    </label>
                </div>
                {checkboxStates.safePlaceAndTraining && (
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="floatingSafePlaceTrainingDetails"
                                    name="safePlaceTrainingDetails"
                                    value={formData.safePlaceTrainingDetails || ''}
                                    onChange={handleChange}
                                    placeholder="Details of Safe Place and Training"
                                    rows="4"
                                />
                                <label htmlFor="floatingSafePlaceTrainingDetails">
                                    Details of Safe Place and Training
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <div className="captch-text d-flex align-items-center mb-2">
                    <h3 style={{ marginBottom: 0, marginRight: '10px' }}>
                        {captcha}
                    </h3>
                    <button
                        className="btn-captcha-refresh"
                        onClick={handleCaptchaRefresh}
                        type="button"
                        style={{ border: 'none', background: 'none', padding: 0 }}
                    >
                        <i className="fa-solid fa-arrows-rotate"></i>
                    </button>
                </div>
                <div className="form-floating mb-4">
                    <input
                        type="text"
                        className="form-control"
                        id="captchaInput"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        onFocus={() => setCaptchaFocus(true)}
                        onBlur={() => setCaptchaFocus(false)}
                        placeholder={captchaFocus ? 'Enter above shown captcha' : ''}
                    />
                    <label htmlFor="captchaInput">Captcha</label>
                    {captchaError && (
                        <div style={{ color: 'red', fontSize: '0.9em', marginTop: '5px' }}>
                            {captchaError}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


const LicenseSpecificDetails = ({ formData, handleChange, handleReset }) => {
    const [presentAddressFocus, setPresentAddressFocus] = useState(false);
    const [captcha, setCaptcha] = useState(''); // CAPTCHA value
    const [captchaInput, setCaptchaInput] = useState(''); // User-entered CAPTCHA
    const [captchaFocus, setCaptchaFocus] = useState(false); // Focus state for CAPTCHA input
    const [captchaError, setCaptchaError] = useState(''); // CAPTCHA error message

    // Initialize CAPTCHA when component mounts
    useEffect(() => {
        generateCaptcha();
    }, []);

    // Function to generate a new CAPTCHA
    const generateCaptcha = () => {
        const newCaptcha = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate 6-character random string
        setCaptcha(newCaptcha);
        setCaptchaInput(''); // Clear user input
        setCaptchaError(''); // Clear error message
    };

    // Handle CAPTCHA refresh
    const handleCaptchaRefresh = () => {
        generateCaptcha();
    };

    // Optional: Validate CAPTCHA on input change
    const handleCaptchaInputChange = (e) => {
        const userInput = e.target.value;
        setCaptchaInput(userInput);
        if (userInput && userInput !== captcha) {
            setCaptchaError('Invalid CAPTCHA');
        } else {
            setCaptchaError('');
        }
    };

    return (
        <div className="mb-4">
            <div className="identity-of-applicant">
                <h4>Licence Specific Details</h4>
            </div>
            <form>
                <div className="mb-3">
                    <div className="row">
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingPresentAddress"
                                    name="presentAddress"
                                    value={formData.presentAddress || ""}
                                    onChange={handleChange}
                                    onFocus={() => setPresentAddressFocus(true)}
                                    onBlur={() => setPresentAddressFocus(false)}
                                    placeholder="Present Address"
                                />
                                <label htmlFor="floatingPresentAddress">
                                    {presentAddressFocus
                                        ? "ENTER PRESENT ADDRESS"
                                        : "Present Address"}
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                    className="form-control"
                                    id="floatingNeedForLicense"
                                    name="needForLicense"
                                    value={formData.needForLicense || ""}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Need for License</option>
                                    <option value="self_defense">Self Defense</option>
                                    <option value="sport">Sport</option>
                                    <option value="hunting">Hunting</option>
                                    <option value="professional">Professional</option>
                                    <option value="other">Other</option>
                                </select>
                                <label htmlFor="floatingNeedForLicense">Need for License</label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                    className="form-control"
                                    id="floatingWeaponCategory"
                                    name="weaponCategory"
                                    value={formData.weaponCategory || ""}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Weapon Category</option>
                                    <option value="handgun">Handgun</option>
                                    <option value="rifle">Rifle</option>
                                    <option value="shotgun">Shotgun</option>
                                    <option value="other">Other</option>
                                </select>
                                <label htmlFor="floatingWeaponCategory">Weapon Category</label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                    className="form-control"
                                    id="floatingWeaponType"
                                    name="weaponType"
                                    value={formData.weaponType || ""}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Weapon Type</option>
                                    <option value="pistol">Pistol</option>
                                    <option value="revolver">Revolver</option>
                                    <option value="bolt_action">Bolt Action</option>
                                    <option value="semi_automatic">Semi-Automatic</option>
                                    <option value="pump_action">Pump Action</option>
                                </select>
                                <label htmlFor="floatingWeaponType">Weapon Type</label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingArmsAmmunition"
                                    name="armsAmmunition"
                                    value={formData.armsAmmunition || ""}
                                    onChange={handleChange}
                                    placeholder="Arms & Ammunition Details"
                                />
                                <label htmlFor="floatingArmsAmmunition">Arms & Ammunition Details</label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <select
                                    className="form-control"
                                    id="floatingAreaValidity"
                                    name="areaValidity"
                                    value={formData.areaValidity || ""}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Area Validity</option>
                                    <option value="state">State</option>
                                    <option value="national">National</option>
                                    <option value="specific_district">Specific District</option>
                                </select>
                                <label htmlFor="floatingAreaValidity">Area Validity</label>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingSpecialConsideration"
                                    name="specialConsideration"
                                    value={formData.specialConsideration || ""}
                                    onChange={handleChange}
                                    placeholder="Claims for Special Consideration"
                                />
                                <label htmlFor="floatingSpecialConsideration">Claims for Special Consideration</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="captch-text d-flex align-items-center mb-2">
                                <h3 style={{ marginBottom: 0, marginRight: '10px' }}>
                                    {captcha}
                                </h3>
                                <button
                                    className="btn-captcha-refresh"
                                    onClick={handleCaptchaRefresh}
                                    type="button"
                                    style={{ border: 'none', background: 'none', padding: 0 }}
                                >
                                    <i className="fa-solid fa-arrows-rotate"></i>
                                </button>
                            </div>
                            <div className="form-floating mb-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="captchaInput"
                                    value={captchaInput}
                                    onChange={handleCaptchaInputChange}
                                    onFocus={() => setCaptchaFocus(true)}
                                    onBlur={() => setCaptchaFocus(false)}
                                    placeholder={captchaFocus ? 'Enter above shown captcha' : ''}
                                />
                                <label htmlFor="captchaInput">Captcha</label>
                                {captchaError && (
                                    <div style={{ color: 'red', fontSize: '0.9em', marginTop: '5px' }}>
                                        {captchaError}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};


const ApplyNow = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [birthDistricts, setBirthDistricts] = useState([]);
    const [loadingBirthDistricts, setLoadingBirthDistricts] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

  // Retrieve passed data
  const passedData = location.state || {};

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const validateStepFields = () => {
    if (currentStep === 0) {
        // List only the required fields for step 0
        const requiredFields = [
            "applicationName",
            "parentSpouse",
            "parentSpouseName",
            "gender",
            "birthCountry",
            "birthState",
            "birthDistrict",
            "placeOfBirth",
            "dob",
            "email",
            "pan",
            "presentAddress",
            "state",
            "district",
            "residingSince",
            "telOffice",
            "telResidence",
            "mobile",
            // "normalPoliceStation",
            "nearestPoliceStation",
            "permanentAddress",
            "officeAddress1",
            "officeAddress2",
            "occupation"
        ];
        // Check for missing or empty fields
        const missing = requiredFields.filter(
            (field) => !formData[field] || formData[field].toString().trim() === ""
        );
        if (missing.length > 0) {
            alert(`Please fill all required fields before proceeding. Missing: ${missing.join(", ")}`);
            return false;
        }
    }
    return true;
};

const handleNext = () => {
    if (!validateStepFields()) return;

    if (currentStep === 0) {
        // Validate CAPTCHA before proceeding to the next step
        const captchaValid = document.getElementById("captchaInput").value === document.getElementById("captchaInput").parentElement.parentElement.querySelector(".captch-text h3").textContent.trim();
        if (!captchaValid) {
            document.getElementById("captchaInput").parentElement.parentElement.querySelector(".captch-text + div").lastChild.textContent = "Invalid CAPTCHA. Please try again.";
            return;
        }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 2));
};

    const handleReset = () => {
        setFormData({});
        setCurrentStep(0);
        // Regenerate CAPTCHA
        const captchaInput = document.getElementById("captchaInput");
        if (captchaInput) {
            captchaInput.value = "";
            const captchaText = captchaInput.parentElement.parentElement.querySelector(".captch-text h3");
            if (captchaText) {
                captchaText.textContent = generateCaptcha();
            }
            const captchaError = captchaInput.parentElement.parentElement.querySelector(".captch-text + div").lastChild;
            if (captchaError) {
                captchaError.textContent = "";
            }
        }
    };

    function generateCaptcha() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload using formData
    const payload = {
        category: passedData.category || "",
        state: passedData.state || "",
        district: passedData.district || "",
        licensing_authority: passedData.licensingAuthority || "DM ",
        service: passedData.service ,

        applicant_name: formData.applicationName || "",
        gender: formData.gender === "male" ? "Male" : formData.gender === "female" ? "Female" : "Other",
        parent_spouse_type: formData.parentSpouse === "parent" ? "Father" : "Spouse",
        parent_spouse_name: formData.parentSpouseName || "",
        birth_country: formData.birthCountry || "India",
        birth_state: formData.birthState || "Uttar Pradesh",
        birth_district: formData.birthDistrict || "Lucknow",
        birth_place: formData.placeOfBirth || "",
        date_of_birth: formData.dob || "",
        pan_number: formData.pan || "",
        email: formData.email || "",

        present_address: formData.presentAddress || "",
        present_state: formData.state || "Uttar Pradesh",
        present_district: formData.district || "Lucknow",
        residence_since: formData.residingSince || "",

        office_phone: formData.telOffice || "",
        residence_phone: formData.telResidence || "",
        mobile_number: formData.mobile || "",
        normal_police_station: formData.normalPoliceStation || "",
        nearest_police_station: formData.nearestPoliceStation || "",

        permanent_address: formData.permanentAddress || "",
        permanent_state: formData.state || "Uttar Pradesh",
        permanent_district: formData.district || "Lucknow",

        office_address_1: formData.officeAddress1 || "",
        office_address_2: formData.officeAddress2 || "",
        occupation: formData.occupation || "",

        crop_protection_required: formData.cropProtection ? "Yes" : "No",
        village_location: formData.locationVillage || "",
        land_area: formData.areaLand || "",

        convicted: formData.hasBeenConvicted ? "Yes" : "No",
        conviction_details: formData.convictionDetails || "",
        bond_ordered: formData.orderedToExecuteBond ? "Yes" : "No",
        bond_details: formData.bondDetails || "",
        prohibited_under_arms_act: formData.prohibitedUnderArmsAct ? "Yes" : "No",
        prohibition_details: formData.prohibitionDetails || "",
        previously_applied: formData.previouslyApplied ? "Yes" : "No",
        previous_application_details: formData.previousApplicationDetails || "",
        previous_application_result: formData.previousApplicationResult || "",
        suspended_or_revoked: formData.licenceSuspendedOrRevoked ? "Yes" : "No",
        suspension_details: formData.suspensionRevocationDetails || "",
        family_licence_holder: formData.familyMemberLicence ? "Yes" : "No",
        family_licence_details: formData.familyMemberLicenceDetails || "",
        has_safe_place_and_training: formData.safePlaceAndTraining ? "Yes" : "No",
        training_details: formData.safePlaceTrainingDetails || "",

        license_present_address: formData.presentAddress || "",
        need_for_license: formData.needForLicense || "",
        weapon_category: formData.weaponCategory || "",
        weapon_type: formData.weaponType || "",
        area_validity: formData.areaValidity || "",
        arms_ammunition_details: formData.armsAmmunition || "",
        special_consideration_claims: formData.specialConsideration || ""
    };

    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert("No authentication token found. Please login again.");
            return;
        }
        const response = await fetch('https://lampserver.uppolice.co.in/arms/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (data.status) {
            alert(data.message);
            if (data.application_id) {
                localStorage.setItem('application_id', data.application_id);
            }
            navigate("/upload-photos");
        } else {
            alert("Submission failed: " + data.message);
        }
    } catch (error) {
        alert("Error submitting application: " + error.message);
    }
};

useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await fetch('https://malkhana.uppolice.co.in/malkhana_licence/get-states.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                setStates(data);
            } catch (error) {
                setStates([]);
            }
        };
        fetchStates();
    }, []);

    // Fetch districts when state changes
    useEffect(() => {
        if (!formData.state) {
            setDistricts([]);
            return;
        }
        const fetchDistricts = async () => {
            setLoadingDistricts(true);
            try {
                const response = await fetch('https://malkhana.uppolice.co.in/malkhana_licence/get-districts.php', {
                    method: 'POST',
                    body: new URLSearchParams({ state_id: formData.state }),
                });
                const data = await response.json();
                setDistricts(data);
            } catch (error) {
                setDistricts([]);
            }
            setLoadingDistricts(false);
        };
        fetchDistricts();
    }, [formData.state]);
    
useEffect(() => {
    if (!formData.birthState) {
        setBirthDistricts([]);
        return;
    }
    const fetchBirthDistricts = async () => {
        setLoadingBirthDistricts(true);
        try {
            const response = await fetch('https://malkhana.uppolice.co.in/malkhana_licence/get-districts.php', {
                method: 'POST',
                body: new URLSearchParams({ state_id: formData.birthState }),
            });
            const data = await response.json();
            setBirthDistricts(data);
        } catch (error) {
            setBirthDistricts([]);
        }
        setLoadingBirthDistricts(false);
    };
    fetchBirthDistricts();
}, [formData.birthState]);


    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <IdentityOfApplicant
                        formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleReset={handleReset}
                    states={states} // <-- add this
                    districts={districts} // <-- add this
                    loadingDistricts={loadingDistricts} // <-- add this
                    birthDistricts={birthDistricts} // <-- add this
                    loadingBirthDistricts={loadingBirthDistricts} // <-- add this
                    />
                );
            case 1:
                return (
                    <AdditionalDetails
                        formData={formData}
                        handleChange={handleChange}
                        handleReset={handleReset}
                    />
                );
            case 2:
                return (
                    <LicenseSpecificDetails
                        formData={formData}
                        handleChange={handleChange}
                        handleReset={handleReset}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="asside">
                <div className="about-first">
                    <div className="row">
                        <div className="col-12 mb-24">
                            <div className="bg-box">
                                <div className="row">
                                    <div className="col-6">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th>State</th>
                                                    <td>{passedData.state || '-'}</td>
                                                </tr>
                                                <tr>
                                                    <th>District</th>
                                                    <td>{passedData.district || '-'}</td>
                                                </tr>
                                                <tr>
                                                    <th>Licensing Issuing Authority</th>
                                                     <td>{passedData.licensingAuthority || '-'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-6">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th>Application Category</th>
                                                    <td>{passedData.category || '-'}</td>
                                                </tr>
                                                <tr>
                                                    <th>Service</th>
                                                    <td>{passedData.service || '-'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mb-24">
                            <div className="bg-box">
                                <ProgressBar currentStep={currentStep} />
                                {renderStep()}
                                <div className="d-flex justify-content-end mt-4 gap-2">
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="btn btn-danger"
                                    >
                                        Reset
                                    </button>
                                    {currentStep < 2 ? (
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="btn btn-verify"
                                        >
                                            Next / Submit
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="btn btn-verify"
                                        >
                                            Complete
                                        </button>
                                    )}
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

export default ApplyNow;