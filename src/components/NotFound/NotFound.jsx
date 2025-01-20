import React, { useEffect } from 'react';
import './not.css';
import Hack from '../hackEffect/Hack';

function NotFound() {
  useEffect(() => {
    const typeEffect = (element, speed) => {
      const text = element.innerText;
      element.innerText = '';

      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; 
        element.appendChild(span);
      });

      const spans = Array.from(element.querySelectorAll('span'));
      spans.forEach((span, i) => {
        setTimeout(() => {
          span.classList.add('visible');
        }, i * speed);
      });
    };

    const elements = document.querySelectorAll('.output');
    elements.forEach((el) => {
      typeEffect(el, 50); 
    });
  }, []);

  return (
    <div className='NotFound'>
      <div className="noise"></div>
      <div className="overlay"></div>
      <div className="terminal">
        <h1 className='output'>Error <span className="errorcode">404</span></h1>
        <p className="output">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
        <p className="output">Please try to <a href="#1">go back</a> or <a href="/Home">return to the homepage</a>.</p>
        <p className="output">&copy; HADI CHOUAIEB</p>
        <p className="output">127.0.0.1</p>

      </div>
      {/* <Hack/> */}
    </div>
  );
}

export default NotFound;
