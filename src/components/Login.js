import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.svg'

// Helper function to generate random captcha
const generateCaptcha = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#';
  let captcha = '';
  for (let i = 0; i < 8; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [userFocus, setUserFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [captchaFocus, setCaptchaFocus] = useState(false);

  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [portalType, setPortalType] = useState('user');
  const navigate = useNavigate();

    useEffect(() => {
  setUserInput('');
  setPassword('');
  setCaptchaInput('');
  setCaptchaError('');
  setLoginError('');
  setLoginSuccess('');
  setCaptcha(generateCaptcha()); // Reset captcha as well
}, []);


  const handleCaptchaRefresh = (e) => {
    e.preventDefault();
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
    setCaptchaError('');
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoginError('');
  setLoginSuccess('');

  // Field validation
  if (!userInput.trim() && !password.trim()) {
    setLoginError('User Id/Mobile Number and Password are required.');
    return;
  }
  if (!userInput.trim()) {
    setLoginError('User Id or Mobile Number is required.');
    return;
  }
  if (!password.trim()) {
    setLoginError('Password is required.');
    return;
  }
  if (captchaInput !== captcha) {
    setCaptchaError('Captcha is incorrect.');
    return;
  }
  setCaptchaError('');

  let apiUrl = '';
    let payload = {};
    let redirectPath = '';

    if (portalType === 'user') {
      apiUrl = 'https://lampserver.uppolice.co.in/auth/login-user';
      payload = { user_input: userInput, password };
      redirectPath = '/Dashboard';
    } else {
      apiUrl = 'https://lampserver.uppolice.co.in/auth/portal-user';
      payload = { user_id: userInput, password };
      if (portalType === 'office') redirectPath = 'https://armslicence-office.callbee.xyz/Dashboard';
      else if (portalType === 'sdm') redirectPath = 'https://armslicence-sdm.callbee.xyz/Dashboard';
      else if (portalType === 'ps') redirectPath = 'https://armslicence-ps.callbee.xyz/Dashboard';
    }

   try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);

      if (data.status && data.token) {
  localStorage.setItem('authToken', data.token); // Always use data.token
  if (data.data && data.data.user_id) {
    localStorage.setItem('user_id', data.data.user_id);
    localStorage.setItem('role', data.data.role); // Optional: store role
  }
  setLoginSuccess('Login successful! Redirecting...');
 setTimeout(() => {
  if (portalType === 'user') {
    navigate('/Dashboard');
  } else if (redirectPath.startsWith('http')) {
    // For other portals, keep existing logic
    const params = new URLSearchParams({
      token: data.token,
      user_id: data.data?.user_id || '',
      role: data.data?.role || ''
    }).toString();
    window.location.href = `${redirectPath}?${params}`;
  } else {
    navigate(redirectPath);
  }
}, 1200);
} else {
  setLoginError(data.message || 'Login failed. Please check your credentials.');
}
    } catch (err) {
      setLoginError('Network error. Please try again.');
    }
  };

  return (
    <div>
      <div className='container'>
        <div className='row vh-100 d-flex align-items-center justify-content-center'>
          <div className='col-lg-6 col-md-8 col-12 my-3'>
            <div className="signin-page">
              <img src={logo} />
              <h2>Welcome to Arms Licence Portal (USER)</h2>
              <p>Please Login to your account and start the adventure</p>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-4">
                  <select
                    className="form-control"
                    id="portalType"
                    value={portalType}
                    onChange={e => setPortalType(e.target.value)}
                  >
                    <option value="user">User Portal</option>
                    <option value="sdm">SDM Portal</option>
                    <option value="ps">PS Portal</option>
                    <option value="office">Office Portal</option>
                  </select>
                  <label htmlFor="portalType">Select Portal</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    placeholder={userFocus ? "ENTER USER ID OR MOBILE NUMBER" : ""}
                  />
                  <label htmlFor="floatingInput">{userFocus ? "User Id " : "ENTER USER ID OR MOBILE NUMBER"}</label>
                </div>
                <div className="form-floating position-relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="floatingPassword"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setPassFocus(true)}
                    onBlur={() => setPassFocus(false)}
                    placeholder={passFocus ? "Password" : ""}
                  />
                  <label htmlFor="floatingPassword">{passFocus ? "Password" : "Password"}</label>
                  <span className='password-toggle'
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      zIndex: 2
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <i className="fa fa-eye"></i>
                    ) : (
                      <i className="fa fa-eye-slash"></i>
                    )}
                  </span>
                </div>
                <div className='captch-text d-flex align-items-center mb-2'>
                  <h3 style={{ marginBottom: 0, marginRight: '10px' }}>{captcha}</h3>
                  <button className='btn-captcha-refresh' onClick={handleCaptchaRefresh} type="button" style={{ border: 'none', background: 'none', padding: 0 }}>
                    <i className="fa-solid fa-arrows-rotate"></i>
                  </button>
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="captchaInput"
                    value={captchaInput}
                    onChange={e => setCaptchaInput(e.target.value)}
                    onFocus={() => setCaptchaFocus(true)}
                    onBlur={() => setCaptchaFocus(false)}
                    placeholder={captchaFocus ? "Enter above shown captcha" : ""}
                  />
                  <label htmlFor="captchaInput">{captchaFocus ? "Captcha" : "Enter above shown captcha"}</label>
                  {captchaError && (
                    <div style={{ color: 'red', fontSize: '0.9em', marginTop: '5px' }}>
                      {captchaError}
                    </div>
                  )}
                </div>
                {loginSuccess && (
                  <div style={{ color: 'green', fontSize: '0.9em', marginBottom: '10px' }}>
                    {loginSuccess}
                  </div>
                )}
                {loginError && (
                  <div style={{ color: 'red', fontSize: '0.9em', marginBottom: '10px' }}>
                    {loginError}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-login"
                >
                  Login
                </button>
              </form>
              <div className="create-acc">
                <p>Don't Have an Account? <Link to={"/registration"}> Register Here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login