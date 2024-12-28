import React from 'react';
import { useReactToPrint } from 'react-to-print';

const ButtonGroupComponent = ({ componentRef, activeForm, setActiveForm }) => {
   
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

  
    const handleContinue = () => {
        if (activeForm < 7) { 
            setActiveForm(activeForm + 1);
        }
    };

 
    const handleBack = () => {
        if (activeForm > 0) {
            setActiveForm(activeForm - 1);
        }
    };

    return (
        <div className='d-flex flex-column flex-md-row justify-content-between  mt-4 mb-5'>
            <div className="d-flex  flex-column flex-md-row">
                <button
                    type="button"
                    className="bg-grey col-12 col-md-auto btn-gold rounded px-5 py-2 mt-3 fs-6 mt-md-0  text-white"
                    onClick={handleBack}
                    disabled={activeForm === 0} 
                >
                    BACK
                </button>
                {activeForm < 7 && (
                    <button
                        type="button"
                        className="btn-gold rounded py-2 ms-md-2 mt-2 mt-md-0 text-white"
                        onClick={handleContinue}
                    >
                        CONTINUE
                    </button>
                )}
            </div>
            <div>
            {activeForm === 7 && ( // show Download PDF button only on the last form
                <div>
                    <button className="btn btn-gold me-2 text-uppercase col-12 col-md-auto px-4 mt-2 mt-md-0" onClick={handlePrint}>
                        Download PDF
                    </button>
                </div>
            )}
            </div>
        </div>
    );
};

export default ButtonGroupComponent;
