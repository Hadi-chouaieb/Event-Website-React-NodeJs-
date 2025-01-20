import React from 'react';
import './Loader.css'; // Import the CSS file

const Loader = () => {

  return (
    <div className='llod'>
    <img src="/imgs/server.gif" alt="" className='pngServ'/>
      <div className="loader-container">

        <div className="loader"></div>
        <div className="loading-text">Accessing... Please wait...</div>
      </div>
    </div>
  );
};

export default Loader;
