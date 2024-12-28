import React from 'react';

const Jobs = () => {
    const jobs = [
        { company: " the company name", position: " the position", status: 'Open', dateTime: 'Monday, June 5th 12:30 PM', applications: 20 },
        { company: " the company name", position: " the position", status: 'Open', dateTime: 'Monday, June 5th 12:30 PM', applications: 25 },
        { company: " the company name", position: " the position", status: 'Closed', dateTime: 'Monday, June 5th 12:30 PM', applications: 48 },
        { company: " the company name", position: " the position", status: 'Closed', dateTime: 'Monday, June 5th 12:30 PM', applications: 0 },
        { company: " the company name", position: " the position", status: 'Closed', dateTime: 'Monday, June 5th 12:30 PM', applications: 11 },
        { company: " the company name", position: " the position", status: 'Closed', dateTime: 'Monday, June 5th 12:30 PM', applications: 19 },
    ];

    return (
        <div className=" mb-5">
           
                {/* Top button */}
                <div className="mb-md-0 d-flex justify-content-end position-relative" style={{ top: '-95px' }}>  
                    <div className="d-none d-lg-block">
                        <button className=" btn-gold text-uppercase">Create New Job</button>
                    </div>
                </div>
              

                {/* top bar */}
                  
                    <div className="row align-items-center justify-content-between mb-3">
                        <div className="col-md-5 text-md-start text-center">
                            <div className="header-title">
                                Jobs
                                <div className="linee mx-auto mx-md-0"></div>
                            </div>
                        </div>
                        {/* search of right div */}
                        <div className="col-md-5 mt-3 mt-md-0">
                            {/* Search Div for Desktop */}
                            <div className="search-container d-none d-md-flex">
                                <input type="text" className="search-input" placeholder="Search In Users" />
                                <button className="search-btn"><i className="fas fa-search"></i></button>
                            </div>

                        </div>
                    </div>
                    {/* table */}
                    <div className="table-responsive">
                        <table className="table table-dark articles-table">
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Position</th>
                                    <th>Status</th>
                                    <th>Posted At</th>
                                    <th>Applications</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job, index) => (
                                    <React.Fragment key={index}>
                                        <>

                                            {/* Table for Mobile */}
                                            <tr className="d-block d-md-none px-0 w-100 col-12 mx-auto">
                                                <td className='d-flex mx-auto w-100 mt-3' colSpan="5">
                                                    <div className="box mb-3 row w-100 mx-auto mt-2">
                                                        <div className="col-12 w-100 p-0 mx-auto">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <h6 className='fw-bold fs-6'>Company:</h6>
                                                                <span className={`${job.status === 'Open' ? 'bg-primary' : 'bg-grey'} ButtonsTable fs-6 fw-medium text-center py-1`} style={{ width: '35%' }}>
                                                                    {job.status}
                                                                </span>
                                                            </div>
                                                            <p className="mt-2 mb-0 fs-5 fw-lighter">{job.company}</p>
                                                        </div>

                                                        <div className="col-6 mt-3 p-0">
                                                            <h6 className="fw-bold fs-6">Position:</h6>
                                                            <p className="fw-lighter fs-6">{job.position}</p>
                                                        </div>

                                                        <div className="col-6 mt-3 p-0 d-flex flex-column  text-center justify-content-end align-items-start">
                                                            <h6 className='fw-bold  fs-6'>Applications:</h6>
                                                            <p className="  fs-6 fw-lighter text-end ">{job.applications}</p>

                                                        </div>
                                                        <div className="col-12 p-0">
                                                            <h6 className='fw-bold text-start fs-6'>Posted At:</h6>
                                                            <p className="text-start fs-6 fw-lighter ">
                                                                {`${job.dateTime.split(' ')[0]} ${job.dateTime.split(' ')[1]} ${job.dateTime.split(' ')[2]}`}<br />
                                                                {`${job.dateTime.split(' ')[3]} ${job.dateTime.split(' ')[4]}`}
                                                            </p>
                                                        </div>
                                                        <div className='text-end'>
                                                            <button className="btn-act me-3"><i className="fas fa-edit"></i></button>
                                                            <button className="btn-act"><i className="fas fa-trash-alt"></i></button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            {/* Table for Desktop */}
                                            <tr className="d-none d-md-table-row">
                                                <td data-label="Company">{job.company}</td>
                                                <td data-label="Position">{job.position}</td>
                                                <td data-label="Status">
                                                    <span className={`${job.status === 'Open' ? 'bg-primary' : 'bg-grey'} ButtonsTable`}>
                                                        {job.status}
                                                    </span>
                                                </td>
                                                <td data-label="Posted At">
                                                    <span className="date-time">
                                                        {`${job.dateTime.split(' ')[0]} ${job.dateTime.split(' ')[1]} ${job.dateTime.split(' ')[2]}`}<br />
                                                        {`${job.dateTime.split(' ')[3]} ${job.dateTime.split(' ')[4]}`}
                                                    </span>
                                                </td>
                                                <td data-label="Applications" className="text-start text-md-center">{job.applications}</td>
                                                <td className="text-end">
                                                    <div className="action-buttons">
                                                        <button className="me-xl-1 btn-act"><i className="fas fa-edit"></i></button>
                                                        <button className="btn-act"><i className="fas fa-trash-alt"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
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

                    {/* Button at the bottom */}
                    <div className="d-block d-lg-none text-center mt-5 d-md-flex justify-content-md-end ">
                        <button className="btn-gold w-100">Create New Job</button>
                    </div>
                </div>
          

     
    );
};

export default Jobs;
