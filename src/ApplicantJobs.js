import React from 'react';

//remove  npm install styled-components


const ApplicantJobs = () => {
    const applications = [
        { applicant: "the Applicant name", experience: '2 Years', email: 'usertwo@gmail.com', mobile: '002011289304' },
        { applicant: "the company name", experience: '3 Years', email: 'usertwo@gmail.com', mobile: '002011289304' },
        { applicant: "the company name", experience: '1 Year', email: 'usertwo@gmail.com', mobile: '002011289304' },
        { applicant: "the company name", experience: '3 Years', email: 'usertwo@gmail.com', mobile: '002011289304' },
        { applicant: "the company name", experience: '2 Years', email: 'usertwo@gmail.com', mobile: '002011289304' },
        { applicant: "the company name", experience: '4 Years', email: 'usertwo@gmail.com', mobile: '002011289304' },
    ];

    return (
        <div className="mb-5 ">

                    {/* top title */}
                    <div className="row align-items-center justify-content-between mb-md-3 mt-3 mt-md-0 ">

                        <div className="col-md-5 text-md-start text-center">
                            <div className="header-title d-block fs-5 ">
                                Applications For "Job" at "company name"
                                <div className="linee mx-auto mx-md-0 w-25 d-none d-md-block"></div>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-dark articles-table">
                            <thead>
                                <tr>
                                    <th>Applicant</th>
                                    <th>Experience</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((application, index) => (
                                    <React.Fragment key={index}>
                                        {/* table for Mobile */}
                                        <tr className="d-block d-md-none px-0 w-100 col-12 mx-auto">
                                            <td className='d-flex mx-auto w-100 mt-3' colSpan="5">
                                                <div className="box row w-100 mx-auto mt-2 ">
                                                    <div className=" w-100 p-0 mx-auto ">
                                                        <div className="">
                                                            <h6 className='fw-bold fs-6'>Applicant:</h6>
                                                            <p className="mb-0 fs-5 mb-auto fw-lighter">{application.applicant}</p>
                                                        </div>
                                                        <div className= 'mx-auto w-100 p-0 m-0 d-flex justify-content-between'>
                                                             <div className="col-6 mt-3 p-0">
                                                            <h6 className="fw-bold fs-6">Experience:</h6>
                                                            <p className="fw-lighter fs-6">{application.experience}</p>
                                                        </div>
                                                        <div className="col-6 mt-3 p-0">
                                                            <h6 className='fw-bold text-start fs-6'>Mobile:</h6>
                                                            <p className="text-start fs-6 fw-lighter ">{application.mobile}</p>
                                                        </div>
                                                       
                                                        </div>
                                                       
                                                        <div className="col-7 mt-3 p-0">
                                                            <h6 className='fw-bold text-start fs-6'>Email:</h6>
                                                            <p className="text-start fs-6 fw-lighter ">{application.email}</p>
                                                        </div>
                                                        <div className='text-end'>
                                                            <button className="ButtonsTable w-100 w-sm-100 text-white" style={{ backgroundColor: '#BF9530' }}>
                                                                DOWNLOAD CV
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* table for Desktop */}
                                        <tr className="d-none d-md-table-row">
                                            <td data-label="Applicant">{application.applicant}</td>
                                            <td data-label="Experience">{application.experience}</td>
                                            <td data-label="Email">{application.email}</td>
                                            <td data-label="Mobile Number">{application.mobile}</td>
                                            <td className="text-end">
                                                <button className="ButtonsTable w-100 w-sm-100 text-white" style={{ backgroundColor: '#BF9530' }}>
                                                    DOWNLOAD CV
                                                </button>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <a href="#" className="arrow">
                            <i className="fas fa-chevron-left" style={{ color: '#BF9530' }}></i>
                        </a>

                        <a href="#">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <span>.....</span>
                        <a href="#" className="arrow">
                            <i className="fas fa-chevron-right" style={{ color: '#BF9530' }}></i>
                        </a>
                    </div>

                </div>
          
      
    );
};

export default ApplicantJobs;
