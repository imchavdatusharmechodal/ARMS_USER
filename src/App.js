import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Scrolltotop from './Scrolltotop';
import Login from './components/Login';
import Registration from './components/Registration';
import NewAppliction from './components/NewAppliction';
import ApplyNow from './components/ApplyNow';
import UploadPhotos from './components/UploadPhotos';
import FilledPdf from './components/FilledPdf';
import UploadDocument from './components/UploadDocument';
import UploadSuccess from './components/UploadSuccess';
import React, { useState, useEffect } from 'react';


function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) localStorage.setItem('authToken', token);
  }, []);

  return (
    <div className="App"> 
      <Router>
      <Scrolltotop/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/new-appliction' element={<NewAppliction/>}/>
          <Route path='/apply-now' element={<ApplyNow/>}/>
          <Route path='/upload-photos' element={<UploadPhotos/>}/>
          <Route path='/filled-pdf/:id' element={<FilledPdf/>}/>
          <Route path='/UploadDocument' element={<UploadDocument/>}/>
          <Route path='/upload-success' element={<UploadSuccess/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
