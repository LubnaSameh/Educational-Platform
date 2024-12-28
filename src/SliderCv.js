import React, { useState } from 'react';

export const Slider = ({ handleSlideChange, activeForm }) => {
  const steps = [
    { step: 0, label: 'MAIN INFORMATION' },
    { step: 1, label: 'SKILLS' },
    { step: 2, label: 'HOBBIES & INTERESTS' },
    { step: 3, label: 'ABOUT' },
    { step: 4, label: 'EXPERIENCE' },
    { step: 5, label: 'EDUCATION' },
    { step: 6, label: 'LINKS' },
    { step: 7, label: 'HONERS & AWARDS' },
  ];

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0); 
  const [scrollLeft, setScrollLeft] = useState(0); 

  const handleMouseDown = (e) => {
    setIsDragging(true); 
    setStartX(e.pageX - e.currentTarget.offsetLeft); 
    setScrollLeft(e.currentTarget.scrollLeft); 
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return; 
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2; 
    e.currentTarget.scrollLeft = scrollLeft - walk; 
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false); 
  };

  return (
    <div className="steps-slider container py-4 w-100 rounded" style={{ overflowX: 'auto' }}>
      <ul
        className="nav nav-pills justify-content-between d-flex flex-nowrap align-items-center p-0"
        style={{


          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          width: '100%',
        }}
        onWheel={(e) => {
          e.currentTarget.scrollLeft += e.deltaY; 
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {steps.map(({ step, label }) => (
          <li key={step} className="nav-item flex-shrink-0 me-4">
            <button
              className={`btn text-white d-flex align-items-center justify-content-center`}
              onClick={() => handleSlideChange(step)}
            >
              <span className={`badge me-3 ${activeForm === step ? 'active' : 'inactive'}`}>
                {step + 1}
              </span>

              <span className="text-start d-flex flex-column">
                {label.split(' ').reduce((acc, word, index, array) => {
                  if (word === '&' && index > 0) {
                    
                    acc[acc.length - 1] = (
                      <span key={index - 1}>
                        {acc[acc.length - 1].props.children} {word}
                      </span>
                    );
                  } else if (index === 0 || array[index - 1] === '&') {
                   
                    acc.push(
                      <span key={index}>
                        {word}
                      </span>
                    );
                  } else {
                    acc.push(
                      <span key={index}>
                        {word}
                      </span>
                    );
                  }
                  return acc;
                }, [])}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>

  );
};
