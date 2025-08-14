import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import axios from 'axios';


const NewApplication = () => {
  // State for dropdowns
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [licensingAuthority, setLicensingAuthority] = useState('');
  const [service, setService] = useState('');
  const [formError, setFormError] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [statesList, setStatesList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);

  // Navigation hook
  const navigate = useNavigate();

  // Sample data for dropdowns (replace with actual data from API or backend)
  const categories = ['Individual', 'Business', 'Organization'];
  const states = ['Gujarat', 'Maharashtra', 'Delhi', 'Karnataka'];
  const districts = {
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Delhi: ['Central Delhi', 'South Delhi', 'North Delhi'],
    Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
  };
  const licensingAuthorities = ['District Magistrate', 'Police Commissioner', 'State Licensing Board'];
  const services = ['New License', 'Renewal', 'Transfer', 'Modification'];


  useEffect(() => {
    axios.post('https://malkhana.uppolice.co.in/malkhana_licence/get-states.php', {}, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        setStatesList(response.data);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  }, []);

  // Fetch districts when a state is selected
  useEffect(() => {
    if (selectedState) {
      const formData = new FormData();
      formData.append('state_id', selectedState);

      axios.post('https://malkhana.uppolice.co.in/malkhana_licence/get-districts.php', formData)
        .then(response => {
          if (Array.isArray(response.data)) {
            setDistrictsList(response.data);
          } else {
            setDistrictsList([]);
          }
        })
        .catch(error => {
          console.error('Error fetching districts:', error);
          setDistrictsList([]);
        });
    } else {
      setDistrictsList([]);
    }
  }, [selectedState]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || !selectedState || !selectedDistrict || !licensingAuthority || !service) {
      setFormError('All fields are required.');
      return;
    }

    setFormError('');

    // Navigate to next page with state
    const selectedStateName = statesList.find((s) => s.id === selectedState)?.state_name || '';

    navigate('/apply-now', {
      state: {
        category,
        state: selectedStateName,
        district: selectedDistrict,
        licensingAuthority,
        service,
      },
    });
  };


  return (
    <div>
      <Sidebar />
      <div className="asside">
        <div className="about-first">
          <div className="row">
            <div className="col-12 mb-24">
              <div className="bg-box text-center application-header">
                <h1>Apply Online For Arms Licence</h1>
              </div>
            </div>
            <div className="col-12 mb-24">
              <div className="bg-box">
                <form className='row gy-3' onSubmit={handleSubmit}>
                  {/* Category Dropdown */}
                  <div className='col-lg-4 col-md-6 col-12'>
                    <div className="form-floating mb-4">
                      <select
                        className="form-control"
                        id="category"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          setDistrict(''); // Reset district when state changes
                        }}
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="category">Category</label>
                    </div>
                  </div>
                  {/* State Dropdown */}
                  <div className='col-lg-4 col-md-6 col-12'>
                    <div className="form-floating mb-4">
                      <select
                        className="form-control"
                        id="state"
                        value={selectedState}
                        onChange={(e) => {
                          setSelectedState(e.target.value);
                          setSelectedDistrict('');
                        }}
                      >
                        <option value="">Select State</option>
                        {statesList.map((state) => (
                          <option key={state.id} value={state.id}>
                            {state.state_name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="state">State</label>
                    </div>
                  </div>
                  {/* District Dropdown */}
                  <div className='col-lg-4 col-md-6 col-12'>
                    <div className="form-floating mb-4">
                      <select
                        className="form-control"
                        id="district"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        disabled={!selectedState}
                      >
                        <option value="">Select District</option>
                        {districtsList.map((dist) => (
                          <option key={dist.id} value={dist.District_name}>
                            {dist.District_name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="district">District</label>
                    </div>
                  </div>
                  {/* Licensing Authority Dropdown */}
                  <div className='col-lg-4 col-md-6 col-12'>
                    <div className="form-floating mb-4">
                      <select
                        className="form-control"
                        id="licensingAuthority"
                        value={licensingAuthority}
                        onChange={(e) => setLicensingAuthority(e.target.value)}
                      >
                        <option value="">Select Licensing Authority</option>
                        {licensingAuthorities.map((auth) => (
                          <option key={auth} value={auth}>
                            {auth}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="licensingAuthority">Name of Licensing Authority</label>
                    </div>
                  </div>
                  {/* Service Dropdown */}
                  <div className='col-lg-4 col-md-6 col-12'>
                    <div className="form-floating mb-4">
                      <select
                        className="form-control"
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                      >
                        <option value="">Select Service</option>
                        {services.map((serv) => (
                          <option key={serv} value={serv}>
                            {serv}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="service">Service</label>
                    </div>

                    {/* Error Message */}
                    {formError && (
                      <div style={{ color: 'red', fontSize: '0.9em', marginBottom: '10px' }}>
                        {formError}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                    <div className='col-12'>
                  <button type="submit" className="btn btn-verify">
                    Submit
                  </button>
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

export default NewApplication;