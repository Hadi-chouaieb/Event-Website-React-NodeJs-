import React, { useEffect, useRef } from 'react';
import "./hack.css"
const Hack = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const W = window.innerWidth;
    const H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

    const fontSize = 16;
    const columns = Math.floor(W / fontSize);
    const drops = Array(columns).fill(0); // Initialize drops array
    const str = " MTC ISET SFAX ";

    const draw = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.05)";
      context.fillRect(0, 0, W, H);
      context.font = `${fontSize}px monospace`;
      context.fillStyle = "#00cc33";

      for (let i = 0; i < columns; i++) {
        const index = Math.floor(Math.random() * str.length);
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        context.fillText(str[index], x, y);

        if (y >= canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 35);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='allEf'>
                  

            {/* <img src="/imgs/logo.png" alt="" className='imgMtc' />   */}

          <canvas ref={canvasRef} style={{ display: 'block'}} />


      
    </div>
  );
};

export default Hack;
